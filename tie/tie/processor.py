from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

import yaml
from rich.console import Console

from tie.config import CONTENT_DIR, DATA_DIR
from tie.models import ContentEntity, RawTelemetryEvent

console = Console()


def normalize_posthog_events(raw_path: str) -> str:
    raw = json.loads(Path(raw_path).read_text())
    normalized = []

    for ev in raw:
        props = ev.get("properties", {})
        event = RawTelemetryEvent(
            timestamp=ev.get("timestamp", ev.get("event", "")),
            event_name=ev.get("event", ""),
            page_path=props.get("$current_url", ""),
            session_id=props.get("$session_id", ""),
            user_country=props.get("$country", ""),
            device_category=props.get("$device_type", ""),
            traffic_source=props.get("$utm_source", props.get("$referring_domain", "")),
            referrer=props.get("$referrer", ""),
            engagement_time=float(props.get("$engagement_time", 0) or 0) / 1000,
            scroll_depth=float(props.get("$scroll_depth", 0) or 0),
            events=props.get("$set", []),
        )
        normalized.append(event.model_dump())

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    path = DATA_DIR / f"normalized_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.json"
    path.write_text(json.dumps(normalized, indent=2, default=str))
    return str(path)


def parse_content_layer() -> list[ContentEntity]:
    entities = []

    for file_path in CONTENT_DIR.rglob("*.md"):
        rel = file_path.relative_to(CONTENT_DIR)
        parts = list(rel.parts)
        content_type = parts[0] if len(parts) > 1 else "page"

        raw = file_path.read_text(encoding="utf-8")
        if raw.startswith("---"):
            parts_split = raw.split("---", 2)
            if len(parts_split) >= 3:
                frontmatter_raw = parts_split[1]
                fm = yaml.safe_load(frontmatter_raw) or {}
                entity = ContentEntity(
                    id=file_path.stem,
                    type=content_type,
                    title=fm.get("title", file_path.stem),
                    topics=fm.get("tags", fm.get("topics", [])),
                    entities=[],
                    path=str(rel),
                )
                entities.append(entity)

    path = DATA_DIR / "content_entities.json"
    path.write_text(json.dumps([e.model_dump() for e in entities], indent=2))
    return entities
