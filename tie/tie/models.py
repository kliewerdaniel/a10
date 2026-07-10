from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class RawTelemetryEvent(BaseModel):
    timestamp: str = ""
    event_name: str = ""
    page_path: str = ""
    session_id: str = ""
    user_country: str = ""
    device_category: str = ""
    traffic_source: str = ""
    referrer: str = ""
    engagement_time: float = 0.0
    scroll_depth: float = 0.0
    events: list[dict[str, Any]] = []


class ContentEntity(BaseModel):
    id: str
    type: str = "article"
    title: str = ""
    topics: list[str] = []
    entities: list[str] = []
    path: str = ""


class Observation(BaseModel):
    page: str
    views: int = 0
    avg_time: float = 0.0
    meaning: str = ""


class Hypothesis(BaseModel):
    observation: str
    conclusion: str
    confidence: float = 0.0


class Recommendation(BaseModel):
    hypothesis: str
    action: str
    status: str = "proposed"
