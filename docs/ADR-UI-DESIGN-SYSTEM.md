# ADR: UI / Design System — "Sovereign Paper × Brutalist Terminal"

> Status: DESIGN (uncommitted). Companion to REBUILD_PLAN.md + ADR-ARTIFACT-SCHEMA.md.
> Goal: modernize the portal to current web trends WITHOUT a framework rewrite — evolve the
> existing token system, components, and `three/` R3F layer. Static export stays (no runtime JS cost).

## 0. Source trends (from attached 9-site trend collage) → mapped to our use

| Trend seen | Portal translation |
|------------|-------------------|
| Oversized hero typography (KREM, LET'S CHANGE CATERING) | Massive display headline on home + each section hero |
| Editorial serif (PUREM ODA "FOR EVERYONE BUT NOT ANYONE") | Serif for "knowledge thesis" / essay ledes; keep mono for data |
| Dark high-contrast / brutalism (KREM, Streetwear) | **Dark "void" becomes the flagship default**; paper = reading mode |
| Minimalist monochrome + photography (Fashion) | Generous whitespace, one accent, real diagrams not stock |
| Soft pastel + rounded (Balance) | Used ONLY in "wellness/approachable" explainer cards, not全局 |
| Abstract 3D fluid shapes (AI-VISIONS) | Reuse existing `three/` R3F for hero + section dividers (local, no CDN) |
| Bento grids (Furniture, Water) | **Knowledge map home** = bento of topics/projects/research |
| Card-based + tags (Streetwear, GO GYM blog) | Article cards: image + topic chip + title + **status pill** |
| Split-screen hero (Furniture) | Home hero: left manifesto type / right live 3D or graph |
| Hashtag nav (#NEW ARRIVALS) | Topic chips as primary discovery, not mega-menu |
| Badges & pills | Epistemic status (observed/designed/proposed/experiment) + entity tags |
| Data-viz trust numbers (3750 gal, 10+ yrs) | "Fleet: 6 domains, 1 frozen substrate, 0 model-dependent invariants" |
| Sticky nav + search + hamburger | Keep; add prominent search (lexical index) |
| Glassmorphism (subtle) | Frosted panels for provenance/graph overlays (token exists) |

## 1. Design principles (non-negotiable for this site)

1. **Static-first, motion-second.** Every page must be fully usable with JS off / artifacts only.
   Motion = progressive enhancement, respects `prefers-reduced-motion`.
2. **Epistemic honesty is the aesthetic.** Status pills + provenance hashes aren't decoration —
   they ARE the product (per brief §3, §9, §23). Mono + glass for anything "signed/provenance".
3. **Two modes, one system.** Dark "void" (default, flagship, terminal energy) + Paper (reading,
   essay, long-form). Toggle persists; both use the same tokens.
4. **Diagrams over stock.** No Unsplash filler. Use real generated diagrams, the 3D layer, and
   the knowledge graph. Reuse `public/` assets already present.
5. **Bento, not walls of text.** Information density via bento grids + cards, not long scrolls.

## 2. Tokens (evolved from current globals.css)

Current base kept; additions marked **[new]**.

### Color
```
Light (Paper):
  --color-base:        #EFE9D9   (cream)        — keep
  --color-base-2:      #E4DCC4                    — keep
  --color-text:        #0F0F0F   (ink)           — keep
  --color-text-2:      #2A2A2A                    — keep
  --color-text-3:      #555555                    — keep
  --color-green:       #1F8A4C   (signal)         — keep (primary accent)
  --color-pink:        #F06CA8                    — keep (secondary)
  --color-orange:      #E85A1F                    — keep
  --color-yellow:      #F5C518                    — keep
  --color-glass-bg:    rgba(239,233,217,0.92)     — keep
Dark (Void) [flagship default]:
  --color-base:        #0B0D10   **[new darker than current #0F1114]**
  --color-base-2:      #12161B                    — keep
  --color-text:        #E8E4DA                    — keep
  --color-surface-base:#12161B                    — keep
  --color-surface-hi:  #1B2026   **[new]**
  --color-glass-bg:    rgba(18,22,27,0.72) **[new]**  (frosted panels)
Accents (both modes):
  --color-signal:      #1F8A4C   (observed/verified)
  --color-draft:       #F5C518   (proposed)
  --color-experiment:  #E85A1F   (experiment)
  --color-spec:        #6C8CFF   **[new]** (designed/spec)
```

### Typography (existing + 1 addition)
```
--font-display: Archivo Black        — keep (oversized hero, brutalist)
--font-body:    Space Grotesk        — keep (UI + body)
--font-mono:    JetBrains Mono        — keep (hashes, provenance, data)
--font-serif:   Fraunces (or Newsreader)  **[new]** — editorial/knowledge-thesis ledes only
```
Type scale (fluid, clamp):
- Hero: `clamp(3rem, 9vw, 8rem)` Archivo Black, tight leading, `-0.03em`
- Section: `clamp(2rem, 5vw, 3.5rem)`
- Essay lede (serif): `clamp(1.25rem, 2.5vw, 1.75rem)` Fraunces, leading 1.5
- Body: 1.0625rem Space Grotesk, leading 1.7
- Mono micro: 0.8rem for hashes/pills/labels, uppercase, letter-spacing 0.08em

## 3. Core layout patterns

### 3.1 Home (the "knowledge portal" entry)
- **Split hero (trend: split-screen + oversized type):** left = manifesto headline
  ("Intelligence is the accumulated decisions that shaped it.") in Archivo Black; right = live
  `three/` 3D fluid shape OR the knowledge graph preview. Below fold: **bento grid**:
  - Cell A (large): "Research" (latest essays, status pills)
  - Cell B: "Projects" (sovereign-agent-fleet, hva, atlas…)
  - Cell C: "Knowledge Graph" (interactive static SVG/D3 from `graph.json`)
  - Cell D: "The Fleet" (trust numbers: 6 domains / 1 substrate / 0 model-dependent invariants)
  - Cell E: "Writing" (latest posts)
- Topic chips row (hashtag-nav trend) for discovery.

### 3.2 Blog / article
- **Article card (trend: streetwear/GO GYM card):** cover image (or placeholder) + topic chip +
  title (display) + **status pill** + reading time (mono) + date.
- **Article page:** essay lede in Fraunces; body Space Grotesk; code blocks mono.
  Right rail (or bottom on mobile): **Provenance panel** (glass) showing `content_hash` (mono),
  compiler version, entities, related artifacts. Related-articles = graph neighbors from sidecar.

### 3.3 Research / Projects / Knowledge
- Bento + cards consistent with home cells. Projects show entity/relationship from
  `data/architecture.json` (reuse, don't discard — D6).

### 3.4 Nav + search
- Sticky top bar: logo left, topic chips center, search + mode-toggle + hamburger right.
- Search → lexical index (`search.json`), instant client filter, no runtime server.

## 4. Components (map to existing; evolve, don't rewrite)

| Existing | Evolve to |
|----------|-----------|
| `components/ui/Card` | Bento cell + article card variants; glass modifier |
| `components/blog/BlogCard` | Add status pill + topic chip + mono meta |
| `components/blog/BlogSearch` / `ResearchSearch` | Unify → lexical `search.json` client search |
| `components/seo/JsonLd`, `Breadcrumbs` | Keep; add artifact `provenance` JSON-LD |
| `components/three/*` (R3F) | Hero + section-divider 3D fluid shapes (trend: AI-VISIONS) |
| `components/consent` (PostHog) | Keep consent-gated; restyle to glass |
| `components/layout` | Sticky nav w/ topic chips + mode toggle |
| `components/research`, `projects` | Bento cells |

**New components:**
- `StatusPill` — observed/designed/proposed/experiment (color per §2).
- `ProvenancePanel` — glass, reads `<slug>.json`; shows hash (mono), compiler, entities.
- `TopicChip` — hashtag-nav discovery.
- `GraphWidget` — static SVG/D3 from `graph.json` (only where it aids comprehension, §13).
- `BentoGrid` + `BentoCell` — home + section layout.

## 5. Motion & 3D (tasteful, static-safe)
- `three/` R3F: hero fluid shape + subtle section dividers. Local render, no external CDN.
  **Disabled under `prefers-reduced-motion`** and when JS off (static poster fallback).
- Micro-interactions: card hover lift (CSS only), pill pulse on "experiment". No scroll-jacking.
- Page transitions: none heavy; respect reduced-motion.

## 6. Accessibility & performance (brief §18–§19)
- WCAG AA contrast in both modes (verify green-on-void, ink-on-cream).
- Keyboard nav for chips, search, graph. Focus rings visible.
- Mobile: bento collapses to single column; 3D → static poster.
- Performance: static export; 3D lazy-loaded; no runtime DB/LLM. Lighthouse target ≥ 95.

## 7. What this is NOT
- Not a skincare/fashion site — no lifestyle stock, no soft-pastel全局.
- Not a rewrite — tokens + components evolve; routes/slugs preserved (D1).
- Not animation-heavy — motion is enhancement, never required.

## 8. Ratified design decisions (from planning conversation)

- **A) Default mode = Dark "void"** (flagship, terminal energy); Paper = reading toggle. Both share tokens.
- **B) Add Fraunces** editorial serif for knowledge-thesis / essay ledes only (1 webfont addition).
  Archivo Black (display) + Space Grotesk (body) + JetBrains Mono (data/provenance) retained.
- **C) 3D hero via existing `three/` R3F** as the signature modern moment (local render, no CDN;
  static poster + reduced-motion fallback). Knowledge graph widget stays SVG/D3 (static artifact).
