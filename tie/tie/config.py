from __future__ import annotations

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env.local")

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
CONTENT_DIR = Path(__file__).resolve().parent.parent.parent / "content"

POSTHOG_API_KEY = os.environ.get("POSTHOG_PERSONAL_API_KEY", "")
POSTHOG_PROJECT_ID = os.environ.get("POSTHOG_PROJECT_ID", "")
POSTHOG_HOST = os.environ.get("POSTHOG_HOST", "https://us.posthog.com")
