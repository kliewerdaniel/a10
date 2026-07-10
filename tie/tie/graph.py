from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

import networkx as nx
from rich.console import Console

from tie.config import DATA_DIR

console = Console()

TEMPLATE_PATH = Path(__file__).resolve().parent / "viz_template.html"


COLORS = {
    "article": "#4fc3f7",
    "project": "#4dd0e1",
    "page": "#29b6f6",
    "session": "#ffb74d",
    "traffic_source": "#ce93d8",
    "device": "#ba68c8",
    "topic": "#81c784",
    "conversion": "#ef5350",
    "default": "#78909c",
}


def build_graph(
    normalized_path: str | None = None,
    content_path: str | None = None,
) -> nx.Graph:
    G = nx.Graph()

    if content_path:
        entities = json.loads(Path(content_path).read_text())
        for ent in entities:
            nid = f"content:{ent['id']}"
            G.add_node(
                nid,
                label=ent.get("title", ent["id"]),
                type=ent.get("type", "article"),
                node_type="content",
                color=COLORS.get(ent.get("type", ""), COLORS["default"]),
                size=15,
            )
            for topic in ent.get("topics", []):
                tid = f"topic:{topic}"
                G.add_node(tid, label=topic, type="topic", node_type="topic",
                           color=COLORS["topic"], size=10)
                G.add_edge(nid, tid, label="discusses", weight=1)

    if normalized_path:
        events = json.loads(Path(normalized_path).read_text())
        sessions = {}
        for ev in events:
            sid = ev.get("session_id", "")
            if not sid:
                continue
            if sid not in sessions:
                G.add_node(
                    f"session:{sid}",
                    label=f"Session {sid[:8]}",
                    type="session",
                    node_type="session",
                    color=COLORS["session"],
                    size=8,
                )
                sessions[sid] = True

                src = ev.get("traffic_source", "") or "direct"
                G.add_node(
                    f"source:{src}",
                    label=src,
                    type="traffic_source",
                    node_type="traffic_source",
                    color=COLORS["traffic_source"],
                    size=10,
                )
                G.add_edge(f"session:{sid}", f"source:{src}",
                           label="came_from", weight=1)

            page = ev.get("page_path", "")
            if page:
                page_id = f"page:{page}"
                G.add_node(
                    page_id,
                    label=page.split("/")[-1] or "/",
                    type="page",
                    node_type="page",
                    color=COLORS["page"],
                    size=12,
                )
                G.add_edge(f"session:{sid}", page_id,
                           label="viewed", weight=1)

    return G


def export_graph_json(G: nx.Graph) -> dict:
    node_data = []
    for nid, attrs in G.nodes(data=True):
        node_data.append({
            "id": nid,
            "label": attrs.get("label", str(nid)),
            "title": f"{attrs.get('type', '')} — {attrs.get('label', nid)}",
            "color": attrs.get("color", COLORS["default"]),
            "size": attrs.get("size", 10),
            "group": attrs.get("node_type", "default"),
        })

    edge_data = []
    for u, v, attrs in G.edges(data=True):
        edge_data.append({
            "from": u,
            "to": v,
            "label": attrs.get("label", ""),
            "weight": attrs.get("weight", 1),
        })

    return {"nodes": node_data, "edges": edge_data}


def render_html(graph_data: dict) -> str:
    template = TEMPLATE_PATH.read_text()
    return template.replace("__GRAPH_DATA__", json.dumps(graph_data))


def build_and_render(
    normalized_path: str | None = None,
    content_path: str | None = None,
) -> str:
    G = build_graph(normalized_path, content_path)
    console.log(f"[green]Graph built:[/green] {G.number_of_nodes()} nodes, {G.number_of_edges()} edges")

    graph_data = export_graph_json(G)

    path = DATA_DIR / f"website_behavior_graph_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.html"
    html = render_html(graph_data)
    path.write_text(html)
    console.log(f"[green]Visualization saved:[/green] {path}")
    return str(path)
