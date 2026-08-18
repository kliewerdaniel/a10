# ADR: Slug/Canonical Rule + Knowledge Artifact Schema

> Status: DESIGN (uncommitted). Companion to REBUILD_PLAN.md. P3.
> Verified against `content/blog/*.md` (172 live + 5 to-publish, `temp` excluded).

## 1. Slug & canonical URL rule (ratified D1 + canonical decision)

- **Route slug = filename without extension.** Next renders `/blog/<filename-slug>`.
  This is the permanent, never-changing URL. We do NOT rename files.
- **`canonical_url` MUST equal `/blog/<filename-slug>`** for every post (relative form,
  no scheme/host). This is the SEO source of truth and what external links should point to.
- **No redirect table is required** — slugs are preserved, so old inbound links keep working.
  (The existing `next.config.ts` legacy-date redirects remain harmless but are now redundant;
  kept until cutover, then removed.)
- **Edit bodies only for factual correctness (P6).** Never to change a slug/URL.

### 1.1 Normalization scope (verified by script)

Of 172 published posts:
- **43** already `canonical_url == /blog/<slug>` → leave.
- **79** have **no** `canonical_url` → render already falls back to `/blog/<slug>` → leave
  (optionally backfill later; not required).
- **7** are full-domain form with **correct** path (`https://danielkliewer.com/blog/<slug>`)
  → leave (path identical).
- **43** have a **wrong** `canonical_url` path (see 1.2) → **normalize to `/blog/<slug>`**.

The 43 wrong ones break down as:
- date-stripped path (e.g. `/blog/document-driven-development-nextjs-blog`) — 18
- off-by-one/other date (e.g. `.../2026-01-15-...` for a `2026-01-16` post) — 2
- points at a *different* post's slug (`.../memory-preservation-invariants`,
  `.../sovereign-knowledge-compiler-compile-time-memory`) — 2
- trailing slash only (`/blog/<slug>/`) — 8
- `.md` suffix (`/blog/<slug>.md`) — 1
- blank `/blog/` — 1
- the 4 "architecture synthesis" posts sharing `/blog/sovereign-ai-architecture-synthesis` — 4
  (collision resolved: each → its own `/blog/<slug>`)
- old-domain/placeholder host (`kliewerdaniel.com`, `yourdomain.com`) with date-stripped path — 7

**Transform is mechanical and safe:** replace the `canonical_url:` frontmatter line value with
`/blog/<filename-slug>`. No body or other field touched. Applied by a one-shot normalizer script
(P2 artifact) and re-verified by the P9 URL-preservation test.

### 1.2 To-publish extras (ratified: publish all 5)

From `~/a10/blog` (newer than live site):
1. `2026-07-02-context-engineering-...` — OK; image `/images/ComfyUI_00200_.png` exists in `public/`.
2–5. `2026-08-09-hermes-atlas-v0{1..4}-...` — **missing `author:`** → add `author: Daniel Kliewer`.
   No image → portal must render a graceful no-image fallback (already does: `/images/placeholder.png`).

All 5: copy `~/a10/blog/<slug>.md` → `content/blog/<slug>.md`. Their `canonical_url` is already
`/blog/<full-slug>` → correct, no change.

**Resulting live total: 177 posts, every `canonical_url = /blog/<slug>`, every route slug unique.**

## 2. Editorial frontmatter schema (hand-authored additions)

Extends existing frontmatter (author, date, title, description, image, canonical_url, OG).
New fields (all optional except where noted; compiler fills the rest):

```yaml
# --- existing (preserved) ---
title: "..."
date: "07-03-2026"          # accepted MM-DD-YYYY or YYYY-MM-DD; compiler normalizes
author: Daniel Kliewer
description: "..."
image: /images/foo.png
canonical_url: /blog/<slug> # normalized per §1
# --- new editorial ---
topics: [sovereign-ai, knowledge-systems, graphrag]      # controlled vocab, see §4
status: observed            # observed|designed|proposed|experiment  (epistemic honesty, §23)
series: sovereign-intelligence-stack                     # optional research-thread id
entities: [ed25519, fleet.epistemic.decide, graphrag]    # entity ids referenced
featured: false             # already used by site; cornerstone driver
```

`status` drives a visible badge ("Observed / Designed / Proposed / Experiment") so readers can
distinguish built vs proposed vs speculative (per brief §3, §23). Default `observed` if absent.

## 3. Compiler-generated artifact (per post, sidecar JSON)

Emitted to `public/artifacts/<slug>.json` (and uploaded to GCS). Never manually edited;
regenerated each build. Schema:

```json
{
  "schema_version": 1,
  "id": "<slug>",
  "title": "...",
  "author": "Daniel Kliewer",
  "created_at": "2026-07-03",
  "updated_at": "2026-08-17",            // compiler run date or git mtime
  "canonical_url": "/blog/<slug>",
  "content_hash": "sha256:ab12...",       // of rendered markdown body
  "topics": ["sovereign-ai", "..."],
  "status": "observed",
  "series": "sovereign-intelligence-stack|null",
  "entities": ["ed25519", "..."],
  "relationships": [                      // typed edges to other posts/entities
    {"type": "related", "target": "<other-slug>", "weight": 0.83, "basis": "shared-entity|crosslink"},
    {"type": "successor", "target": "<slug>", "basis": "series-order"}
  ],
  "claims": [                            // extracted assertions (local, no LLM by default)
    {"text": "...", "confidence": null, "evidence_refs": []}
  ],
  "references": ["https://arxiv.org/...", "<other-slug>"],
  "related_artifacts": ["<slug-a>", "<slug-b>"],  // top-N by graph weight
  "provenance": {
    "source": "content/blog/<slug>.md",
    "compiler": "knowledge-compiler@<git-sha>",
    "compiler_version": 1,
    "model_version": null,               // set only if an LLM was used at build
    "content_sha256": "ab12...",
    "generated_at": "2026-08-17T..."
  },
  "publication_status": "published"
}
```

## 4. Controlled vocabulary (topics / entities)

Seed taxonomy (extends as content demands; stored in `knowledge-compiler/taxonomy.json`):
- **research areas:** sovereign-ai, local-first-ai, computational-sovereignty, ai-knowledge-systems,
  memory-as-architecture, modular-cognition, agent-systems, sovereign-agent-fleet,
  knowledge-compilation, graphrag, retrieval-systems, compile-time-ai, quantitative-finance,
  algorithmic-decision-systems, robotics, human-agent-authorization, ai-safety-architecture,
  physical-ai, research, engineering, experiments, projects.
- **entities:** technology/repo/library ids (e.g. `ed25519`, `fleet.epistemic.decide`, `graphrag`,
  `nextjs`, `chromadb`, `sovereignspec`). Free-form allowed; normalized to lowercase-kebab.

## 5. Global artifacts (build output)

| Artifact | Path | Consumer |
|----------|------|----------|
| Post index | `public/artifacts/index.json` | search, listings, sitemap cross-check |
| Knowledge graph | `public/artifacts/graph.json` | graph widget, related-articles |
| Search index | `public/artifacts/search.json` | lexical (BM25) search, no runtime DB |
| Per-post sidecar | `public/artifacts/<slug>.json` | provenance panel, related, metadata |
| Slug manifest | `data/slug_manifest.json` | build gate + P9 URL test (already generated) |

All static, fetched by the portal at runtime as JSON (CDN-cached). No server query required.

## 6. Compiler contract (build-time only)

```
knowledge-compiler/
  input : content/blog/*.md  (173→177 after extras copied)
  steps : parse(gray-matter+mdast) → normalize frontmatter → extract entities/claims
          (local heuristics; optional local LLM, off by default) → build NetworkX graph
          (shared-entity + crosslink edges; dedupe/cluster) → lexical search index
          → write sidecars + globals → verify (sha256 reproducible, all slugs unique)
  output: public/artifacts/*  (+ console summary)
  invoked: prebuild (local deploy.sh and cloudbuild.yaml), before `next build`
```

**Cost/safety:** runs once per build in Cloud Build (or locally). Zero runtime cost. No embeddings
at request time. Lexical search avoids any vector-DB dependency. If semantic search is wanted
later, sentence-transformers run **at build only** and emit static vectors — runtime unchanged.

## 7. Invariants enforced by tests (P9)

- Every live `canonical_url == /blog/<slug>` (43 normalized + 177 total unique).
- All 177 route slugs unique (no collision).
- `content_hash` reproducible across two builds of the same source.
- `graph.json` / `search.json` non-empty and parseable.
- Site renders with artifacts only (no Fleet/DB/LLM) — static-fallback verified.
- Unauthorized agent output ≠ authorized external action (Fleet-tested; gateway stub respects boundary).
