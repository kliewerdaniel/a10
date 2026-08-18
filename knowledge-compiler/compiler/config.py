"""Configuration + paths for the knowledge compiler.

All paths are resolved relative to the repo root so the compiler runs identically
locally (deploy.sh) and in Cloud Build.
"""
from __future__ import annotations

from pathlib import Path

# Repo root = the sovereign-ai-site checkout (parent of knowledge-compiler/).
ROOT = Path(__file__).resolve().parent.parent.parent
COMPILER_DIR = Path(__file__).resolve().parent.parent
TAXONOMY_PATH = COMPILER_DIR / "taxonomy.json"

DEFAULT_CONTENT_DIR = ROOT / "content" / "blog"
DEFAULT_OUT_DIR = ROOT / "public" / "artifacts"

# Files never compiled.
EXCLUDE_SLUGS = {"temp"}

SCHEMA_VERSION = 1
COMPILER_NAME = "knowledge-compiler"
