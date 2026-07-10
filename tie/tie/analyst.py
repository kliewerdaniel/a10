from __future__ import annotations

import json

import httpx
from rich.console import Console

from tie.config import DATA_DIR
from tie.rag import query_collections

console = Console()
OLLAMA_BASE_URL = "http://localhost:11434"
LLM_MODEL = "llama3.1:8b"

PERSONAS = {
    "seo": {
        "name": "SEO Analyst",
        "focus": "search intent, rankings, missing content, keyword opportunities",
        "instruction": (
            "You are an SEO Analyst. Focus on search intent, content gaps, keyword opportunities, "
            "and ranking signals. Connect observed traffic patterns to specific content recommendations."
        ),
    },
    "product": {
        "name": "Product Analyst",
        "focus": "conversions, funnels, user intent, calls-to-action",
        "instruction": (
            "You are a Product Analyst. Focus on conversion paths, funnel drop-offs, user intent, "
            "and calls-to-action. Identify where high-value visitors go and where they leave."
        ),
    },
    "research": {
        "name": "Research Analyst",
        "focus": "conceptual relationships, topic connections, knowledge gaps",
        "instruction": (
            "You are a Research Analyst. Focus on conceptual relationships between topics, "
            "identifying knowledge gaps, and suggesting content that bridges disconnected areas."
        ),
    },
    "ux": {
        "name": "UX Analyst",
        "focus": "user journeys, friction points, device behavior, navigation patterns",
        "instruction": (
            "You are a UX Analyst. Focus on user journeys, friction points, device-specific behavior, "
            "and navigation patterns. Identify where visitors get stuck or disengage."
        ),
    },
}


def query_ollama(prompt: str, system: str | None = None) -> str:
    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})

    with httpx.Client(timeout=120.0) as client:
        resp = client.post(
            f"{OLLAMA_BASE_URL}/api/chat",
            json={
                "model": LLM_MODEL,
                "messages": messages,
                "stream": False,
                "options": {"temperature": 0.3},
            },
        )
        resp.raise_for_status()
        return resp.json()["message"]["content"]


def build_context(rag_results: dict[str, list]) -> str:
    parts = []
    for collection, results in rag_results.items():
        if not results:
            continue
        parts.append(f"\n=== {collection} ===")
        for doc_id, doc_text, score in results[:3]:
            parts.append(f"[{doc_id}] (score={score:.3f}): {doc_text[:300]}")
    return "\n".join(parts)


def query_analytics(question: str, collections: dict, persona: str = "research") -> str:
    persona_cfg = PERSONAS.get(persona, PERSONAS["research"])
    console.log(f"[bold]{persona_cfg['name']}[/bold] analyzing: {question}")

    rag_results = query_collections(collections, question)
    context = build_context(rag_results)

    system_prompt = persona_cfg["instruction"] + (
        "\n\nAnswer concisely based on the telemetry graph context provided. "
        "Cite specific nodes and relationships when possible. "
        "If the context lacks sufficient data, say so."
    )

    user_prompt = (
        f"Telemetry Graph Context:\n{context}\n\n"
        f"Question: {question}\n\n"
        f"Provide your analysis as:\n"
        f"1. Observation — what the data shows\n"
        f"2. Interpretation — why it matters\n"
        f"3. Recommendation — what to do"
    )

    return query_ollama(user_prompt, system=system_prompt)


def generate_report(collections: dict) -> str:
    sections = [
        ("What new trends are emerging in site traffic?", "seo"),
        ("How is visitor behavior changing?", "product"),
        ("What content opportunities exist?", "research"),
        ("What technical or UX problems should I investigate?", "ux"),
    ]

    report_parts = ["# Telemetry Intelligence Report\n"]
    for question, persona in sections:
        answer = query_analytics(question, collections, persona)
        report_parts.append(f"## {question}\n\n{answer}\n")

    report = "\n---\n".join(report_parts)

    path = DATA_DIR / "latest_report.md"
    path.write_text(report)
    console.log(f"[green]Report saved:[/green] {path}")
    return report
