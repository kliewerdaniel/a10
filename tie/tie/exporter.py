from __future__ import annotations

import json
from datetime import datetime, timedelta

import httpx
from rich.progress import Progress

from tie.config import DATA_DIR, POSTHOG_API_KEY, POSTHOG_HOST, POSTHOG_PROJECT_ID


def export_posthog_events(days: int = 30) -> str:
    if not POSTHOG_API_KEY:
        raise RuntimeError(
            "POSTHOG_PERSONAL_API_KEY not set. "
            "Get a Personal API Key from https://app.posthog.com/settings/user-api-keys"
        )

    headers = {"Authorization": f"Bearer {POSTHOG_API_KEY}"}
    since = (datetime.utcnow() - timedelta(days=days)).isoformat()
    url = f"{POSTHOG_HOST}/api/projects/{POSTHOG_PROJECT_ID}/events/"
    params = {"after": since, "limit": 10000}

    all_events = []

    with httpx.Client(timeout=30.0) as client:
        while url:
            resp = client.get(url, headers=headers, params=params)
            resp.raise_for_status()
            data = resp.json()
            all_events.extend(data.get("results", []))
            url = data.get("next")
            params = None

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    path = DATA_DIR / f"posthog_export_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.json"
    path.write_text(json.dumps(all_events, indent=2, default=str))
    return str(path)
