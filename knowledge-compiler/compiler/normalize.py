"""Normalize: enforce canonical_url rule, normalize dates, map taxonomy.

Ratified rule (ADR-ARTIFACT-SCHEMA §1): canonical_url MUST equal /blog/<slug>.
Topics/entities are normalized to lowercase-kebab and mapped through taxonomy
aliases; unknown free-form values are preserved (never dropped).
"""
from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

import yaml

from .config import TAXONOMY_PATH
from .ingest import RawPost

_KEBAB_RE = re.compile(r"[^a-z0-9]+")


def load_taxonomy() -> dict:
    return yaml.safe_load(TAXONOMY_PATH.read_text(encoding="utf-8")) or {}


def to_kebab(value: str) -> str:
    return _KEBAB_RE.sub("-", str(value).strip().lower()).strip("-")


def normalize_date(value) -> str:
    """Accept MM-DD-YYYY, YYYY-MM-DD, or any parseable string; emit YYYY-MM-DD."""
    if value is None:
        return ""
    if isinstance(value, (list, dict)):
        value = str(value)
    s = str(value).strip().strip("'\"")
    # Already ISO-ish?
    m = re.match(r"^(\d{4})-(\d{2})-(\d{2})", s)
    if m:
        return f"{m.group(1)}-{m.group(2)}-{m.group(3)}"
    # MM-DD-YYYY
    m = re.match(r"^(\d{1,2})-(\d{1,2})-(\d{4})", s)
    if m:
        return f"{m.group(3)}-{int(m.group(1)):02d}-{int(m.group(2)):02d}"
    # Last resort: try stdlib parsing.
    from datetime import datetime

    for fmt in ("%B %d, %Y", "%b %d, %Y", "%Y/%m/%d", "%m/%d/%Y"):
        try:
            return datetime.strptime(s, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return s  # leave as-is; verify gate will surface unparseable dates


def _map_list(values, vocab: set, aliases: dict) -> list[str]:
    out: list[str] = []
    for v in values or []:
        k = to_kebab(v)
        if k in aliases:
            k = aliases[k]
        out.append(k)
    # dedupe preserving order
    seen = set()
    deduped = []
    for k in out:
        if k not in seen:
            seen.add(k)
            deduped.append(k)
    return deduped


@dataclass
class NormalizedPost:
    slug: str
    title: str
    author: str
    canonical_url: str
    created_at: str
    updated_at: str
    description: str
    image: str
    status: str
    series: str | None
    topics: list[str]
    entities: list[str]
    featured: bool
    body: str
    raw: RawPost


def normalize(post: RawPost, taxonomy: dict) -> NormalizedPost:
    fm = post.frontmatter
    slug = post.slug
    canonical = f"/blog/{slug}"
    vocab_topics = set(taxonomy.get("topics", []))
    aliases = taxonomy.get("topic_aliases", {})

    raw_topics = fm.get("topics") or fm.get("tags") or []
    topics = _map_list(raw_topics, vocab_topics, aliases)
    entities = _map_list(fm.get("entities"), set(), {})

    date_raw = fm.get("date")
    created = normalize_date(date_raw) or ""
    lastmod = normalize_date(fm.get("lastmod")) or created

    status = str(fm.get("status", "observed")).lower()
    if status not in taxonomy.get("status_values", []):
        status = "observed"

    series = fm.get("series")
    if series is not None:
        series = to_kebab(series)

    return NormalizedPost(
        slug=slug,
        title=str(fm.get("title", "")).strip(),
        author=str(fm.get("author") or "Daniel Kliewer").strip(),
        canonical_url=canonical,
        created_at=created,
        updated_at=lastmod,
        description=str(fm.get("description", "")).strip(),
        image=str(fm.get("image", "")).strip(),
        status=status,
        series=series,
        topics=topics,
        entities=entities,
        featured=bool(fm.get("featured", False)),
        body=post.body,
        raw=post,
    )
