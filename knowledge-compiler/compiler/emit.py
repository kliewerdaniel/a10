"""Emit static artifacts + compute provenance hashes.

Per-post sidecar  -> public/artifacts/<slug>.json
Knowledge graph   -> public/artifacts/graph.json
Search index      -> public/artifacts/search.json
Global index      -> public/artifacts/index.json

content_hash / content_sha256 = sha256 of the rendered markdown body (frontmatter
excluded) so any body edit changes the hash (provenance principle, ADR §4).
compiler field = knowledge-compiler@<git-sha> for auditability.
"""
from __future__ import annotations

import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

from .extract import Extraction
from .graph import export_graph_json
from .normalize import NormalizedPost
from .search import export_search_json

SCHEMA_VERSION = 1
COMPILER_NAME = "knowledge-compiler"


def _git_sha(repo_root: Path) -> str:
    try:
        out = subprocess.run(
            ["git", "-C", str(repo_root), "rev-parse", "HEAD"],
            capture_output=True, text=True, timeout=10,
        )
        if out.returncode == 0:
            return out.stdout.strip()[:12]
    except Exception:
        pass
    return "unknown"


def content_sha256(body: str) -> str:
    return hashlib.sha256(body.encode("utf-8")).hexdigest()


def build_sidecar(
    post: NormalizedPost,
    extraction: Extraction,
    related: list[dict],
    git_sha: str,
    generated_at: str,
) -> dict:
    sha = content_sha256(post.body)
    # entities = editorial frontmatter entities first, then locally-extracted ones
    merged_entities = list(post.entities)
    for e in extraction.entities:
        if e not in merged_entities:
            merged_entities.append(e)
    return {
        "schema_version": SCHEMA_VERSION,
        "id": post.slug,
        "title": post.title,
        "author": post.author,
        "created_at": post.created_at,
        "updated_at": post.updated_at,
        "canonical_url": post.canonical_url,
        "content_hash": f"sha256:{sha}",
        "topics": post.topics,
        "status": post.status,
        "series": post.series,
        "entities": merged_entities,
        "relationships": related,
        "claims": extraction.claims,
        "references": extraction.references,
        "related_artifacts": [r["target"] for r in related if r["type"] == "related"],
        "provenance": {
            "source": f"content/blog/{post.slug}.md",
            "compiler": f"{COMPILER_NAME}@{git_sha}",
            "compiler_version": SCHEMA_VERSION,
            "model_version": None,
            "content_sha256": sha,
            "generated_at": generated_at,
        },
        "publication_status": "published",
    }


def emit(
    posts: list[NormalizedPost],
    extractions: dict[str, Extraction],
    graph_result,
    search_entries,
    out_dir: Path,
    repo_root: Path,
) -> dict:
    out_dir.mkdir(parents=True, exist_ok=True)
    generated_at = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    git_sha = _git_sha(repo_root)

    sidecars = {}
    for p in posts:
        ext = extractions.get(p.slug) or Extraction(entities=[], claims=[], references=[], crosslink_slugs=set())
        related = graph_result.related.get(p.slug, [])
        sc = build_sidecar(p, ext, related, git_sha, generated_at)
        sidecars[p.slug] = sc
        (out_dir / f"{p.slug}.json").write_text(
            json.dumps(sc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
        )

    graph_json = export_graph_json(graph_result.graph)
    (out_dir / "graph.json").write_text(
        json.dumps(graph_json, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    search_json = export_search_json(search_entries)
    (out_dir / "search.json").write_text(
        json.dumps(search_json, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    index = {
        "schema_version": SCHEMA_VERSION,
        "generated_at": generated_at,
        "compiler": f"{COMPILER_NAME}@{git_sha}",
        "total": len(posts),
        "posts": [
            {
                "slug": p.slug,
                "title": p.title,
                "author": p.author,
                "date": p.created_at,
                "canonical_url": p.canonical_url,
                "status": p.status,
                "topics": p.topics,
                "series": p.series,
                "featured": p.featured,
                "content_hash": sidecars[p.slug]["content_hash"],
            }
            for p in sorted(posts, key=lambda x: x.created_at or "", reverse=True)
        ],
    }
    (out_dir / "index.json").write_text(
        json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    return {"sidecars": sidecars, "index": index, "graph": graph_json, "search": search_json}
