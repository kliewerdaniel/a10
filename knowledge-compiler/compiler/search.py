"""Lexical BM25 search index (no embeddings, no vector DB — per D3/D6).

Tokens are lowercased word tokens. BM25 with default k1=1.5, b=0.75.
Stored as static JSON: { slug, title, excerpt, tokens, score_meta }. The portal
does ranking client-side or via a tiny precomputed post list.
"""
from __future__ import annotations

import math
import re
from dataclasses import dataclass, field

from .normalize import NormalizedPost

_TOKEN_RE = re.compile(r"[a-z0-9][a-z0-9'-]*")
_STOP = set(
    "the a an and or of to in on for with is are was were be been being this that "
    "it its at by from as we you they he she his her their our your i my me us them "
    "not no but if then than so can will would could should may might must do does did "
    "have has had about into over under more most other some such only own same just "
    "what which who whom whose when where why how all any each few both one two three".split()
)


@dataclass
class SearchEntry:
    slug: str
    title: str
    excerpt: str
    tokens: list[str] = field(default_factory=list)


def tokenize(text: str) -> list[str]:
    toks = _TOKEN_RE.findall(text.lower())
    return [t for t in toks if t not in _STOP and len(t) > 1]


def build_search(posts: list[NormalizedPost]) -> list[SearchEntry]:
    entries: list[SearchEntry] = []
    for p in posts:
        plain = re.sub(r"```.*?```", " ", p.body, flags=re.DOTALL)
        plain = re.sub(r"`[^`]*`", " ", plain)
        text = f"{p.title} {p.description} {plain}"
        tokens = tokenize(text)
        excerpt = re.sub(r"\s+", " ", plain).strip()[:280]
        entries.append(SearchEntry(slug=p.slug, title=p.title, excerpt=excerpt, tokens=tokens))
    return entries


def _bm25_scores(entries: list[SearchEntry], query: str) -> list[tuple[str, float]]:
    q_tokens = tokenize(query)
    if not q_tokens:
        return []
    df: dict[str, int] = {}
    for e in entries:
        uniq = set(e.tokens)
        for t in q_tokens:
            if t in uniq:
                df[t] = df.get(t, 0) + 1
    N = len(entries)
    k1, b = 1.5, 0.75
    avdl = sum(len(e.tokens) for e in entries) / max(N, 1)
    scores: list[tuple[str, float]] = []
    q_freq = {}
    for t in q_tokens:
        q_freq[t] = q_freq.get(t, 0) + 1
    for e in entries:
        dl = len(e.tokens)
        score = 0.0
        counts: dict[str, int] = {}
        for t in e.tokens:
            counts[t] = counts.get(t, 0) + 1
        for t in set(q_tokens):
            if t not in counts:
                continue
            idf = math.log(1 + (N - df.get(t, 0) + 0.5) / (df.get(t, 0) + 0.5))
            tf = counts[t]
            score += q_freq[t] * idf * (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * dl / max(avdl, 1)))
        if score > 0:
            scores.append((e.slug, round(score, 4)))
    scores.sort(key=lambda x: x[1], reverse=True)
    return scores


def search(entries: list[SearchEntry], query: str, top_n: int = 10) -> list[dict]:
    """Lightweight runtime index + query helper (also usable by tests)."""
    scores = _bm25_scores(entries, query)
    by_slug = {e.slug: e for e in entries}
    out = []
    for slug, score in scores[:top_n]:
        e = by_slug[slug]
        out.append({"slug": slug, "title": e.title, "excerpt": e.excerpt, "score": score})
    return out


def export_search_json(entries: list[SearchEntry]) -> dict:
    return {
        "engine": "bm25",
        "k1": 1.5,
        "b": 0.75,
        "entries": [
            {"slug": e.slug, "title": e.title, "excerpt": e.excerpt, "tokens": e.tokens}
            for e in entries
        ],
    }
