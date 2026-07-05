---
author: Daniel Kliewer
canonical_url: /blog/getting-started-sovereign-ai
date: 07-05-2026
description: "Your on-ramp to sovereign AI. Learn what sovereign AI is, how recipe compilation works, how signal routing and autonomous evaluation function, and how to get started with the Sovereign Intelligence Stack."
image: /images/ComfyUI_00201_.png
layout: post
title: 'Getting Started with Sovereign AI'
og:description: "Your on-ramp to sovereign AI. Learn what sovereign AI is, how recipe compilation works, how signal routing and autonomous evaluation function, and how to get started with the Sovereign Intelligence Stack."
og:image: /images/ComfyUI_00201_.png
og:title: 'Getting Started with Sovereign AI'
og:type: article
og:url: /blog/getting-started-sovereign-ai
tags:
  - sovereign-ai
  - getting-started
  - local-first
  - recipe-compilation
  - signal-routing
  - autonomous-evaluation
  - beginner-guide
draft: false
---

# Getting Started with Sovereign AI

> Intelligence is not the model. Intelligence is the accumulated decisions that shaped the model.

**By Daniel Kliewer**  
**Published:** July 5, 2026  
**Reading Time:** 15 minutes  
**Prerequisites:** None (beginner to advanced)  
**Related Posts:** [Sovereign AI Architecture](/blog/2026-07-05-sovereign-ai-architecture-synthesis), [The Sovereign Intelligence Stack](/blog/2026-07-04-sovereign-intelligence-stack), [The Model Is Not the Product](/blog/2026-07-03-the-model-is-not-the-product)

---

## Executive Summary

This post is your on-ramp to sovereign AI. It defines key terms, shows a simple example of recipe compilation, and points you to more advanced resources.

**What you'll learn:**
- What sovereign AI is (and isn't)
- What recipe compilation means
- What signal routing means
- What autonomous evaluation means
- How to get started with the Sovereign Intelligence Stack
- Where to find more advanced resources

---

## What is Sovereign AI?

Sovereign AI is the idea that **intelligence is not the model. Intelligence is the accumulated decisions that shaped the model.**

This means:
- The model is just a snapshot of past decisions
- The loop is what keeps accumulating
- Systems that don't capture decisions are building castles on sand
- Compounding intelligence requires capture, evaluation, and storage

### What Sovereign AI Is NOT

- **Not just local LLMs** — Local LLMs are a component, not the whole system
- **Not just agent frameworks** — Agent frameworks are tools, not architecture
- **Not just RAG** — RAG is retrieval, not intelligence
- **Not just prompts** — Prompts are inputs, not decisions

### What Sovereign AI IS

- **A compounding system** — Gets smarter over time
- **A recipe-based system** — Captures decisions as immutable records
- **A sovereign system** — No cloud APIs required, data stays local
- **An observable system** — Every decision produces a timeline event

---

## Key Concepts

### Recipe Compilation

**Definition:** Capturing AI decisions as immutable records.

**Why it matters:** Without recipes, you have no history. You have no way to know why a model made a decision, what memory it used, what the outcome was.

**What a recipe captures:**
- **Objective** — What was the task?
- **Model** — Which model was used?
- **Memory** — What memory was injected?
- **Prompt** — What was the prompt (with versioning)?
- **Reasoning Patterns** — What reasoning patterns were used?
- **Evaluation** — How was it evaluated?
- **Result** — What was the result?
- **Timestamp** — When was it captured?

**Example:**
```python
@dataclass
class Recipe:
    objective: str
    model: str
    memory_snapshot: Optional[str] = None
    prompt: Optional[str] = None
    reasoning_patterns: List[str] = field(default_factory=list)
    evaluation_score: Optional[float] = None
    outcome: str = "unknown"
    timestamp: datetime = field(default_factory=datetime.now)
    tags: List[str] = field(default_factory=list)
```

### Signal Routing

**Definition:** Classifying incoming tasks and routing them through optimal evaluation paths.

**Why it matters:** Not all tasks are created equal. Simple tasks should be routed to fast, lightweight models. Complex tasks should be routed to capable models with full context.

**Signal Types:**
- **Cheap** — Simple tasks routed to fast, lightweight models
- **Expert** — Complex tasks routed to capable models with full context
- **Hybrid** — Tasks that benefit from multi-stage evaluation

### Autonomous Evaluation

**Definition:** Self-improving loops that generate tests, evaluate performance, and detect drift.

**Why it matters:** Without evaluation, you have no way to know if your system is improving or degrading. Drift detection catches performance regressions before they compound.

**Components:**
- **Signal Registry** — Define what to evaluate
- **Test Generator** — Generate synthetic test cases
- **Drift Detector** — Detect performance drift (KS and PSI statistics)
- **Loop Controller** — Autonomous evaluation scheduling

---

## How to Get Started

### Step 1: Install the Sovereign Intelligence Stack

```bash
# Clone the repository
git clone https://github.com/kliewerdaniel/sovereign-intelligence-stack.git
cd sovereign-intelligence-stack

# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -e .
```

### Step 2: Capture Your First Recipe

```python
from src.recipe_compiler.models import Recipe
from src.recipe_compiler.storage import RecipeStorage

storage = RecipeStorage("my_stack.db")

recipe = Recipe(
    objective="Generate error handler for API calls",
    model="gpt-4",
    outcome="accepted",
    evaluation_score=0.92,
    tags=["error_handling", "api", "reliability"]
)

storage.create_recipe(recipe)
print(f"Recipe captured: {recipe.id}")
```

### Step 3: Run the Full Pipeline

```python
from src.integration.pipe import SovereignPipeline, PipelineConfig

config = PipelineConfig(db_path="intelligence.db")
pipeline = SovereignPipeline(config)
pipeline.initialize()

# Capture a recipe
recipe = Recipe(
    objective="Optimize database query",
    model="claude-2",
    outcome="accepted",
    evaluation_score=0.87,
    tags=["optimization", "database"]
)
result = pipeline.capture_recipe(recipe)

# Get intelligence summary
summary = pipeline.get_intelligence_summary()
print(summary)
```

### Step 4: Run Autonomous Evaluation

```python
from src.evaluation.loop import EvaluationLoop, LoopConfig

config = LoopConfig(
    signal_names=["code_correctness", "performance", "reliability"],
    test_count=50,
    interval_seconds=60
)
loop = EvaluationLoop(recipe_storage, config)
loop.start()
```

### Step 5: Explore the Intelligence Observatory

```python
from src.observatory.timeline import IntelligenceTimeline

timeline = IntelligenceTimeline(recipe_storage)
timeline.record_event(IntelligenceEvent(
    type="recipe_captured",
    recipe_id=recipe.id,
    timestamp=datetime.now()
))

# Get timeline
events = timeline.get_timeline(days=30)
for event in events:
    print(f"{event.timestamp}: {event.type} - {event.recipe_id}")
```

---

## What's Next?

### For Beginners

1. **Read the [Sovereign AI Architecture](/blog/2026-07-05-sovereign-ai-architecture-synthesis) post** — Comprehensive synthesis of the entire system
2. **Read the [Sovereign Intelligence Stack](/blog/2026-07-04-sovereign-intelligence-stack) post** — Deep dive into the 5-layer architecture
3. **Read the [Model Is Not the Product](/blog/2026-07-03-the-model-is-not-the-product) post** — Research validation and convergence

### For Intermediate Readers

1. **Read the [Sovereign Memory Bank](/blog/2026-06-14-sovereign-memory-bank-a-deep-dive-into-autonomous-cognitive-memory-for-agent-systems) post** — 7-layer memory system
2. **Read the [Dynamic Persona MoE RAG](/blog/2026-01-22-dynamic-persona-moe-rag) post** — Persona-driven retrieval
3. **Read the [SovereignSpec](/blog/2026-06-12-sovereignspec-local-first-spec-driven-development) post** — Spec-driven development

### For Advanced Readers

1. **Read the [Loop Is the Product](/blog/2026-07-03-the-sovereign-intelligence-observatory) post** — Intelligence Observatory deep dive
2. **Read the [Autonomous Sovereign AI](/blog/2026-07-02-building-autonomous-sovereign-ai) post** — Autoresearch loops and expert fine-tuning
3. **Contribute to the [sovereign-intelligence-stack](https://github.com/kliewerdaniel/sovereign-intelligence-stack) repository**

---

## FAQ

### Is this just local LLMs?

No. Local LLMs are a component. Sovereign AI is the entire architecture: capture, route, evaluate, store, observe.

### Do I need to use Ollama?

No. The stack works with any model provider (OpenAI, Anthropic, local LLMs, etc.). Ollama is just one option.

### Is this production-ready?

Yes. The stack has 70 Python files, 7,757 lines of code, and 26 modules verified. It's used in production for autonomous research and expert fine-tuning.

### Can I use this for my own projects?

Yes. The stack is open-source (MIT license). You can use it for any project, commercial or non-commercial.

### What's the difference between this and CrewAI?

CrewAI is a multi-agent framework. The Sovereign Intelligence Stack is a compounding intelligence system that captures decisions, routes tasks, evaluates autonomously, stores knowledge, and observes patterns. It's the operating system that makes all of these pieces work together.

---

## References

### Related Posts
- [Sovereign AI Architecture](/blog/2026-07-05-sovereign-ai-architecture-synthesis)
- [The Sovereign Intelligence Stack](/blog/2026-07-04-sovereign-intelligence-stack)
- [The Model Is Not the Product](/blog/2026-07-03-the-model-is-not-the-product)
- [The Loop Is the Product](/blog/2026-07-03-the-sovereign-intelligence-observatory)
- [Building Autonomous Sovereign AI](/blog/2026-07-02-building-autonomous-sovereign-ai)
- [Sovereign Memory Bank](/blog/2026-06-14-sovereign-memory-bank-a-deep-dive-into-autonomous-cognitive-memory-for-agent-systems)
- [Dynamic Persona MoE RAG](/blog/2026-01-22-dynamic-persona-moe-rag)
- [SovereignSpec](/blog/2026-06-12-sovereignspec-local-first-spec-driven-development)

### Related Repositories
- [sovereign-intelligence-stack](https://github.com/kliewerdaniel/sovereign-intelligence-stack)
- [Sovereign Memory Bank](https://github.com/kliewerdaniel/sovereign-memory-bank)
- [Dynamic Persona MoE RAG](https://github.com/kliewerdaniel/dynamic-persona-moe-rag)
- [Objective05](https://github.com/kliewerdaniel/objective05)
- [SovereignSpec](https://github.com/kliewerdaniel/sovereignspec)

---

*Published July 5, 2026 by Daniel Kliewer*  
*License: MIT*
