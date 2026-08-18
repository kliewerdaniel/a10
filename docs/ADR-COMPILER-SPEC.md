# ADR: Knowledge Compiler Specification (P4)

> Status: DESIGN (uncommitted). Companion to REBUILD_PLAN.md + ADR-ARTIFACT-SCHEMA.md.
> Build-time only. Extends `tie/` (local-first GraphRAG) rather than rebuilding it (D6).

## 1. Purpose
Turn 177 Markdown posts (+ editorial frontmatter) into **static artifacts** the portal consumes
at runtime: per-post sidecars, a knowledge graph, a lexical search index, and a global index.
Zero runtime cost; runs once per build in Cloud Build (or locally via `deploy.sh`).

## 2. Location & layout
```
knowledge-compiler/
  pyproject.toml            # deps: click, pyyaml, markdown-it-py, python-frontmatter, networkx, rapidfuzz
  compiler/
    __init__.py
    config.py               # paths, schema_version, thresholds
    ingest.py               # glob content/blog/*.md (excl temp); parse frontmatter
    normalize.py            # canonical_url = /blog/<slug>; date normalize; taxonomy map
    extract.py              # entities/claims via local heuristics (+ optional local LLM hook, off)
    graph.py                # NetworkX graph: shared-entity + crosslink edges; dedupe/cluster
    search.py               # lexical BM25-ish index -> search.json (no embeddings)
    emit.py                 # write sidecars + graph.json + search.json + index.json
    verify.py               # sha256 reproducibility + all slugs unique + non-empty
  taxonomy.json             # topics + entities controlled vocab (seed in ADR-ARTIFACT-SCHEMA §4)
  tests/                    # unit tests for each module
  run.py                    # CLI: `python run.py --content content/blog --out public/artifacts`
```
Python (not TS) so it reuses `tie/` concepts and runs identically local + Cloud Build.

## 3. Pipeline (per build)
```
ingest  -> normalize -> extract -> graph -> search -> emit -> verify
```
1. **ingest:** read all `content/blog/*.md` except `temp.md`. Parse frontmatter (gray-matter equiv).
2. **normalize:** enforce `canonical_url = /blog/<slug>` (per ADR §1); normalize `date` to
   `YYYY-MM-DD`; map free-form topics/entities to `taxonomy.json` (lowercase-kebab, unknown kept).
3. **extract:** local heuristics only by default:
   - entities: capitalized multi-word terms + known taxonomy ids + inline code/`fleet.*` tokens.
   - claims: sentence-level assertions (regex for "X is/means/requires …"); `confidence: null`
     unless an optional local LLM hook is enabled (off by default; if on, sets `model_version`).
   - references: markdown links (external URL or `<other-slug>`).
4. **graph:** nodes = posts + entities. Edges:
   - `related` (post↔post) weight = shared-entity Jaccard ∪ crosslink; basis tagged.
   - `mentions` (post→entity). Dedupe; cluster orphan entities.
5. **search:** lexical index — tokenize body, BM25 weights, store `{slug, title, excerpt, tokens}`.
   No vector DB. (Optional build-time embeddings deferred; would only add a `vectors` field.)
6. **emit:** write `public/artifacts/<slug>.json`, `graph.json`, `search.json`, `index.json`.
7. **verify (gate):** every `content_hash` reproducible from source (re-run on same input = same
   hash); all 177 route slugs unique; all `canonical_url == /blog/<slug>`; graphs/search non-empty.
   Non-zero exit fails the build (fail-closed, per user's security posture).

## 4. Hashing & provenance
- `content_hash` / `provenance.content_sha256` = sha256 of the rendered markdown body (frontmatter
  excluded) so edits change the hash. Demonstrates the brief's provenance principle (§9) statically.
- `compiler` field = `knowledge-compiler@<git-sha>` for auditability.

## 5. Invocation
- **Local (`deploy.sh`):** runs `knowledge-compiler/run.py` then `next build` then `gsutil` upload.
- **CI (`cloudbuild.yaml`):** same sequence in a build step; Cloud Build service account uploads to
  the GCS bucket. No secrets in repo (Secret Manager for any PostHog/Fleet tokens).

## 6. Reuse note (D6)
`tie/` already does GraphRAG (NetworkX + ChromaDB). The compiler deliberately uses **NetworkX +
lexical index, not ChromaDB**, because v1 is static (no runtime vector store). If semantic search is
added later, it reuses `tie/`'s embedding pipeline at build-time only.

## 7. Tests (P9)
- Unit: normalize (canonical rule), extract (entity/claim), graph (edge weights), search (query returns relevant).
- Integration: full run over 177 posts → verify gate passes; two runs → identical hashes.
- Portal contract: `graph.json`/`search.json`/`index.json` parse and drive widgets without error.
