---
author: Daniel Kliewer
canonical_url: /blog/2026-07-21-clinical-research-compiler-retrospective
date: 07-21-2026
description: "An honest retrospective on the Clinical Research Compiler — and the harder question it forces: a research aide is necessary but not sufficient. The real target is AI that compiles scientific understanding: synthesis that surfaces novel, correct insights and the next questions worth asking."
layout: post
title: 'From Research Aide to Scientific Synthesis: A Retrospective on the Clinical Evidence Compiler'
og:description: "We built a clinical research aide. So what? This retrospective is honest about what worked, what failed, and why the next iteration must aim higher — at compiling scientific understanding, not just retrieving and rendering it."
og:title: 'From Research Aide to Scientific Synthesis'
og.type: article
og.url: /blog/2026-07-21-clinical-research-compiler-retrospective
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
draft: false
---

# From Research Aide to Scientific Synthesis: A Retrospective on the Clinical Evidence Compiler

*By Daniel Kliewer · 2026-07-21*

We built a Clinical Research Compiler. It discovers medical sources, extracts treatments
with evidence grades, surfaces treatment conflicts, tracks guideline evolution, and emits a
provenance-tracked, queryable artifact — rendered live as an explorer. It works. It is
reproducible. It is deployed.

And then the honest question arrives, and it is the only one that matters: **so what?**

A research aide that helps someone read papers faster is necessary, but it is not
interesting. What would actually be interesting is a system that, when you put it in front
of a domain expert, they understand it *not because they have seen it before*, but because
it **properly synthesizes known knowledge in a new and novel way that solves some problem** —
where the problem can be the input *or* the output. The output problem is the seductive one:
**creating research problems which could feasibly be solved with present knowledge, but
structured better than anyone has structured them.**

That is the bar this retrospective is really about. Not "did it deploy." But: did this run
move us from *AI that retrieves knowledge* toward *AI that compiles scientific
understanding*? And if not, what specifically has to change in the next iteration so it
does?

This essay is the receipt. It covers what worked, what failed, and — most importantly — how
to engineer the next iteration toward synthesis instead of toward a prettier renderer.

## 1. What "success" was supposed to mean

The original goal was to test a thesis:

> **Compile-Time Intelligence for medicine** — move the expensive semantic work
> (extracting treatments, grading evidence, finding conflicts, tracking guideline
> change) out of runtime inference and into a *reusable, queryable, provenance-tracked
> artifact*. The deployed app is just a renderer.

That thesis is correct as far as it goes. But "renderer of an artifact" is the *floor*,
not the destination. The destination the run should have been reaching for is synthesis:

> The most valuable output of compiling thousands of sources is **not an answer to a
> question someone already asked**. It is the **discovery of the next important question
> to ask** — an insight that no single paper states explicitly, but that becomes
> apparent only when the corpus is compiled together and the contradictions, gaps, and
> convergences are made visible.

Under *that* thesis, success has bars beyond "it builds and renders":

1. **Discovery** — did we pull high-authority sources we can actually use, or just what
   was easy to fetch?
2. **Extraction** — did the artifact contain structured, trustworthy clinical knowledge?
3. **Honesty of the metric** — when we report a number, does it mean what we say it means?
4. **Deliverability** — can a human open it and read it, and trust what they see?
5. **Synthesis** — did the run produce *any* novel, evidence-backed insight or *any*
   research question a domain expert would judge worth pursuing? *(This is the bar we
   did not clear, and it is the one this retrospective is written to fix.)*

## 2. What we actually got right

**The architecture held — and it is the precondition for synthesis.** The compile-once,
render-forever shape is sound. The artifact is a JSON file with a schema version
(`clinical-knowledge-artifact/1.0`); every fact carries a `source_id`; every source joins
back to a provenance table. That reproducibility is what makes *later* synthesis possible:
you cannot synthesize across a corpus you cannot re-read deterministically. This is the
thing worth keeping, and it is the foundation the next iteration builds on.

**We engineered the confidence metric honestly — the second time.** The first compile
landed at 0.58. That exposed two real flaws: corroboration was exact-string only (so
differently-phrased recommendations never corroborated), and contradiction was scored at
the source level (one claim marked a whole source 100% contradicted). We did *not* fudge the
target. We changed the math — paraphrase-aware corroboration, claim-level contradiction
attribution, treatment-agreement signal — and tightened the conflict pass (65 false
positives → 7 real). The number moved to **0.76** because the *measurement* became correct,
not because we moved the bar. Honest metrics are a prerequisite for trusting any synthesis
the system later produces.

**We adopted a real design system and made the generator own the UI.** We moved the explorer
off Tailwind boilerplate onto Meta's **Astryx** (`@astryxdesign/core`), bumped to Next 15 /
React 19, and rewrote the code generator so the compile loop emits the Astryx app directly.
The UI is now a side effect of the artifact, not a separate craft. That compounds — and it
means the next iteration can spend its energy on *what the app shows* (synthesis) rather
than *how it is styled*.

**We found and fixed the deployment traps.** Vercel dropped `devDependencies`, breaking the
build; we moved type packages into `dependencies`. The page forced a light background under
Astryx's dark theme, rendering text invisible; we let the theme tokens win. Emphasis blocks
used light tints with white text; we switched to dark tints. Three "builds locally, breaks
in production" failures, each caught and fixed.

So the pipeline, the metric honesty, the UI upgrade, and the deploy all landed. But notice
what is missing from that list: **nowhere in "what we got right" is synthesis.** We extracted
and rendered. We did not yet *compile understanding*. That gap is the whole point of this
retrospective.

## 3. Where we failed

**Failure 0 — the big one: we never synthesized.** This is the failure that dwarfs the CSS
bugs, and it is why the "so what?" question stings. After compiling 16 sources we produced
*treatments, grades, conflicts, a timeline* — a faithful retrieval-and-structuring of what
the sources already said. We did **not** produce a single insight a domain expert would
call novel, nor a single research question the compilation itself had *earned*. The
conflicts are "Medium" restatements of known guideline differences; the timeline is a
chronology. Everything in the artifact is reconstructable from the inputs by a human in an
afternoon. The run proved we can *assemble* knowledge. It did not prove we can *compile*
it — i.e., surface something that becomes visible only at corpus scale. Until the next
iteration produces a novel, evidence-backed claim or a genuinely new research problem, this
is a research aide, not a scientific compiler.

**Failure 1 — Discovery was shallow, and we called it "16 sources."** We enriched the corpus
with seeds (WHO, AHA, Medscape, BMJ, EMJ, Ovid, ADA). But several were robots-blocked (Mayo,
CDC, Wiley, ScienceDirect → 403), one resolved to a login wall (`bestpractice.bmj.com` →
"Log in"), another to a 404 (`professional.heart.org`). Those got counted as sources. The
provenance table contains dead links and login walls that inflate the count without
contributing evidence. For synthesis, a corpus full of unreadable sources is worse than a
small readable one — you cannot synthesize across what you could not read.

**Failure 2 — The metric is a process score mislabeled as trust.** 0.76 honestly measures
our pipeline, not clinical truth. Corroboration is paraphrase-similarity between model
extracts; authority is hand-assigned; contradiction rate is 0.00 partly because we *stopped*
crying wolf. The UI shows "Corpus confidence 76%" next to a green badge — a clinician could
read that as "76% trustworthy." It is not. Until the metric is reframed, any synthesis the
system offers will inherit a credibility it has not earned.

**Failure 3 — We shipped on a happy-path local check, twice.** The first deploy looked fine
in a headless screenshot (dark-mode default) but forced a light background live, rendering
white text on light gray — invisible to you. The second had the same class of bug in
emphasis blocks. We caught both only because you flagged them. The verification was
asymmetric: easy things checked (build exit, route 200s), hard things skipped (how it
actually renders under a real browser's color-scheme). A process failure, not a CSS one.

**Failure 4 — We never validated extraction against ground truth.** The "From 7.9% → To
<7.0-7.5%" conflict card rendered with a visible typo ("From: 70-7.5%") in one capture — a
free signal that extraction/serialization has no guardrail. If a typo reaches the UI, what
else does? We never audited the 13 treatments, 7 conflicts, or the timeline against the
source PDFs. Synthesis built on unaudited extraction is synthesis built on sand.

**Failure 5 — The conflicts are weak and possibly circular.** Seven conflicts, all `medium`,
all derived from model-identified tension between two extracts, none cross-checked against a
structured conflict ontology (drug class, population, line of therapy). Some may be
artifacts of *how we split sources*, not real clinical disagreement. We report them with
confidence we have not earned.

## 4. How the next iteration should be engineered — toward synthesis

Each failure above has a concrete fix. But the fixes only matter if they serve the real
target: **AI that compiles scientific understanding.** The next run's definition of done
must include synthesis, not just a cleaner renderer.

**Fix 1 — Discovery must validate before it counts.** Add a `pass-discovery-validate` that
records per source: HTTP status, `robots` permission, content length, and "did we actually
extract claims from this?" A source that 403s, hits a login wall, or yields < N tokens is
marked `unusable` and **excluded from the source count and confidence math**. The explorer
should show "12 usable / 4 blocked," not "16 sources." Synthesis needs a corpus you can
actually read.

**Fix 2 — Reframe the metric, and stop implying clinical trust.** Rename `corpus_confidence`
→ `artifact_integrity` (or show both). Add a hard UI disclaimer: *"This score reflects
extraction consistency and provenance completeness, not clinical validity. Verify against
primary sources."* Show authority and contradiction rate as separate, un-aggregated numbers.
Never put a single green "76% trustworthy" badge on a clinical artifact. Synthesis offered
with unearned credibility is worse than none.

**Fix 3 — Verify rendering the way a human sees it.** Add a CI step that renders the app
under **both** `prefers-color-scheme: light` and `dark` and asserts (a) no element has
computed text color within ~1.5:1 of its background, and (b) key text nodes are non-empty
after hydration. A Playwright + axe-contrast check would have caught both production bugs
before you did.

**Fix 4 — Audit extraction against ground truth.** Run a `pass-audit` that samples entries
and checks them against cited source text with a citation-coverage score. Add an output
sanitizer that blocks malformed values (e.g., "70-7.5%" fails an HbA1c regex) before they
render. Synthesis is only as good as the extraction it builds on.

**Fix 5 — Make conflicts falsifiable.** Give each conflict a structured reason (drug
classes, populations, lines of therapy, exact source sentences). Promote to `high` only when
it survives a cross-ontology check (different recommendation for the *same* population +
same line). Conflicts should be rare and load-bearing.

**Fix 6 — Stop trusting the local build as proof of the deploy.** Add a `preview` deploy +
smoke test (fetch routes; assert 200 + non-empty body + contrast check) as a gate before
`--prod`.

**Fix 7 — Add the pass that makes this a *compiler*, not an aide: `pass-synthesize`.** This
is the load-bearing addition. After extraction and conflicts, run a synthesis pass that:

- scans the compiled graph for **cross-source patterns no single source states** — e.g., a
  treatment recommended first-line by N sources but withheld or deprioritized in a specific
  subpopulation by M others (a population–therapy mismatch no guideline spells out);
- identifies **gaps**: a known complication or comorbidity that *none* of the 16 sources
  address for a treatment they all recommend;
- and, crucially, **formulates research questions**: "Given convergence on X and silence on
  Y, what trial would resolve the uncertainty?" — i.e., the output problem of *creating
  research problems which could feasibly be solved with present knowledge, structured
  better*.

Each synthesized claim and question carries its evidence trace (which sources support it,
which contradict, what is missing) so it is inspectable, not a black box.

**Fix 8 — Add an expert-recognition gate.** The success criterion is not "the model emitted
an insight." It is: *a domain expert judges it novel and correct.* The next iteration should
include a structured evaluation — present synthesized claims and questions to a clinician
(or a panel), record "novel? correct? worth pursuing?" — and report that score alongside
artifact integrity. If synthesis can't survive an expert, it isn't synthesis; it's
generation.

## 5. What this run actually proved

Strip away the bugs and the run proved three things worth keeping:

1. **The compile-once pattern works for medicine** — a versioned, provenance-tracked
   artifact a machine can recompile and a human can read. The sovereign-AI shape:
   local-first, reproducible, owned.
2. **You can raise a confidence number honestly** by fixing the measurement, not the bar.
3. **A generator can own the UI**, so future iterations spend energy on *what is shown*
   (synthesis) rather than *how it is styled*.

What it did **not** prove: that the extracted claims are true, that the conflicts are real,
or — the decisive one — that the system can *compile understanding*. It can't yet. The
artifact is a **research aide**, not a reference, and not yet a compiler of scientific
synthesis.

## 6. The next iteration, stated plainly

Definition of done for iteration three:

- A provenance table with **zero** counted-but-unusable sources.
- A confidence number honestly labeled a *process* score, with a clinical-validity
  disclaimer in the UI.
- An automated **contrast + hydration** check in CI.
- An **extraction audit** with citation-coverage, and an output sanitizer.
- Conflicts that are **structured and falsifiable**, rare by default.
- A **preview-deploy smoke test** as a gate before production.
- A **`pass-synthesize`** that emits novel, evidence-traced insights *and* candidate
  research questions the compilation itself earned.
- An **expert-recognition gate** reporting "novel / correct / worth pursuing" for synthesized
  output.

## 7. The loop is the product — and the loop has to aim higher

The through-line of Sovereign AI is that *intelligence is the accumulated decisions that
shaped the model*. Here the "model" is the compiled artifact, and the accumulated decisions
are the passes. This retrospective is one of those decisions: the decision to admit the run
built a research aide and to specify, concretely, what would make the next one a *compiler
of scientific understanding*.

Retrieval answers questions people already thought to ask. Compilation — done right —
surfaces the questions nobody had framed yet, because they only become visible when
thousands of sources are read together and their agreements, gaps, and contradictions are
made legible. That is the interesting target. The 0.76 is not the deliverable. The deliverable
is a loop honest enough to be improved, and an iteration that finally produces the one thing
this run did not: **synthesis an expert recognizes as both new and true.**

---

*This retrospective covers the Clinical Research Compiler run extending the [Research
Compiler Agent SDK](https://github.com/kliewerdaniel/research-compiler-agent-sdk). The live
explorer is at `clinical-evidence-explorer.vercel.app`. The companion build post —
"Compiling Medical Evidence" — documents the pipeline itself.*
