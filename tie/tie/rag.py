from __future__ import annotations

import json
from pathlib import Path

import chromadb
from chromadb.utils.embedding_functions import OllamaEmbeddingFunction
from rich.console import Console

from tie.config import DATA_DIR

console = Console()

OLLAMA_BASE_URL = "http://localhost:11434"
EMBED_MODEL = "nomic-embed-text"


def get_chroma_client() -> chromadb.PersistentClient:
    return chromadb.PersistentClient(path=str(DATA_DIR / "chromadb"))


def embed_fn() -> OllamaEmbeddingFunction:
    return OllamaEmbeddingFunction(
        url=f"{OLLAMA_BASE_URL}/api/embeddings",
        model_name=EMBED_MODEL,
    )


COLLECTION_NAMES = ["analytics_events", "content_embeddings", "graph_summaries", "recommendations"]


def reset_collections(client: chromadb.PersistentClient, ef: OllamaEmbeddingFunction):
    collections = {}
    for name in COLLECTION_NAMES:
        try:
            client.delete_collection(name)
        except Exception:
            pass
        collections[name] = client.create_collection(
            name=name,
            embedding_function=ef,
            metadata={"hnsw:space": "cosine"},
        )
    return collections


def get_collections(client: chromadb.PersistentClient, ef: OllamaEmbeddingFunction):
    collections = {}
    for name in COLLECTION_NAMES:
        try:
            collections[name] = client.get_collection(name=name, embedding_function=ef)
        except Exception:
            collections[name] = client.create_collection(
                name=name,
                embedding_function=ef,
                metadata={"hnsw:space": "cosine"},
            )
    return collections


def build_graph_summary(graph_data: dict) -> list[dict]:
    nodes = {n["id"]: n for n in graph_data["nodes"]}
    edges = graph_data["edges"]

    summaries = {}
    for edge in edges:
        src = edge["from"]
        dst = edge["to"]
        label = edge.get("label", "related_to")
        src_node = nodes.get(src, {})
        dst_node = nodes.get(dst, {})
        src_label = src_node.get("label", src)
        dst_label = dst_node.get("label", dst)

        key = src
        if key not in summaries:
            metrics = ""
            if src_node.get("views"):
                m = src_node
                metrics = (
                    f"  Views: {m['views']} | "
                    f"Avg engagement: {m['avg_engagement']}s | "
                    f"Max scroll: {m['max_scroll']}% | "
                    f"Unique sessions: {m['unique_sessions']}"
                )
                if m.get("sources"):
                    metrics += f" | Sources: {', '.join(m['sources'][:3])}"
            summaries[key] = {
                "id": key,
                "label": src_label,
                "type": src_node.get("group", "unknown"),
                "metrics": metrics,
                "connections": [],
            }
        summaries[key]["connections"].append(f"  {label} → {dst_label}")

    result = []
    for nid, summary in summaries.items():
        parts = [f"{summary['label']} ({summary['type']})"]
        if summary["metrics"]:
            parts.append(summary["metrics"])
        if summary["connections"]:
            parts.extend(summary["connections"])
        result.append({"id": nid, "text": "\n".join(parts)})
    return result


def ingest_graph(graph_path: str, collections: dict):
    raw = Path(graph_path).read_text()
    start = raw.find("const data = ") + len("const data = ")
    end = raw.find(";\nconst nodes = ")
    graph_data = json.loads(raw[start:end])

    summaries = build_graph_summary(graph_data)
    gc = collections["graph_summaries"]
    batch_size = 100
    for i in range(0, len(summaries), batch_size):
        batch = summaries[i : i + batch_size]
        gc.add(
            ids=[s["id"] for s in batch],
            documents=[s["text"] for s in batch],
            metadatas=[{"label": s.get("label", s["id"]), "type": s.get("type", "unknown")} for s in batch],
        )
    console.log(f"[green]Ingested {len(summaries)} graph summaries[/green]")


def ingest_content(content_path: str, collections: dict):
    entities = json.loads(Path(content_path).read_text())
    cc = collections["content_embeddings"]
    for ent in entities:
        text = f"Title: {ent.get('title', '')}\nTopics: {', '.join(ent.get('topics', []))}\nType: {ent.get('type', '')}"
        cc.add(
            ids=[ent["id"]],
            documents=[text],
            metadatas=[{"title": ent.get("title", ""), "type": ent.get("type", "")}],
        )
    console.log(f"[green]Ingested {len(entities)} content entities[/green]")


def query_collections(
    collections: dict,
    question: str,
    n_results: int = 5,
) -> dict[str, list]:
    results = {}
    for name, col in collections.items():
        try:
            res = col.query(query_texts=[question], n_results=n_results)
            results[name] = list(zip(res["ids"][0], res["documents"][0], res["distances"][0]))
        except Exception as e:
            results[name] = []
    return results
