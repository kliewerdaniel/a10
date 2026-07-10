from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

import networkx as nx
from rich.console import Console

from tie.config import DATA_DIR

console = Console()

TEMPLATE_PATH = Path(__file__).resolve().parent / "viz_template.html"


COLORS = {
    "article": "#4fc3f7",
    "project": "#4dd0e1",
    "page": "#29b6f6",
    "session": "#ffb74d",
    "traffic_source": "#ce93d8",
    "device": "#ba68c8",
    "topic": "#81c784",
    "conversion": "#ef5350",
    "default": "#78909c",
}


def aggregate_metrics(normalized_path: str) -> dict:
    events = json.loads(Path(normalized_path).read_text())
    metrics: dict[str, dict] = {}

    for ev in events:
        page = ev.get("page_path", "")
        if not page:
            continue
        if page not in metrics:
            metrics[page] = {
                "views": 0, "total_engagement": 0.0, "max_scroll": 0.0,
                "sessions": set(), "sources": set(), "devices": set(),
                "countries": set(),
            }
        m = metrics[page]
        m["views"] += 1
        m["total_engagement"] += ev.get("engagement_time", 0) or 0
        m["max_scroll"] = max(m["max_scroll"], ev.get("scroll_depth", 0) or 0)
        if ev.get("session_id"):
            m["sessions"].add(ev["session_id"])
        if ev.get("traffic_source"):
            m["sources"].add(ev["traffic_source"])
        if ev.get("device_category"):
            m["devices"].add(ev["device_category"])
        if ev.get("user_country"):
            m["countries"].add(ev["user_country"])

    for m in metrics.values():
        m["sessions"] = len(m["sessions"])
        m["sources"] = list(m["sources"])
        m["devices"] = list(m["devices"])
        m["countries"] = list(m["countries"])
        m["avg_engagement"] = round(m["total_engagement"] / m["views"], 1) if m["views"] else 0.0

    return metrics


def build_graph(
    normalized_path: str | None = None,
    content_path: str | None = None,
) -> nx.Graph:
    G = nx.Graph()
    page_metrics = aggregate_metrics(normalized_path) if normalized_path else {}

    if content_path:
        entities = json.loads(Path(content_path).read_text())
        for ent in entities:
            nid = f"content:{ent['id']}"
            G.add_node(
                nid,
                label=ent.get("title", ent["id"]),
                type=ent.get("type", "article"),
                node_type="content",
                color=COLORS.get(ent.get("type", ""), COLORS["default"]),
                size=15,
            )
            for topic in ent.get("topics", []):
                tid = f"topic:{topic}"
                G.add_node(tid, label=topic, type="topic", node_type="topic",
                           color=COLORS["topic"], size=10)
                G.add_edge(nid, tid, label="discusses", weight=1)

    if normalized_path:
        events = json.loads(Path(normalized_path).read_text())
        sessions = {}
        for ev in events:
            sid = ev.get("session_id", "")
            if not sid:
                continue
            if sid not in sessions:
                G.add_node(
                    f"session:{sid}",
                    label=f"Session {sid[:8]}",
                    type="session",
                    node_type="session",
                    color=COLORS["session"],
                    size=8,
                )
                sessions[sid] = True

                src = ev.get("traffic_source", "") or "direct"
                G.add_node(
                    f"source:{src}",
                    label=src,
                    type="traffic_source",
                    node_type="traffic_source",
                    color=COLORS["traffic_source"],
                    size=10,
                )
                G.add_edge(f"session:{sid}", f"source:{src}",
                           label="came_from", weight=1)

            page = ev.get("page_path", "")
            if page:
                page_id = f"page:{page}"
                m = page_metrics.get(page, {})
                G.add_node(
                    page_id,
                    label=page.split("/")[-1] or "/",
                    type="page",
                    node_type="page",
                    color=COLORS["page"],
                    size=12,
                    views=m.get("views", 0),
                    avg_engagement=m.get("avg_engagement", 0),
                    max_scroll=m.get("max_scroll", 0),
                    unique_sessions=m.get("sessions", 0),
                    sources=m.get("sources", []),
                    devices=m.get("devices", []),
                )
                G.add_edge(f"session:{sid}", page_id,
                           label="viewed", weight=1)

    return G


def export_graph_json(G: nx.Graph) -> dict:
    node_data = []
    for nid, attrs in G.nodes(data=True):
        entry = {
            "id": nid,
            "label": attrs.get("label", str(nid)),
            "title": f"{attrs.get('type', '')} — {attrs.get('label', nid)}",
            "color": attrs.get("color", COLORS["default"]),
            "size": attrs.get("size", 10),
            "group": attrs.get("node_type", "default"),
        }
        if attrs.get("views"):
            entry["views"] = attrs["views"]
            entry["avg_engagement"] = attrs.get("avg_engagement", 0)
            entry["max_scroll"] = attrs.get("max_scroll", 0)
            entry["unique_sessions"] = attrs.get("unique_sessions", 0)
            entry["sources"] = attrs.get("sources", [])
        node_data.append(entry)

    edge_data = []
    for u, v, attrs in G.edges(data=True):
        edge_data.append({
            "from": u,
            "to": v,
            "label": attrs.get("label", ""),
            "weight": attrs.get("weight", 1),
        })

    return {"nodes": node_data, "edges": edge_data}


def render_html(graph_data: dict) -> str:
    template = TEMPLATE_PATH.read_text()
    return template.replace("__GRAPH_DATA__", json.dumps(graph_data))


def build_and_render(
    normalized_path: str | None = None,
    content_path: str | None = None,
) -> str:
    G = build_graph(normalized_path, content_path)
    console.log(f"[green]Graph built:[/green] {G.number_of_nodes()} nodes, {G.number_of_edges()} edges")

    graph_data = export_graph_json(G)

    path = DATA_DIR / f"website_behavior_graph_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.html"
    html = render_html(graph_data)
    path.write_text(html)
    console.log(f"[green]Visualization saved:[/green] {path}")
    return str(path)
