"""Verify gate — fail-closed. Any failure raises and the run.py CLI exits non-zero.

Checks (per ADR-ARTIFACT-SCHEMA §7):
  1. All 177 route slugs unique (no collision).
  2. Every canonical_url == /blog/<slug>.
  3. Every content_hash reproducible from source (re-hash body == stored hash).
  4. graph.json / search.json / index.json present, non-empty, parseable.
  5. Every post has a sidecar emitted.
"""
from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass
from pathlib import Path

from .emit import content_sha256
from .normalize import NormalizedPost


@dataclass
class GateResult:
    passed: bool
    errors: list[str]


def verify(posts: list[NormalizedPost], out_dir: Path, graph_result) -> GateResult:
    errors: list[str] = []

    # 1. unique slugs
    slugs = [p.slug for p in posts]
    if len(slugs) != len(set(slugs)):
        dupes = [s for s in slugs if slugs.count(s) > 1]
        errors.append(f"Duplicate slugs detected: {sorted(set(dupes))}")

    # 2. canonical rule + 3. reproducible hash
    for p in posts:
        expected_canon = f"/blog/{p.slug}"
        if p.canonical_url != expected_canon:
            errors.append(f"canonical_url mismatch [{p.slug}]: {p.canonical_url} != {expected_canon}")
        sha = content_sha256(p.body)
        sc_path = out_dir / f"{p.slug}.json"
        if not sc_path.exists():
            errors.append(f"Missing sidecar: {p.slug}.json")
            continue
        sc = json.loads(sc_path.read_text(encoding="utf-8"))
        if sc.get("provenance", {}).get("content_sha256") != sha:
            errors.append(f"content_hash not reproducible for {p.slug}")

    # 4/5. globals present + non-empty
    for name in ("graph.json", "search.json", "index.json"):
        gp = out_dir / name
        if not gp.exists():
            errors.append(f"Missing global artifact: {name}")
            continue
        try:
            data = json.loads(gp.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            errors.append(f"{name} is not valid JSON: {e}")
            continue
        if name == "graph.json" and (not data.get("nodes") or not data.get("edges")):
            errors.append("graph.json is empty (no nodes/edges)")
        if name == "search.json" and not data.get("entries"):
            errors.append("search.json is empty (no entries)")
        if name == "index.json" and not data.get("posts"):
            errors.append("index.json is empty (no posts)")

    # graph sanity from in-memory structure
    if graph_result.graph.number_of_nodes() == 0:
        errors.append("NetworkX graph has 0 nodes")

    return GateResult(passed=len(errors) == 0, errors=errors)
