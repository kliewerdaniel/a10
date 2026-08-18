"""Ingest: read content/blog/*.md, parse frontmatter + body.

We intentionally do NOT depend on python-frontmatter (it is broken on the system
python3.9 and pulls fragile transitive deps). YAML frontmatter is parsed with
PyYAML directly; the markdown body is preserved verbatim (frontmatter excluded)
so the content hash is stable and reproducible.
"""
from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path

import yaml

from .config import EXCLUDE_SLUGS

_FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", re.DOTALL)


@dataclass
class RawPost:
    slug: str
    path: Path
    frontmatter: dict
    body: str  # raw markdown body, frontmatter excluded


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Return (frontmatter_dict, body). Falls back to {} / full text if no fence."""
    m = _FRONTMATTER_RE.match(text)
    if not m:
        return {}, text
    fm_raw, body = m.group(1), m.group(2)
    try:
        fm = yaml.safe_load(fm_raw) or {}
    except yaml.YAMLError:
        # Recover gracefully: still emit the body so the post is not dropped.
        fm = {}
    if not isinstance(fm, dict):
        fm = {}
    return fm, body


def iter_markdown_files(content_dir: Path) -> list[Path]:
    if not content_dir.exists():
        return []
    files = [p for p in content_dir.glob("*.md") if p.is_file()]
    files += [p for p in content_dir.glob("*.mdx") if p.is_file()]
    return sorted(files)


def ingest(content_dir: Path) -> list[RawPost]:
    posts: list[RawPost] = []
    for path in iter_markdown_files(content_dir):
        slug = path.stem
        if slug in EXCLUDE_SLUGS:
            continue
        text = path.read_text(encoding="utf-8")
        fm, body = parse_frontmatter(text)
        posts.append(RawPost(slug=slug, path=path, frontmatter=fm, body=body))
    return posts
