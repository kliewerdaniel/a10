"""Unit + integration tests for knowledge-compiler modules."""
import json
import subprocess
import sys
from pathlib import Path

import pytest

from compiler import normalize, extract, graph, search
from compiler.ingest import parse_frontmatter, RawPost
from compiler.normalize import NormalizedPost


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #
def _mk_post(slug="2026-01-15-example", body="Sovereign Memory Bank uses Ollama and ChromaDB.", **kw):
    return NormalizedPost(
        slug=slug,
        title=kw.get("title", "Example"),
        author=kw.get("author", "Daniel Kliewer"),
        canonical_url=kw.get("canonical_url", f"/blog/{slug}"),
        created_at=kw.get("created_at", "2026-01-15"),
        updated_at=kw.get("updated_at", "2026-01-15"),
        description=kw.get("description", ""),
        image=kw.get("image", ""),
        status=kw.get("status", "published"),
        series=kw.get("series", None),
        topics=kw.get("topics", ["local-first-ai"]),
        entities=kw.get("entities", []),
        featured=kw.get("featured", False),
        body=body,
        raw=kw.get("raw", RawPost(slug=slug, path=Path(f"/tmp/{slug}.md"), frontmatter={}, body=body)),
    )


# --------------------------------------------------------------------------- #
# ingest
# --------------------------------------------------------------------------- #
def test_parse_frontmatter_basic():
    md = """---
title: Hello World
date: 2026-01-15
tags: [a, b, c]
draft: false
---
# Body text

Second paragraph with content.
"""
    fm, body = parse_frontmatter(md)
    assert fm["title"] == "Hello World"
    assert str(fm["date"]).startswith("2026-01-15")
    assert fm["tags"] == ["a", "b", "c"]
    assert "Body text" in body
    assert not body.strip().startswith("---")


def test_parse_frontmatter_no_frontmatter():
    md = "Just a body\nwith no frontmatter."
    fm, body = parse_frontmatter(md)
    assert fm == {}
    assert body == md


def test_parse_frontmatter_preserves_odd_chars():
    md = """---
title: "Weird: title with colon & symbols!"
custom_key: value with spaces
---
Body with `code` and [links](/blog/x).
"""
    fm, body = parse_frontmatter(md)
    assert fm["title"] == "Weird: title with colon & symbols!"
    assert fm["custom_key"] == "value with spaces"
    assert "/blog/x" in body


# --------------------------------------------------------------------------- #
# normalize
# --------------------------------------------------------------------------- #
def test_normalize_canonical_forces_slug_rule():
    raw = RawPost(slug="2026-01-15-example", path=Path("/tmp/x.md"),
                  frontmatter={"title": "T", "canonical_url": "/blog/wrong-slug"}, body="b")
    p = normalize.normalize(raw, {})
    assert p.canonical_url == "/blog/2026-01-15-example"


def test_normalize_topic_lowercase_kebab():
    raw = RawPost(slug="s", path=Path("/tmp/x.md"),
                  frontmatter={"title": "T", "topics": ["Local First AI", "Knowledge Graph"]}, body="b")
    p = normalize.normalize(raw, {})
    assert p.topics == ["local-first-ai", "knowledge-graph"]


def test_normalize_preserves_unknown_topic():
    raw = RawPost(slug="s", path=Path("/tmp/x.md"),
                  frontmatter={"title": "T", "topics": ["SomeWeirdTag"]}, body="b")
    p = normalize.normalize(raw, {})
    assert "someweirdtag" in p.topics


def test_normalize_date_variants():
    assert normalize.normalize_date("01-15-2026") == "2026-01-15"
    assert normalize.normalize_date("2026-03-04") == "2026-03-04"
    assert normalize.normalize_date("March 4, 2026") == "2026-03-04"


# --------------------------------------------------------------------------- #
# extract
# --------------------------------------------------------------------------- #
def test_extract_finds_fleet_token():
    p = _mk_post(body="The gateway calls fleet.epistemic.decide() and fleet.api.")
    ext = extract.extract(p)
    assert "fleet.epistemic.decide" in ext.entities
    assert "fleet.api" in ext.entities


def test_extract_ignores_opener_stop():
    p = _mk_post(body="When Sovereign Memory Bank launches, it syncs. The model is not a database.")
    ext = extract.extract(p)
    assert "sovereign memory bank" in ext.entities
    # generic instructional phrases are not entities
    assert not any(e in {"setting up", "next steps", "best practices"} for e in ext.entities)


def test_extract_claims_detected():
    p = _mk_post(body="The sovereign loop is the product. Memory is local-first by design.")
    ext = extract.extract(p)
    assert len(ext.claims) >= 1
    assert any("sovereign loop" in c["text"].lower() for c in ext.claims)


def test_extract_crosslinks():
    p = _mk_post(body="See also [/blog/2026-01-15-example](/blog/2026-01-15-example) and other work.")
    ext = extract.extract(p)
    assert "2026-01-15-example" in ext.crosslink_slugs


def test_extract_generic_phrase_filtered():
    p = _mk_post(body="## Setting Up\n\nFollow these steps. Best Practices matter. Next Steps below.")
    ext = extract.extract(p)
    assert not any(e in {"setting up", "best practices", "next steps"} for e in ext.entities)


# --------------------------------------------------------------------------- #
# graph
# --------------------------------------------------------------------------- #
def test_graph_builds_deterministic():
    posts = [
        _mk_post(slug="a", body="Sovereign Memory Bank uses Ollama.", topics=["t1", "t2"]),
        _mk_post(slug="b", body="Sovereign Memory Bank uses ChromaDB.", topics=["t2", "t3"]),
        _mk_post(slug="c", body="Unrelated content about cats.", topics=["t9"]),
    ]
    exts = {p.slug: extract.extract(p) for p in posts}
    g1 = graph.build_graph(posts, exts)
    g2 = graph.build_graph(posts, exts)
    assert g1.graph.number_of_nodes() == g2.graph.number_of_nodes()
    assert g1.graph.number_of_edges() == g2.graph.number_of_edges()
    related = [e for e in g1.graph.edges(data=True) if e[2].get("label") == "related"]
    assert any({e[0], e[1]} == {"post:a", "post:b"} for e in related)
    assert not any(
        ("post:c" in {e[0], e[1]} and ("post:a" in {e[0], e[1]} or "post:b" in {e[0], e[1]}))
        for e in related
    )


def test_graph_prunes_orphan_entities():
    posts = [
        _mk_post(slug="a", body="UniquePhraseOne appears here only.", topics=["t"]),
        _mk_post(slug="b", body="Sovereign Memory Bank appears in both posts for real.", topics=["t"]),
        _mk_post(slug="c", body="Sovereign Memory Bank also here to qualify as entity.", topics=["t"]),
    ]
    exts = {p.slug: extract.extract(p) for p in posts}
    g = graph.build_graph(posts, exts)
    entity_labels = {n["label"] for n in graph.export_graph_json(g.graph)["nodes"] if n["type"] == "entity"}
    assert "uniquephraseone" not in entity_labels
    # "Sovereign Memory Bank" -> regex captures "memory bank" (sentence-initial
    # "Sovereign" has no leading space); it appears in 2 posts so is kept.
    assert "memory bank" in entity_labels


# --------------------------------------------------------------------------- #
# search
# --------------------------------------------------------------------------- #
def test_search_bm25_ranks_relevant():
    posts = [
        _mk_post(slug="a", body="Local-first AI memory with Ollama and ChromaDB.", title="Local Memory"),
        _mk_post(slug="b", body="Docker deployment on Google Cloud Run.", title="Deploy"),
        _mk_post(slug="c", body="Reinforcement learning from human feedback.", title="RLHF"),
    ]
    entries = search.build_search(posts)
    results = search.search(entries, "local-first Ollama memory")
    assert results
    assert results[0]["slug"] == "a"


def test_search_empty_query_safe():
    posts = [_mk_post()]
    entries = search.build_search(posts)
    assert search.search(entries, "") == []


# --------------------------------------------------------------------------- #
# Integration: full pipeline over the real repo content
# --------------------------------------------------------------------------- #
REPO_ROOT = Path(__file__).resolve().parents[2]
COMPILER_DIR = REPO_ROOT / "knowledge-compiler"
CONTENT_DIR = REPO_ROOT / "content" / "blog"
RUN_SCRIPT = COMPILER_DIR / "run.py"


@pytest.mark.skipif(not CONTENT_DIR.exists(), reason="content/blog not found")
def test_pipeline_real_content(tmp_path):
    out = tmp_path / "artifacts"
    proc = subprocess.run(
        [sys.executable, str(RUN_SCRIPT), "--out", str(out)],
        cwd=str(REPO_ROOT),
        capture_output=True,
        text=True,
    )
    assert proc.returncode == 0, proc.stderr
    assert (out / "index.json").exists()
    assert (out / "graph.json").exists()
    assert (out / "search.json").exists()

    import json as _json
    index = _json.loads((out / "index.json").read_text())
    assert index["total"] == 177
    assert len(index["posts"]) == 177

    graph_json = _json.loads((out / "graph.json").read_text())
    # article nodes + a non-trivial but bounded set of entity nodes
    article_nodes = [n for n in graph_json["nodes"] if n["type"] == "article"]
    entity_nodes = [n for n in graph_json["nodes"] if n["type"] == "entity"]
    assert len(article_nodes) == 177
    # entity count must be far below the raw 9702 noise ceiling
    assert len(entity_nodes) < 1000

    # every post has a sidecar
    for p in index["posts"]:
        assert (out / f"{p['slug']}.json").exists()

    # canonical + slug invariants
    slugs = {p["slug"] for p in index["posts"]}
    assert len(slugs) == 177
    for p in index["posts"]:
        assert p["canonical_url"] == f"/blog/{p['slug']}"
        assert p["content_hash"].startswith("sha256:")


@pytest.mark.skipif(not CONTENT_DIR.exists(), reason="content/blog not found")
def test_pipeline_reproducible(tmp_path):
    """Two runs on the same input must produce byte-identical content_hash values."""
    out1 = tmp_path / "a"
    out2 = tmp_path / "b"
    for o in (out1, out2):
        proc = subprocess.run(
            [sys.executable, str(RUN_SCRIPT), "--out", str(o)],
            cwd=str(REPO_ROOT), capture_output=True, text=True,
        )
        assert proc.returncode == 0, proc.stderr
    import json as _json
    h1 = _json.loads((out1 / "index.json").read_text())["posts"][0]["content_hash"]
    h2 = _json.loads((out2 / "index.json").read_text())["posts"][0]["content_hash"]
    assert h1 == h2
