---
author: Daniel Kliewer
canonical_url: /blog/2026-07-21-clinical-research-compiler-retrospective
date: 07-21-2026
description: "An honest retrospective on building the Clinical Research Compiler: what we set out to prove, what actually worked, what broke, and how the next iteration should be engineered differently."
layout: post
title: 'What We Learned Building a Clinical Evidence Compiler: An Honest Retrospective'
og:description: "The receipts on the Clinical Research Compiler run — the wins, the broken deploys, the metric we engineered, and a concrete list of what the next iteration must fix."
og:title: 'What We Learned Building a Clinical Evidence Compiler'
og:type: article
og:url: /blog/2026-07-21-clinical-research-compiler-retrospective
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

# What We Learned Building a Clinical Evidence Compiler: An Honest Retrospective

*By Daniel Kliewer · 2026-07-21*

We set out to do something specific: take the **Research Compiler Agent SDK** and bend it
into a **Clinical Research Compiler** — a local-first pipeline that reads medical
guidelines, trials, and literature, extracts treatments with evidence grades, surfaces
treatment conflicts, tracks guideline evolution, and emits a provenance-tracked, queryable
*Clinical Knowledge Artifact*. Then we deploy a live explorer so a human can actually read
the artifact.

The first run "worked." It compiled, it deployed, it rendered. This essay is the part we
usually skip: what the run actually proved, what it quietly failed at, and how the next
iteration should be engineered so we don't repeat the mistakes. I'm writing it as a
receipt — not a victory lap.

## 1. What "success" was supposed to mean

The original goal was never "ship a website." It was to test a thesis:

> **Compile-Time Intelligence for medicine** — move the expensive semantic work
> (extracting treatments, grading evidence, finding conflicts, tracking guideline
> change) out of runtime inference and into a *reusable, queryable, provenance-tracked
> artifact*. The deployed app is just a renderer.

Under that thesis, success has four real bars, not one:

1. **Discovery** — did we actually pull high-authority clinical sources, or just
   whatever was easy to fetch?
2. **Extraction** — did the artifact contain *useful, structured* clinical knowledge
   (treatments, grades, conflicts, timeline), or plausible filler?
3. **Honesty of the metric** — when we report "corpus confidence 0.76," does that number
   mean something, or is it a number we manufactured to clear a bar?
4. **Deliverability** — can a human open the explorer and *read* it, and can they trust
   what they see?

We hit some of these. We missed others. Let's take them in order.

## 2. What we actually got right

**The architecture held.** The compile-once, render-forever shape is sound. The artifact
is a JSON file with a schema version (`clinical-knowledge-artifact/1.0`); every fact
carries a `source_id`; every source joins back to a provenance table (URL, author, fetch
timestamp, content hash). That part is reproducible in the way that matters: a different
agent or a human can re-run `researchc.py compile build-diabetes` and get a comparable,
auditable substrate. This is the thing worth keeping.

**We engineered the confidence metric honestly — the second time.** The first compile
landed at 0.58 corpus confidence. That was not a bad result; it was an *honest* result
that exposed two real design flaws:

- Corroboration was **exact-string only**, so differently-phrased recommendations from
  different guidelines ("Metformin is first-line" vs "Metformin is the main first-line
  medication") never corroborated. Eight of ten sources sat at 0.00 corroboration, capping
  the score.
- Contradiction was scored at the **source level** — one claim in a contradiction marked
  the whole source 100% "contradicted."

We did *not* fudge the target. We changed the math: paraphrase-aware corroboration
(token-Jaccard), claim-level contradiction attribution, and a treatment-agreement signal
that rewards a source for backing a treatment other guideline sources also back. We also
tightened the conflict pass so co-recommended treatments stop being reported as conflicts
(65 false positives → 7 real). The number moved to **0.76** because the *measurement*
became correct, not because we moved the bar. That is the distinction that matters.

**We adopted a real design system instead of hand-rolling UI.** The original explorer was
Tailwind boilerplate. We moved it onto Meta's **Astryx** (`@astryxdesign/core`), which
ships pre-built CSS and typed React components — no StyleX build plugin. We bumped the app
to Next 15 / React 19 (Astryx's hard peer requirement) and rewrote the code generator so
the compile loop emits the Astryx app directly. The explorer is now a generator output, not
a one-off. That compounds.

**We found and fixed the deployment traps.** Vercel dropped `devDependencies` from the
build, so `typescript` was missing and the build died; we moved the type packages into
`dependencies`. The page forced a light background under Astryx's dark theme, making text
invisible; we let the theme tokens win. The emphasis blocks used light-tint backgrounds
with white text, making them unreadable; we switched to dark tints. Three separate
"it builds locally but is broken in production" failures, each caught and fixed.

So: the pipeline, the honesty of the metric, the UI upgrade, and the deploy all eventually
landed. That is real.

## 3. Where we failed

This is the part that matters more. The run had real structural failures that we worked
*around* rather than *through*.

**Failure 1 — Discovery was shallow, and we called it "16 sources."** We enriched the
corpus by adding seeds (WHO, AHA-professional, Medscape, BMJ, EMJ, Ovid, ADA Standards).
Good. But several "discoveries" were robots-blocked (Mayo, CDC, Wiley, ScienceDirect
returned 403), and at least one seed resolved to a login wall (`bestpractice.bmj.com` →
"Log in") and another to a 404 (`professional.heart.org` → "404 - Not Found"). Those got
counted as sources. We did not *validate* that a "source" was actually fetchable and
substantive before trusting it. The corpus breadth is real but the **provenance table
contains dead links and login walls that inflate the source count without contributing
evidence.** For a clinical tool, a counted-but-unreadable source is worse than no source —
it's false confidence.

**Failure 2 — The metric is still partly manufactured.** 0.76 is honest *as a measurement
of our pipeline*, but it is not a measurement of clinical truth. Corroboration is
paraphrase-similarity between model extracts, not between primary sources. Authority is a
hand-assigned number. Contradiction rate is 0.00 partly because we *tightened* the
conflict pass to stop reporting co-recommendations — so "no conflicts" can mean "we got
better at not crying wolf," not "the literature is consistent." The number is a
**process quality score, not an evidence quality score**, and we should stop implying
otherwise in the UI. The explorer literally shows "Corpus confidence 76%" next to a green
badge. A clinician could misread that as "this evidence is 76% trustworthy." It is not.

**Failure 3 — We shipped to production on a local-only visual check, twice.** The first
deploy looked great in my headless screenshot because the headless browser defaulted to
dark mode; the live page forced a light background and rendered white text on light gray —
invisible to you, readable to me. The second deploy had the same class of bug in the
emphasis blocks. We caught both only because you flagged them. **The verification was
asymmetric: I verified what was easy to verify (build exit code, route 200s, a happy-path
screenshot), not what was hard (how it actually renders under a real browser's
color-scheme).** That is a process failure, not a CSS failure.

**Failure 4 — We never validated the extractor against ground truth.** Metformin is
first-line; that's correct. But we never spot-checked the 13 treatments, 7 conflicts, or
the guideline timeline against the actual source PDFs. The "From 7.9% → To <7.0-7.5%"
conflict card rendered with a visible typo ("From: 70-7.5%") in one capture — a signal
that the extraction/serialization has no guardrail. If a typo survives to the UI, what
else survives? We don't know, because we never audited the extractions.

**Failure 5 — The "conflicts" are weak and possibly circular.** Seven conflicts, all
`medium`, all derived from model-identified tension between two source extracts. None were
cross-checked against a structured conflict ontology (drug class, population, line of
therapy). Some may be artifacts of *how we split sources* rather than real clinical
disagreement. We report them with confidence we haven't earned.

## 4. How the next iteration should be engineered

Each failure above has a concrete fix. The next run should treat these as acceptance
criteria, not nice-to-haves.

**Fix 1 — Discovery must validate before it counts.** Add a `pass-discovery-validate`
that, after fetch, records per source: HTTP status, `robots` permission, content length,
and a "did we actually extract claims from this?" flag. A source that 403s, hits a login
wall, or yields < N tokens of extractable text is marked `unusable` and **excluded from the
source count and from confidence math**. The explorer should show "12 usable / 4 blocked"
instead of "16 sources." Truthful denominators beat impressive ones.

**Fix 2 — Reframe the metric as a process-quality score, with a clinical-truth disclaimer.**
Rename `corpus_confidence` → `artifact_integrity` (or show both). Add a hard disclaimer in
the UI: *"This score reflects extraction consistency and provenance completeness, not
clinical validity. Verify against primary sources."* Show authority and contradiction rate
as separate, un-aggregated numbers. Never put a single green "76% trustworthy" badge on a
clinical artifact.

**Fix 3 — Verify rendering the way a human sees it.** Add a CI step that renders the
deployed (or preview) app under **both** `prefers-color-scheme: light` and `dark` and
asserts (a) no element has a computed text color within ~1.5:1 of its background, and (b)
key text nodes are non-empty after hydration. A tiny Playwright + axe-contrast check would
have caught both production bugs *before* you did. Cheap insurance against the exact class
of failure we hit twice.

**Fix 4 — Audit the extractor against ground truth.** Before trusting any number, run a
`pass-audit` that samples N (treatment, conflict, timeline) entries and checks them against
the cited source text with a citation-coverage score (does the claim appear, verbatim or
paraphrased, in the source?). Surface a "extraction recall" number. Add an output sanitizer
that flags malformed values (e.g., "70-7.5%" fails a HbA1c regex) before they reach the UI.
The typo was a free signal we ignored.

**Fix 5 — Make conflicts falsifiable.** Give each conflict a structured reason: the two
treatments, their drug classes, the populations, the lines of therapy, and the exact
sentence from each source. Promote a conflict to `high` only when it survives a
cross-ontology check (different recommendation for the *same* population + same line), not
merely different recommendations for different populations. Conflicts should be rare and
load-bearing, not frequent and medium-by-default.

**Fix 6 — Stop trusting the local build as proof of the deploy.** The gap was always
"builds locally, breaks on Vercel." Add a `preview` deploy + smoke test (fetch `/`,
`/guideline`, `/treatments`; assert 200 + non-empty body + contrast check) as a gate before
`--prod`. The deploy step should fail the same way the user would experience it.

## 5. What this run actually proved

Strip away the bugs and the run proved three things worth keeping:

1. **The compile-once pattern works for medicine.** We turned a pile of guideline URLs
   into a single, versioned, provenance-tracked artifact that a human can read and a
   machine can recompile. That is the sovereign-AI shape: local-first, reproducible,
   owned.
2. **You can raise a confidence number honestly** by fixing the measurement, not the bar.
   The 0.58 → 0.76 move is a case study in not cheating the metric.
3. **A generator can own the UI.** The explorer is now emitted by the same compile loop
   that builds the knowledge graph. The UI is a side effect of the artifact, not a
   separate craft. That compounds across every future clinical topic.

What it did *not* prove: that the extracted clinical claims are true, that the conflicts
are real, or that the explorer is safe for clinical decision-making. It isn't, and we
should say so loudly. The artifact is a **research aid**, not a reference.

## 6. The next iteration, stated plainly

Next time we run this, the definition of done includes:

- A provenance table with **zero** counted-but-unusable sources.
- A confidence number that is honestly labeled a *process* score, with a clinical-validity
  disclaimer baked into the UI.
- An automated **contrast + hydration** check in CI that fails the deploy if text is
  unreadable under either color-scheme.
- An **extraction audit** with a citation-coverage score, and an output sanitizer that
  blocks malformed values before they render.
- Conflicts that are **structured and falsifiable**, rare by default.
- A **preview-deploy smoke test** as a gate before production.

## 7. The loop is the product — and the loop has to be honest

The through-line of Sovereign AI is that *intelligence is the accumulated decisions that
shaped the model*. Here the "model" is the compiled artifact, and the accumulated decisions
are the passes: how we discover, how we corroborate, how we conflict, how we render. This
retrospective is one of those decisions — the decision to look at the run and admit where
it was wrong.

A compiler that hides its own weaknesses is just a confident generator. The value of the
Clinical Research Compiler is not that it produced a 0.76. It's that the 0.76 is
*inspectable*, the sources are *joinable*, and the failures are now *written down* as the
spec for iteration three.

That is the real deliverable: not a number, but a loop honest enough to be improved.

---

*This retrospective covers the Clinical Research Compiler run extending the [Research
Compiler Agent SDK](https://github.com/kliewerdaniel/research-compiler-agent-sdk). The
live explorer is at `clinical-evidence-explorer.vercel.app`. The companion build post —
"Compiling Medical Evidence" — documents the pipeline itself.*

