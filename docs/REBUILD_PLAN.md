# danielkliewer.com — Sovereign Knowledge Portal Rebuild Plan

> Status: DESIGN CHECKPOINT (uncommitted). Ratified decisions only; no code yet.
> Built against real inspection of `a10/sovereign-ai-site` (prod) + `sovereign-agent-fleet` (substrate).

## Ratified decisions (from planning conversation)

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | **Preserve ALL slugs + canonical_url exactly.** Edit post bodies only for correctness; never rename a post. | No dead links; SEO equity retained. `canonical_url` already exists in frontmatter for all 173 posts. |
| D2 | **GCP now:** Cloud Storage + CDN for static, Cloud Run for the (later) gateway. | Matches brief literally; Vercel replaced at cutover. Old site kept live as rollback. |
| D3 | **Build-time only for v1.** Related-articles, graph, search, provenance = precomputed static artifacts. Gateway/Cloud Run designed but stubbed. | Cheapest, fully resilient, ships now. Honors "compile knowledge, don't regenerate." |
| D4 | **Both deploy paths:** local `deploy.sh` for dev + GitHub Actions/Cloud Build for prod. | Dev speed + reproducible prod. |
| D5 | **Keep Next.js 16 static export.** Extend, don't replatform the framework. | Already does SEO/sitemap/feeds/redirects/consent. Replatforming the framework = high risk, zero architectural gain. |
| D6 | **Reuse `tie/` + existing `scripts/`.** Compiler extends local-first GraphRAG concepts; don't rebuild. | Avoids recreating working infrastructure. |

## Migration inventory (real, from inspection)

```
CURRENT SITE  a10/sovereign-ai-site  (Vercel, Next.js 16 export)
├── routes      /, /blog, /research, /projects, /about, /mission, /book,
│               /privacy, /terms, /press, /llms.txt, /llms-full.txt, /sitemap, /robots
├── content     173 posts content/blog/*.md  (ALL have frontmatter: author, canonical_url,
│               date, description, image, title, OG). ~/a10/blog has 5 newer extras (drafts).
│               EXCLUDE: content/blog/temp.md (stray)
├── components  blog, projects, research, three(R3F), consent, seo, layout, ui
├── assets      public/ (SovereignAI_300dpi.png, *.m4a, ads.txt, favicon) — paths referenced
│               by frontmatter; no asset migration needed
├── metadata    JSON-LD, canonical, OG, sitemap.ts, robots.ts, reading-time
├── integrations PostHog (consent-gated) + TIE backend export
├── deployment  Vercel via kliewerdaniel/a10; prebuild feed, postbuild sitemap ping
└── infra       tie/ (local GraphRAG: NetworkX+ChromaDB), scripts/ (feed, redirects,
                theme-remap, legacy-url check)

TARGET SYSTEM
├── public knowledge portal   = Next.js static export (KEEP)
├── knowledge compiler        = NEW knowledge-compiler/ (extends tie/ concepts), build-time only
├── artifact system           = per-post JSON sidecar + global index (static)
├── sovereign gateway         = Fleet fleet/api (EXTERNAL; speaks to it, not reimplement);
│                               Cloud Run stub in v1, live calls later
├── agent integration         = build-time pull from Fleet; live queries = later phase
├── authentication            = public readable; admin/agent behind Fleet gateway (later)
├── authorization             = Fleet decides (MODEL OUTPUT ≠ AUTHORITY) — invariant enforced
└── GCP deployment            = Storage + CDN (static) + Cloud Run (gateway, scale-to-zero)
```

**Content reconciliation result:**
- 173 published posts all exist in canonical `~/a10/blog` (zero orphans).
- 5 extra posts in `~/a10/blog` (4 Hermes-Atlas + 1 context-engineering) are newer than the
  published site → optional "new content" batch, slugs preserved, your call per post.
- `temp.md` excluded from compile.

## Target architecture (v1)

```
danielkliewer.com
   │  (default path)
   ▼
Cloud CDN ──► Cloud Storage (static out/ + artifacts/)   [99% of traffic, ~$0]
   │
Next.js portal (resilient, zero runtime cost, reads static artifacts)
   │ build-time
   ▼
Knowledge Compiler (local Python, extends tie/)
   md → parse → entities/claims → hash → provenance → graph → search index
   │ emits static artifacts
   ▼
artifacts/: graph.json, search-index.json, related/<slug>.json,
           provenance/<slug>.json, artifacts/<slug>.json
   │
   └─ (later) Sovereign Gateway (Fleet fleet/api on Cloud Run, scale-to-zero)
```

Core invariant: **default request = CDN → static artifact.** No LLM, no agent, no DB at request time.

## Content / artifact model (per brief §4)

Each post keeps its human-readable body. Editorial fields extend existing frontmatter;
the compiler generates the rest into a JSON sidecar (never committed raw, regenerated each build).

```yaml
# frontmatter ADDITIONS (editorial, hand-authored)
topics: [sovereign-ai, knowledge-systems, graphrag]
status: observed | designed | proposed | experiment   # epistemic honesty
series: sovereign-intelligence-stack   # optional research-thread grouping
entities: [ed25519, fleet.epistemic.decide, graphrag]
```

```json
// artifacts/<slug>.json  (compiler-generated)
{
  "id": "<slug>",
  "title": "...", "author": "Daniel Kliewer",
  "created_at": "<date frontmatter>", "updated_at": "<compiler run / git mtime>",
  "canonical_url": "/blog/<slug>",
  "content_hash": "sha256:...",
  "schema_version": 1,
  "topics": [...], "entities": [...], "relationships": [...], "claims": [...],
  "references": [...], "related_artifacts": [...],
  "provenance": { "source": "content/blog/<slug>.md", "compiler": "knowledge-compiler@<ver>",
                  "model_version": null, "hash_chain": "<sha256>" },
  "publication_status": "published"
}
```

**Provenance (§9):** sha256 content hash + metadata sidecar. Conventional crypto integrity;
no blockchain. Fleet-generated artifacts attach Fleet's Ed25519-signed ledger. Room left for
stronger future provenance.

## Knowledge compiler (§5, build-time only)

Extends `tie/` (local-first GraphRAG) rather than rebuilding. Pipeline:

```
Markdown ─► Parser (gray-matter + mdast)
   ─► Semantic extraction (entities/claims via local heuristics; optional local LLM at build)
   ─► Graph (NetworkX; shared-entity + cross-link edges; dedupe/cluster)
   ─► Search index (LEXICAL / BM25 — no runtime vector DB, no embeddings at request time)
   ─► Static artifacts (JSON sidecars, graph.json, search-index.json, related/<slug>.json)
   ─► Emit into public/artifacts + uploaded to Storage at deploy
```

**Search decision:** lexical (BM25-style) index for v1. Avoids embedding/vector-DB dependency
entirely → fully static, cheapest, no model at runtime. Embeddings (local sentence-transformers)
may be added as build-time-only enrichment later; never at request time.

## Public website experience (§12–§14)

- Keep present nav: Research / Projects / Knowledge / Systems / Writing / About.
- New interactive knowledge layer (static, minimal client JS):
  - Article → related concepts (entities) → related articles (graph neighbors) → research
    threads (series) → projects.
  - **Provenance panel** per article: reads `/artifacts/provenance/<slug>.json` (demonstrates
    the architecture it describes, §14).
  - **Research graph widget**: static SVG/D3 from `graph.json`; only where it improves
    comprehension (§13 — no viz for viz's sake).
- Site remains fast/readable/minimal/mobile/accessible even if every backend is offline (§18–§19).

## Sovereign Gateway design (v1 = stub, §8)

Defined but not live. Stable interface contract (so portal + Fleet evolve independently):

```
Knowledge API   GET  /api/knowledge?q=        (build-time precompute now; live later)
Artifact API    GET  /api/artifact/<id>      (signed validation)
Agent API       POST /api/agent/propose      (returns proposal, never mutates site)
Authorization API  POST /api/authz/evaluate  (Fleet fleet.epistemic.decide)
Publication API POST /api/publish            (human-authorized only)
Search API      GET  /api/search?q=          (serves static index now)
```

v1: these resolve to **static artifacts** bundled in the build. Cloud Run gateway (calling
Fleet `fleet/api`) is scaffolded but inactive; scale-to-zero = $0 until enabled. The
**authorization boundary is visible in code** (gateway module isolates proposal→policy→signed
artifact→executor), even though executor is a no-op stub in v1.

## GCP architecture (§7, §21, §24)

```
Internet
   │
Cloud CDN (LB + Cloud CDN) ── caches static, serves ~all traffic
   │
Cloud Storage bucket (public, uniform; out/ + artifacts/ + feed/sitemap/robots)
   │
Cloud Run (scale-to-zero) ── gateway stub (Fleet proxy, live queries) — inactive in v1
   │
Artifact Registry (gateway image) | Secret Manager / Cloud KMS (Fleet keys, never in repo)
Cloud Build (build: next build + compiler → upload to Storage)
Cloud Logging/Monitoring (economical, sampling)
```

**IaC:** Terraform (`deploy/gcp/*.tf`) for reproducible infra per §21 — storage, CDN, Run, IAM,
secrets, DNS. (Lightweight `gcloud` script fallback available; Terraform preferred for
reproducibility.) Never commit secrets; use Secret Manager.

**DNS cutover:** only after staging verifies. Old Vercel stays live as rollback until stable.

### Rough monthly cost model (§24)

| Component | Cost @ low/modest traffic |
|-----------|---------------------------|
| Cloud Storage (site + artifacts, ~50–200 MB) | ~$0.01–0.05 |
| Cloud CDN egress (~10 GB/mo) | ~$1.00 |
| Cloud Run (scale-to-zero, stubbed) | ~$0.00–0.50 |
| Cloud Build (infrequent builds) | ~$0.00–1.00 |
| Secret Manager / KMS | ~$0.10 |
| Logging/Monitoring (low volume) | ~$0.50 |
| Cloud DNS (optional) | ~$0.20 |
| **Total** | **<$3–5 / month** |

Dominated by egress if traffic grows; compute is effectively free due to static + scale-to-zero.
Compiler runs in Cloud Build at publish time — no persistent service.

## Phased plan (dependency-ordered)

```
P1  Inspect + inventory ........................... DONE
P2  Content reconciliation: lock 173 slug list; exclude temp.md; flag 5 extras
P3  ADR: artifact frontmatter schema + compiler spec  (this doc = draft)
P4  Build knowledge-compiler/ (emit static artifacts from 173 posts)
P5  Wire portal to artifacts (related-articles, graph widget, provenance panel, search)
P6  Correct post bodies where factually stale (edit-in-place, slug intact)
P7  Gateway integration design (stable API contract; build-time pull; Cloud Run stub)
P8  GCP IaC + deploy scripts (Terraform; local deploy.sh + cloudbuild.yaml)
P9  Staging deploy + tests
P10 Production cutover (keep old site until stable) + monitoring
P11 Remove unnecessary legacy infrastructure
```

## Testing (§26) — what we verify before "done"

- URL/slug preservation (all 173 canonical_url identical pre/post)
- Artifact integrity (sha256 reproducible across builds)
- Search (lexical index returns relevant results)
- SEO (canonical, sitemap, robots, OG, JSON-LD present)
- Static fallback (site works with gateway/DB/LLM offline)
- Authorization boundary (unauthorized agent output ≠ authorized external action) — Fleet-tested
- Cold start / caching (CDN serves static; no runtime dependency)
- Mobile rendering + accessibility (existing components; re-verify)
- GCP deploy (staging → prod cutover, rollback path)

## Known limitations (v1)

- Gateway is stubbed; live Fleet queries are post-v1.
- Search is lexical, not semantic; embeddings deferred to build-time-only enrichment phase.
- "5 extra" posts not auto-published; per-post decision.
- No persistent DB by design (factual correctness reinforced by static artifacts).

## Future expansion points

- Enable Cloud Run gateway → live Fleet `fleet.epistemic.decide()` queries.
- Build-time embeddings → richer "related articles" without runtime cost.
- Physical-realization adapter (robotics/drones) on same authorization model (§16).
- Quantitative-finance subsystem isolated behind Fleet governance (§15).
- Stronger provenance (signed ledger, future blockchain option) without architecture change.
```
