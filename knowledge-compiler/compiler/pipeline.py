"""Pipeline orchestrator: ingest -> normalize -> extract -> graph -> search -> emit -> verify."""
from __future__ import annotations

from pathlib import Path

from .config import (
    DEFAULT_CONTENT_DIR,
    DEFAULT_OUT_DIR,
    ROOT,
)
from .emit import emit
from .extract import extract
from .graph import build_graph
from .ingest import ingest
from .normalize import normalize, load_taxonomy
from .search import build_search
from .verify import verify


def run(content_dir: Path = DEFAULT_CONTENT_DIR, out_dir: Path = DEFAULT_OUT_DIR) -> dict:
    taxonomy = load_taxonomy()

    raw = ingest(content_dir)
    posts = [normalize(p, taxonomy) for p in raw]

    extractions = {p.slug: extract(p) for p in posts}

    graph_result = build_graph(posts, extractions)
    search_entries = build_search(posts)

    emitted = emit(posts, extractions, graph_result, search_entries, out_dir, ROOT)

    gate = verify(posts, out_dir, graph_result)

    summary = {
        "posts": len(posts),
        "graph_nodes": graph_result.graph.number_of_nodes(),
        "graph_edges": graph_result.graph.number_of_edges(),
        "search_entries": len(search_entries),
        "out_dir": str(out_dir),
        "gate_passed": gate.passed,
        "gate_errors": gate.errors,
    }
    if not gate.passed:
        raise RuntimeError("VERIFY GATE FAILED:\n" + "\n".join(f"  - {e}" for e in gate.errors))
    return summary
