---
author: Daniel Kliewer
canonical_url: /blog/2026-07-21-research-compiler-scientific-discovery
date: 07-21-2026
description: "A research vision: why scientific knowledge needs a new computational architecture. The Clinical Research Compiler SDK is an early prototype of a scientific reasoning compiler that transforms literature into versioned understanding — not a better research assistant."
layout: post
title: 'A Research Compiler for Scientific Understanding, Not a Better Research Assistant'
og:description: "Current AI retrieves and summarizes knowledge. A research compiler should transform scientific literature into versioned representations of understanding — evidence graphs, causal models, contradiction maps, unknowns, hypotheses, and research opportunities."
og:title: 'A Research Compiler for Scientific Understanding'
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

# A Research Compiler for Scientific Understanding, Not a Better Research Assistant

*By Daniel Kliewer · 2026-07-21*

This is not primarily a description of a software project. It is a research vision — an
argument for why scientific knowledge requires a new computational architecture, and what
that architecture should look like.

The immediate occasion is a build we shipped: the **Clinical Research Compiler**, an
extension of the Research Compiler Agent SDK that discovers clinical sources, extracts
treatments with evidence grades, surfaces conflicts, tracks guideline evolution, and emits a
provenance-tracked artifact rendered as a live explorer. That system works. But reading the
run back, the interesting question is not "did it deploy." It is whether the thing we built
is the right *category* of tool — and the answer is that it is only the first instance of a
much larger idea.

**Current AI systems primarily retrieve and summarize existing knowledge. A research
compiler should instead transform scientific literature into versioned representations of
scientific understanding.**

That sentence is the thesis. The rest of this essay explains it.

## 1. The distinction we kept missing

For most of this project we described the tool as a *research aide*. A research aide is,
honestly, a better search engine. The thing we were actually circling is closer to a
**scientific reasoning compiler**. The distinction is not cosmetic — it changes what the
system is for:

| Research aide | Research compiler |
|---|---|
| Finds papers | Finds relationships |
| Summarizes evidence | Synthesizes evidence |
| Answers questions | Generates questions |
| Retrieves known knowledge | Produces structured understanding |
| Helps researchers work faster | Changes what researchers can discover |

A research aide reduces the cost of *reading* scientific knowledge. A research compiler
reduces the cost of *generating new scientific understanding*. Those are different products.
The first optimizes consumption. The second optimizes discovery.

## 2. The purpose is not cheaper reading

The next version of the SDK should be built around one statement:

> **The purpose of a research compiler is not to reduce the cost of reading scientific
> knowledge. It is to reduce the cost of generating new scientific understanding.**

That means the output chain cannot stop at "disease → papers → summaries." It has to become
a compilation pipeline in which each stage is a higher-level intermediate representation:

```
Literature
  → Claims
    → Evidence
      → Mechanisms
        → Consensus
          → Contradictions
            → Unknowns
              → Hypotheses
                → Research Opportunities
```

Every arrow is a compiler pass. Every stage preserves provenance back to the literature it
came from. By the time you reach "Research Opportunities," you are no longer looking at the
literature — you are looking at a structured representation of what the literature *means*,
and where it is silent.

## 3. Papers are source code

The metaphor that makes this concrete: **papers are equivalent to source code.** A compiler
does not reason over `.c` files as prose; it parses them into an intermediate representation
and reasons over that. We should treat the literature the same way.

The true primitive is not the document. It is the **claim**. A claim is a typed, machine-
reasoned unit:

```json
{
  "claim": "Drug X reduces mortality",
  "population": "adults > 65",
  "intervention": "Drug X",
  "outcome": "all-cause mortality",
  "confidence": 0.82,
  "supporting_sources": ["src-1", "src-7"],
  "contradictions": ["src-12"]
}
```

The compiler reasons over *claims*, not PDFs. Documents become inputs to a parser; claims
become the IR the rest of the pipeline operates on. This is the single most important
architectural upgrade, because everything downstream — evidence graphs, contradiction
compilation, hypothesis generation — only becomes possible once the unit of knowledge is a
claim with structure, confidence, and provenance, rather than a paragraph.

## 4. The artifacts a compiler should emit

Once claims are the primitive, the compiler produces scientific work products — structures a
scientist can pick up and use immediately. The highest-value ones:

**Evidence Graphs.** A normal knowledge graph says `Drug → treats → Disease`. An evidence
graph makes the *evidence* a graph object:

```
Drug → reduces mortality
  Supported by:  RCT A, Meta-analysis B
  Contradicted by: Study C
  Confidence: Moderate
  Population: Adults > 65
```

The evidence itself becomes a first-class node, not a footnote.

**Contradiction Compilation.** This is one of the highest-value features, because science
progresses by *resolving* disagreements. The compiler should output:

```
Conflict #142
  Claim: "Treatment X improves survival"
  Conflict source:
    Study A: positive result
    Study B: negative result
  Possible explanation:
    ✓ Population difference
    ✓ Dosage difference
    ✓ Follow-up duration
    ✓ Statistical power
```

That is far more valuable than "here are 10 papers." It turns a pile of citations into a
*scientific debate map*.

**Knowledge Delta.** Every compilation should produce a **Git diff for science**:

```
Clinical Knowledge Compiler v1.4
  New:        + Mechanism discovered
              + Trial evidence added
  Changed:    ~ Treatment recommendation confidence increased
  Removed:    - Weak hypothesis rejected
```

This is where the "compiler" metaphor becomes real. The literature is recompiled
periodically; each version is a diff against the last. The artifact is not a snapshot — it is
a changelog of understanding.

**Unknown Detection — the killer feature.** The question is not "what do we know?" It is
"what *should* exist but does not?" Example:

```
Known:    A causes B
          B causes C
Missing:  No study has tested whether A causes C
```

The compiler generates **research gaps** by finding the missing edge in a causal chain.

**Hypothesis Generation with Provenance.** Not "AI thinks X." Instead:

```
Generated hypothesis: Pathway A may influence Disease B.
  Reason:
    Paper 1: A activates mechanism M
    Paper 2: M influences symptom S
    Paper 3: S predicts Disease B
  Novelty:    High
  Confidence: Moderate
```

The evidence chain is attached, so an expert can evaluate the hypothesis rather than trust
it.

**Research Opportunity Ranking.** The compiler ranks opportunities by novelty, impact,
evidence support, feasibility, and **expected information gain**, and outputs "here are the
20 experiments humanity should consider."

**Why This Matters.** Every artifact answers "why should a human care?" — e.g., "Three
independent pathways converge on target X; current therapies ignore this pathway; potential
impact: a new therapeutic direction."

## 5. Two modes: researcher and expert

The UI needs two modes, and the second is where the product becomes unique:

- **General researcher:** "What is known about Alzheimer's?"
- **Expert scientist:** "What assumptions in Alzheimer's research are weakest?"

The first mode is a research aide. The second is a reasoning compiler — it interrogates the
*structure* of the field, not its summary. Competing Theory Generation belongs here: the
compiler produces Model A (inflammation-first) vs Model B (protein-folding), each with an
evidence bar, and surfaces what is unresolved ("which mechanism is upstream?"). The output
is a debate map, not a verdict.

## 6. Benchmarks around discovery, not summarization

The hardest and most important shift is how we judge the thing. Do **not** benchmark "did it
summarize correctly?" Benchmark "did it identify something useful?"

- Can experts recognize the generated hypotheses as valuable?
- Does it rediscover known research gaps (face validity)?
- Does it *predict* future papers (prospective validity)?
- Does it identify contradictions earlier than reviewers do?

The success criterion is not whether a researcher saves time reading papers. It is whether
domain experts discover useful insights that were not explicitly written in any single paper
but *emerge from the structured synthesis of thousands of sources*.

## 7. The evolved SDK architecture

Concretely, the SDK should evolve into a pipeline of typed passes, each emitting an
intermediate representation that the next pass consumes — exactly like a source-code
compiler:

```
Clinical Research Compiler SDK
  Pass 1:  Document Parser        → markdown / source IR
  Pass 2:  Claim Extractor        → claim IR        (papers become claims)
  Pass 3:  Evidence Mapper        → evidence graph  (claims weighted by sources)
  Pass 4:  Causal Reasoner        → mechanism / causal graph
  Pass 5:  Contradiction Detector → contradiction map
  Pass 6:  Consensus Builder      → consensus model
  Pass 7:  Unknown Detector       → research gaps
  Pass 8:  Hypothesis Generator   → hypotheses w/ provenance
  Pass 9:  Research Planner       → ranked opportunities + experiment designs
  Output:  Scientific Understanding Artifact
```

The Clinical Research Compiler we shipped is an early prototype of this idea — it already has
a Document Parser, a Claim Extractor (in embryo), an Evidence Mapper, a Contradiction
Detector, and a Consensus/Unknown view via the guideline timeline. What it lacks is the
causal reasoner, the unknown detector, the hypothesis generator, and the research planner.
Those are the passes that turn an aide into a compiler.

## 8. What the build proved, and what it didn't

Being honest about the prototype matters, because it anchors the vision in something real.
The build proved the *substrate* works: a versioned, provenance-tracked artifact; an honest
confidence metric (we raised 0.58 → 0.76 by fixing the measurement, not the bar); a generator
that owns the UI so future work products render without a styling detour. It also surfaced
the traps that block the ambitious version — discovery counted dead links and login walls as
"16 sources"; the confidence score was a process metric mislabeled as clinical trust; we
shipped on a happy-path local check twice; we never audited extraction against ground truth.

What it did **not** prove is the thing this essay argues for: that the system reduces the
cost of *generating understanding*. It doesn't yet. It retrieves, structures, and renders.
The roadmap above is precisely the set of passes that would let it cross that line.

## 9. The reframe, and why the timing is right

Search engines organize information. Research assistants summarize information. **Research
compilers compile scientific understanding.**

That is the line the whole project should be built around. It reframes the SDK from an
application into a proposed computational architecture for science itself.

The timing is aligned with broader clinical AI trends. Current medical-AI work is
increasingly moving toward structured, auditable systems rather than purely conversational
interfaces — traceable trial-eligibility reasoning, structured clinical research artifacts,
continuous evaluation. The differentiator here is that we push the structured-artifact idea
one level higher: from *clinical data* artifacts to *scientific knowledge* artifacts. The
compiler periodically recompiles the literature into intermediate representations that
preserve provenance, uncertainty, disagreement, and evolution over time. The output is not a
summary. It is understanding, versioned — and the next important scientific question, made
visible.

---

*This essay extends the Clinical Research Compiler, built on the [Research Compiler Agent
SDK](https://github.com/kliewerdaniel/research-compiler-agent-sdk). The live explorer is at
`clinical-evidence-explorer.vercel.app`. The companion build post — "Compiling Medical
Evidence" — documents the pipeline itself.*
