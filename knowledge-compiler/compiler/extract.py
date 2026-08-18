"""Local heuristic extraction: entities, claims, references.

No LLM by default (confidence: null). Extraction is deterministic and cheap so
the compiler runs identically local + Cloud Build with zero external calls.
"""
from __future__ import annotations

import re
from dataclasses import dataclass, field

from .normalize import NormalizedPost

# Sentence splitter (lightweight; handles . ! ? and newlines)
_SENT_SPLIT = re.compile(r"(?<=[.!?])\s+|\n+")

# Sentence-internal capitalized multi-word terms: "Sovereign Memory Bank",
# "Dynamic Persona MoE RAG". We deliberately EXCLUDE terms at the start of a
# sentence (those are usually title-case sentence openers, not entities).
_CAP_TERM = re.compile(r"(?<=\s)([A-Z][a-z0-9]+(?:\s+[A-Z][a-z0-9]+){1,3})(?=\s|$|[.,;:!?])")

# fleet.* tokens used as entity ids
_FLEET_TOKEN = re.compile(r"\bfleet\.[a-z_][a-z0-9_.]*\b")

# Words that, if they begin a capitalized phrase, indicate a generic instructional
# section heading / fragment rather than a knowledge entity. These appear in many
# posts (e.g. "## Setting Up", "Best Practices") and add graph noise.
_GENERIC_PHRASE_STOP = {
    "setting up", "set up", "installing", "install", "getting started",
    "best practices", "common issues", "troubleshooting", "prerequisites",
    "prerequisites before", "next steps", "related posts", "use cases",
    "error handling", "comprehensive guide", "quick start", "quickstart",
    "table of contents", "introduction to", "overview of", "deep dive",
    "step by step", "how to", "what is", "why you", "closing an",
    "current state", "historical timeline", "final thoughts", "key takeaways",
    "before you", "conclusion", "summary", "appendix",
}
# Words that, if they begin a capitalized phrase, almost always indicate a
# sentence/fragment opener rather than a proper-noun entity.
_OPENER_STOP = {
    "this", "that", "these", "those", "the", "a", "an", "we", "i", "you", "they",
    "it", "in", "on", "for", "to", "of", "and", "but", "or", "our", "my", "your",
    "his", "her", "their", "its", "when", "where", "what", "how", "why", "here",
    "there", "if", "as", "by", "from", "at", "with", "while", "although", "because",
    "abstract", "introduction", "conclusion", "overview", "summary", "background",
    "method", "methods", "results", "discussion", "figure", "table", "section",
}

# Claim markers: "X is/means/requires/defines ..."
_CLAIM_MARK = re.compile(
    r"\b(.{8,200}?)\b(is|are|means|requires|defines|represents|enables|prevents)\b"
    r"(.{0,120}?)(?:[.!?]|\n|$)",
    re.IGNORECASE,
)

# Markdown links: [text](target)
_MD_LINK = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
# Wiki/in-page crosslinks of the form /blog/<slug>
_BLOG_LINK = re.compile(r"/blog/([0-9]{4}-[0-9]{2}-[0-9]{2}-[a-z0-9-]+)")


@dataclass
class Extraction:
    entities: list[str]
    claims: list[dict] = field(default_factory=list)
    references: list[str] = field(default_factory=list)
    crosslink_slugs: set[str] = field(default_factory=set)


def extract(post: NormalizedPost) -> Extraction:
    body = post.body
    text_plain = re.sub(r"```.*?```", " ", body, flags=re.DOTALL)  # drop code fences
    text_plain = re.sub(r"`[^`]*`", " ", text_plain)

    # entities: explicit frontmatter + fleet.* tokens + notable capitalized terms
    entities = list(post.entities)
    for tok in _FLEET_TOKEN.findall(body):
        entities.append(tok)
    for term in _CAP_TERM.findall(body):
        # term may have a leading sentence opener (e.g. "When Sovereign Memory Bank")
        words = term.strip().split()
        if not words:
            continue
        if words[0].lower() in _OPENER_STOP:
            words = words[1:]
        if not words or len(words) < 2:
            continue
        phrase = " ".join(words).lower()
        if phrase in _GENERIC_PHRASE_STOP:
            continue
        entities.append(phrase)
    # dedupe
    seen = set()
    uniq_entities = []
    for e in entities:
        k = e.strip().lower()
        if k and k not in seen:
            seen.add(k)
            uniq_entities.append(k)

    # claims
    claims = []
    for m in _CLAIM_MARK.finditer(text_plain):
        subject = m.group(1).strip().strip("\"'")
        pred = m.group(2)
        obj = m.group(3).strip().strip("\"'")
        if len(subject) < 4 or len(obj) < 3:
            continue
        text = f"{subject} {pred} {obj}".strip()
        claims.append({"text": text, "confidence": None, "evidence_refs": []})
    claims = claims[:25]  # cap to keep sidecars lean

    # references + crosslinks
    references: list[str] = []
    crosslinks: set[str] = set()
    for _txt, target in _MD_LINK.findall(body):
        if target.startswith("http://") or target.startswith("https://"):
            references.append(target)
        elif m := _BLOG_LINK.search(target):
            crosslinks.add(m.group(1))
        elif target.startswith("/blog/"):
            slug = target[len("/blog/"):].strip("/")
            crosslinks.add(slug)

    return Extraction(
        entities=uniq_entities,
        claims=claims,
        references=references,
        crosslink_slugs=crosslinks,
    )
