---
author: Daniel Kliewer
canonical_url: /blog/2026-07-21-research-compiler-scientific-discovery
date: 07-21-2026
description: "A retrospective that crosses a threshold: the Clinical Research Compiler is no longer a better research assistant. It is a proposed computational model for scientific discovery — optimizing scientific progress, not information retrieval."
layout: post
title: 'Beyond the Research Assistant: A Research Compiler as a Computational Model for Scientific Discovery'
og:description: "We built a clinical research aide. The retrospective argues the project should aim far higher: a research compiler that transforms the literature into versioned scientific understanding and helps humanity create new knowledge."
og:title: 'A Research Compiler for Scientific Discovery, Not Retrieval'
og.type: article
og.url: /blog/2026-07-21-research-compiler-scientific-discovery
image: "/images/12092025/uncensored-ai-chatbot-architecture-diagram.png"
tags:
  - ai-agents
  - compile-time-ai
  - knowledge-compiler
  - knowledge-graph
  - local-first-ai
  - provenance
  - reproducible-ai
  - ollama
  - research-compiler
  - clinical-ai
  - sovereign-ai
  - scientific-discovery
draft: false
---

# Beyond the Research Assistant: A Research Compiler as a Computational Model for Scientific Discovery

*By Daniel Kliewer · 2026-07-21*

We built a Clinical Research Compiler. It discovers sources, extracts treatments with
evidence grades, surfaces conflicts, tracks guideline evolution, and renders a
provenance-tracked artifact. It works, it is reproducible, it is deployed.

But reading the run back, something more interesting happened than "we shipped an app." The
retrospective stopped being a story about a better interface or a better RAG system. It
started asking what a *compiler for science* should actually produce. And that question
crosses a threshold.

**A research compiler should not optimize information retrieval. It should optimize
scientific progress.**

That sounds subtle. It is not. It completely changes the SDK.

## 1. The sentence that should define the SDK

This is the line I would build everything around:

> **A research compiler periodically transforms the world's scientific literature into
> versioned representations of current scientific understanding, producing hypotheses,
> explanations, and research opportunities that are fully traceable to their supporting
> evidence.**

Notice the emphasis. It is no longer on *documents*. It is on **scientific understanding**.
The unit of output is not a paper, a summary, or a retrieved passage. It is a
*representation of what we know* — and the gaps, contradictions, and opportunities inside
it — each step traceable back to the literature it came from.

That sentence reframes the whole project from an application into a **proposed
computational model for scientific discovery**.

## 2. The pipeline shift

Today the pipeline is essentially:

```
Papers
  → Search
    → Summaries
      → Research assistant
```

That is useful. It is also not transformative. It optimizes *finding and consuming*
knowledge — the job of search engines and research assistants.

The pipeline we actually want is:

```
Scientific literature
  → Compiler
    → Structured scientific understanding
      → Research acceleration
```

Here the compiler is not *serving humans information*. It is *serving humans new
understanding* — and, downstream, the opportunities to extend it. The compiler's customer
is not a reader. It is the scientific process itself.

## 3. What the run actually built — and how far it is from the target

Being honest about the run matters more now, because the run is the *first rung* of the
ladder, not the destination. Here is what we can claim.

**The architecture is the precondition, and it held.** Compile once, render forever. The
artifact is a versioned JSON (`clinical-knowledge-artifact/1.0`); every fact carries a
`source_id`; every source joins back to a provenance table. That reproducibility is exactly
what a discovery compiler needs: you cannot compile understanding across a corpus you
cannot re-read deterministically. This is the foundation the ambitious version builds on.

**We engineered the confidence metric honestly.** First compile: 0.58. We resisted fudging
the bar and instead fixed the measurement — paraphrase-aware corroboration, claim-level
contradiction attribution, treatment-agreement signal — and tightened the conflict pass (65
false positives → 7 real). It landed at **0.76** because the *measurement* became correct.
Honest metrics are a prerequisite for trusting any hypothesis the compiler later emits.

**We made the generator own the UI** (Astryx, Next 15 / React 19) so future iterations spend
energy on *what the app shows* — synthesis and opportunity — rather than styling.

So we built a working **research aide**: it retrieves, structures, and renders clinical
knowledge. And that is precisely the ceiling we have to name. The run optimized
*information retrieval and consumption*. It did **not** optimize scientific progress. Every
output was reconstructable from the inputs by a human in an afternoon. We assembled
knowledge; we did not compile understanding.

## 4. Where we failed — measured against the new target

Reframed through the discovery-compiler lens, the failures are sharper and more consequential
than CSS bugs:

**We optimized retrieval, not progress.** The entire pipeline — discover, extract, grade,
conflict, timeline — is retrieval-and-structuring. None of it asks "what should we now
*do*?" or "what do we now *know that we didn't*?" It serves consumption.

**We never compressed the literature.** We held 16 sources and emitted treatments, grades,
conflicts, a timeline. We never progressively compressed the corpus into higher-level
representations — mechanisms, causal relationships, unresolved controversies, unknowns.
The product is still "the literature, structured," not "what the literature *means*."

**We never produced a scientific work product.** The outputs are artifacts, not the graphs
a scientist could immediately use: no Evidence Graph, no Consensus Graph, no Contradiction
Graph, no Mechanism Graph, no Hypothesis Graph, no Research-Opportunity Graph, no
Experimental-Design Graph.

**We never estimated knowledge state.** No Knowledge Entropy / Stability (is this question
solved or chaos?), no Knowledge Gain changelog ("what did humanity learn this version?"), no
Expected Information Gain ("which experiment increases knowledge most?").

**We never generated theories or programs.** No competing explanatory models, no
five-year research roadmaps, no Discovery Distance, no Opportunity Density map, no
Missing-Vocabulary detection across disciplines.

**The discovery traps we did hit** are worth keeping on the record, because they block the
ambitious version too: discovery counted dead links and login walls as "16 sources"; the
0.76 was a process score mislabeled as clinical trust; we shipped on a happy-path local
check twice (you caught both unreadable-UI bugs); we never audited extraction against
ground truth (a "70-7.5%" typo reached the UI); the conflicts were weak and possibly
circular. A compiler that emits hypotheses on unaudited, partly-unreadable sources is worse
than an aide — it manufactures authority.

## 5. Redefining the compiler outputs: scientific work products

Today the outputs are mostly artifacts. Tomorrow they should become **scientific work
products** — structures a scientist can pick up and use immediately. Concretely, the
compiler should emit a ladder of graphs:

```
Knowledge Graph
  → Evidence Graph
    → Consensus Graph
      → Contradiction Graph
        → Mechanism Graph
          → Hypothesis Graph
            → Research-Opportunity Graph
              → Experimental-Design Graph
```

Each is a different level of compression, each traceable to sources. The Evidence Graph
says what is supported. The Consensus Graph says where the field agrees. The Contradiction
Graph says where it doesn't. The Mechanism Graph says *how* things work. The Hypothesis
Graph says what is still unknown-but-implied. The Research-Opportunity Graph says where to
spend effort. The Experimental-Design Graph says *how* to spend it.

## 6. The compiler passes that make this a discovery engine

These are the passes the next iterations must add. They are the substance of "optimize
scientific progress" rather than "optimize retrieval."

**Scientific Compression.** Humans don't want papers; they want "what changed our
understanding?" The compiler should progressively compress the literature into
increasingly higher-level representations while preserving provenance. Compile 10,000
papers → 37 mechanisms → 9 unresolved controversies → 22 high-confidence causal
relationships → 5 major unknowns. That is an entirely different product, and the provenance
chain is what makes it trustworthy.

**Knowledge Gain.** Every compiler version should answer *"what did humanity learn?"* — not
*"what papers were published?"* A version changelog reads: *new causal mechanism, stronger
evidence, weaker evidence, new contradiction, consensus shifted, new unexplored hypothesis,
research gap discovered.* That becomes a **changelog for science itself**.

**Knowledge Entropy / Stability.** Estimate, per question, whether the literature is solved
or chaos. High entropy: contradictory literature, poor replication, weak studies,
inconsistent outcomes. Low entropy: decades of agreement, strong meta-analyses, reproducible
mechanisms. This is useful immediately — it tells a reader where certainty lives.

**Expected Information Gain.** Instead of recommending papers, recommend *experiments*. The
compiler should ask: *if we spend one million dollars, which experiment increases human
knowledge the most?* This aligns with active learning and optimal experiment design — it is
fundamentally different from retrieval.

**Research Programs, not just questions.** Don't emit a lone "research question." Emit a
five-year roadmap: Experiment 1 → Experiment 2 → Experiment 3 → Clinical Trial → Guideline
Update. The compiler starts thinking longitudinally.

**Discovery Distance.** Measure how many inference steps separate known knowledge from an
undiscovered hypothesis. Paper A → Paper B → Paper C → compiler discovers D: Discovery
Distance = 3. Very small distances are likely high-value hypotheses — "close" to existing
evidence but not yet explicit.

**Opportunity Density.** Map every field across Known / Unknown / Contradicted / Missing /
Understudied / Impossible. The compiler literally charts *where scientific opportunity
exists*.

**Automatic Theory Generation.** Don't stop at one hypothesis — generate *competing
explanatory models*. Scientists don't just need answers; they need better explanations.

**Missing-Vocabulary Detection.** Fields often discover the same phenomenon under different
names. The compiler should flag equivalent concepts, mechanisms, biomarkers, and pathways
*across disciplines* — a direct win for interdisciplinary synthesis.

## 7. Redefining the optimization target

Today the optimization target is approximately *accuracy*. That is the wrong objective for a
discovery engine. It should be a **multi-objective optimization problem**:

- Maximize **novelty**
- Maximize **correctness**
- Maximize **reproducibility**
- Maximize **explanatory power**
- Maximize **expected information gain**
- Minimize **unsupported speculation**
- Minimize **contradiction without evidence**
- Preserve **complete provenance**

Notice that "accuracy" doesn't even survive as the lone target — and that "preserve complete
provenance" is a hard constraint, not a soft preference. A hypothesis with no traceable
evidence path fails the build, however novel.

## 8. What this run proved, and the roadmap it implies

Strip away the bugs and the run proved three things worth keeping — and now we can see
exactly how they seed the ambitious version:

1. **The compile-once, versioned, provenance-tracked artifact works.** That is the
   substrate every graph in Section 5 is built from. It is the *representation* primitive the
   discovery compiler needs.
2. **You can raise a confidence number honestly by fixing the measurement.** That discipline
   is what makes Knowledge Entropy and Knowledge Gain *trustworthy* rather than decorative.
3. **A generator can own the UI**, so the explorer can render the new work products
   (Opportunity Density maps, Experimental-Design Graphs) without a styling detour.

What it did **not** prove is the thing that matters: that the system optimizes scientific
progress. It doesn't yet. So iteration three's definition of done becomes a roadmap toward
the model, not just a cleaner aide:

- **Preconditions (carry over):** provenance table with zero counted-but-unusable sources;
  confidence honestly labeled a process score with a clinical-validity disclaimer; automated
  contrast + hydration CI check; extraction audit with citation-coverage; falsifiable,
  rare-by-default conflicts; preview-deploy smoke test.
- **Compression pass:** emit the graph ladder of Section 5, each node traceable to sources.
- **Knowledge Gain + Entropy:** per-version "what humanity learned" changelog and a
  Stability estimate per question.
- **Synthesis + Expected Information Gain:** a `pass-synthesize` that emits novel,
  evidence-traced insights *and* the experiment that would resolve the largest remaining
  uncertainty.
- **Theory + Program generation:** competing explanatory models and a five-year research
  roadmap per high-opportunity area.
- **Discovery Distance + Opportunity Density + Missing-Vocabulary:** the maps that tell a
  scientist *where* to look.
- **Expert-recognition gate:** synthesized output is judged novel / correct / worth pursuing
  by a domain expert, and that score is reported alongside artifact integrity.

## 9. The reframe

Search engines help us *find* knowledge. Research assistants help us *consume* it. Research
compilers should help humanity *create new* knowledge.

That single sentence reframes the SDK from an application into a proposed computational
model for scientific discovery. It also aligns with where clinical AI is actually heading:
away from isolated tools and toward integrated knowledge infrastructures — standardized
representations, continuous evaluation, and decision support rather than simple retrieval.

The 0.76 confidence number was never the deliverable. The deliverable is the loop — honest
enough to be improved, and aimed high enough to matter. This run built the first rung: a
reproducible compiler that assembles clinical knowledge with provenance. The next rungs are
the ones that make it a compiler for science itself — one that periodically transforms the
literature into versioned understanding, and tells us not just what we read, but what we
learned, what we contradict, and what we should do next.

---

*This retrospective covers the Clinical Research Compiler run extending the [Research
Compiler Agent SDK](https://github.com/kliewerdaniel/research-compiler-agent-sdk). The live
explorer is at `clinical-evidence-explorer.vercel.app`. The companion build post —
"Compiling Medical Evidence" — documents the pipeline itself.*
