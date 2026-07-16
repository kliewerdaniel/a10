import json

path = "/Users/danielkliewer/a10/sovereign-ai-site/src/data/projects.json"
with open(path) as f:
    projects = json.load(f)

# Principled, substance-based theme assignment.
# Theme definitions (anchored to the mission + the actual recent research):
#  compile-time-ai        -> precompute reasoning once, compile into representations explored at query time
#  knowledge-compilation   -> organize human knowledge into structured, navigable semantic artifacts (the SKB lineage)
#  cognitive-memory        -> persistent, structured memory that compounds understanding across sessions
#  local-first-ai          -> runs on your own hardware; transparent, inspectable, owned
#  research-automation     -> autonomous/semi-autonomous agents that ingest, synthesize, broadcast knowledge
#  knowledge-representation-> how understanding is modeled/made explicit (graphs, IR, publishing of what we know)
#  decision-graphs         -> explicit representations of judgment, inspectable & reusable reasoning
#  scientific-knowledge-systems -> preserving scientific knowledge & accelerating discovery; methodology/eval/observability

remap = {
    # ---- Compile-Time AI (genuinely "reason once, explore after") ----
    # NOTE: the Sovereign Knowledge Compiler / Knowledge Compiler SDK are the canonical
    # compile-time work but live in separate repos not listed here. sovereignSpec/specweave/
    # synthScript are the spec-driven *compilation* lineage and are the closest fit.
    "sovereignSpec": "compile-time-ai",
    "specweave": "compile-time-ai",
    "synthScript": "compile-time-ai",

    # ---- Knowledge Compilation (organize knowledge into navigable artifacts) ----
    "ukb": "knowledge-compilation",
    "sovereign-knowledge-engine": "knowledge-compilation",
    "blog-knowledge-base": "knowledge-compilation",
    "LGVRAG-series": "knowledge-compilation",
    "mindmap-series": "knowledge-compilation",

    # ---- Cognitive Memory ----
    "sovereign-memory-bank": "cognitive-memory",
    "brain-memory-graphrag-engine": "cognitive-memory",
    "divine-light": "cognitive-memory",
    "bot-series": "cognitive-memory",
    "basicbot": "cognitive-memory",

    # ---- Local-First AI ----
    "sovereign": "local-first-ai",
    "sovereign-scaffold": "local-first-ai",
    "sse": "local-first-ai",
    "turboq": "local-first-ai",
    "rlm": "local-first-ai",
    "ollama-chatbot": "local-first-ai",

    # ---- Research Automation (autonomous ingest/synthesize/broadcast) ----
    "objective": "research-automation",
    "objective05": "research-automation",
    "objective06": "research-automation",
    "synt": "research-automation",
    "synthInt": "research-automation",
    "dynamic_persona_moe_rag": "research-automation",
    "AMIS": "research-automation",
    "autoblog01": "research-automation",
    "concreat": "research-automation",
    "redDis": "research-automation",

    # ---- Knowledge Representation (how understanding is modeled & made explicit) ----
    "cogGraph": "knowledge-representation",
    "BookForge": "knowledge-representation",
    "stratagent": "knowledge-representation",
    "workflow": "knowledge-representation",
    "specgen": "knowledge-representation",

    # ---- Decision Graphs (explicit, inspectable judgment) ----
    # The July-2026 "compiling my blog into a decision graph" work is the canonical entry;
    # its repo is not in this list, so cogGraph (graph-based reasoning) anchors it here.
    "cogGraph": "decision-graphs",

    # ---- Scientific Knowledge Systems (preservation, discovery, methodology, eval, security) ----
    "sovereign-intelligence-stack": "scientific-knowledge-systems",
    "sovereign-intelligence-observatory": "scientific-knowledge-systems",
    "zero-trust": "scientific-knowledge-systems",
    "quantum-series": "scientific-knowledge-systems",
    "catholic-kb": "scientific-knowledge-systems",
    "cathkb": "scientific-knowledge-systems",
    "Learn": "scientific-knowledge-systems",
    "chrome-ai-filename-generator": "scientific-knowledge-systems",
}

# Older, borderline projects placed by closest honest fit:
remap["orthos"] = "cognitive-memory"

# Remove the now-conflicting earlier entries (none remain, kept for safety)
for slug in ["architecture-as-autonomy"]:
    remap.pop(slug, None)

present = {p["slug"] for p in projects}
print("MISSING slugs (no mapping):", present - set(remap.keys()))

default_theme = "scientific-knowledge-systems"
for p in projects:
    p["theme"] = remap.get(p["slug"], default_theme)
    p["layer"] = p["theme"]
    # mission_context: a short, honest line tying the project to the mission
    p["mission_context"] = (
        "This project explores one approach toward reducing the cost of understanding human knowledge by "
        + p["summary"][0].lower() + p["summary"][1:]
    )

with open(path, "w") as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)

from collections import Counter
c = Counter(p["theme"] for p in projects)
print("Counts:")
for t in ["compile-time-ai","knowledge-compilation","cognitive-memory","local-first-ai","research-automation","knowledge-representation","decision-graphs","scientific-knowledge-systems"]:
    print(f"  {t}: {c.get(t,0)}")
print("Total:", len(projects))
