"""Knowledge graph construction (NetworkX).

Nodes: posts (type=article) + entities (type=entity).
Edges:
  - related (post <-> post): weight = shared-entity Jaccard union crosslink count,
    basis tagged (shared-entity | crosslink | both).
  - mentions (post -> entity): weight 1.
Deterministic — same inputs always produce the same graph.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from itertools import combinations

import networkx as nx

from .extract import Extraction
from .normalize import NormalizedPost

RELATED_KEEP = 8  # top-N related edges per post kept in sidecar related_artifacts


@dataclass
class GraphResult:
    graph: nx.Graph
    related: dict[str, list[dict]] = field(default_factory=dict)


def _jaccard(a: set, b: set) -> float:
    if not a and not b:
        return 0.0
    return len(a & b) / len(a | b)


# An entity node is kept only if it is mentioned by >= MIN_ENTITY_POSTS posts.
# This is the "cluster orphan entities" rule from the ADR — singletons are noise
# (e.g. a one-off capitalized phrase) and are pruned from the graph (but a post's
# own sidecar still lists every entity it extracted, so nothing is lost downstream).
MIN_ENTITY_POSTS = 2


def build_graph(posts: list[NormalizedPost], extractions: dict[str, Extraction]) -> GraphResult:
    G = nx.Graph()
    slugs: set[str] = set()

    # Add article nodes
    for p in posts:
        slugs.add(p.slug)
        G.add_node(
            f"post:{p.slug}",
            label=p.title or p.slug,
            type="article",
            slug=p.slug,
            status=p.status,
            topics=p.topics,
            date=p.created_at,
            featured=p.featured,
        )

    # Count entity occurrences across all posts before adding nodes.
    entity_post_count: dict[str, int] = {}
    for p in posts:
        ext = extractions.get(p.slug)
        if not ext:
            continue
        for ent in set(ext.entities):
            entity_post_count[ent] = entity_post_count.get(ent, 0) + 1

    # Add entity nodes + mentions edges (only for entities meeting the threshold)
    for p in posts:
        ext = extractions.get(p.slug)
        if not ext:
            continue
        for ent in ext.entities:
            if entity_post_count.get(ent, 0) < MIN_ENTITY_POSTS:
                continue
            eid = f"entity:{ent}"
            if not G.has_node(eid):
                G.add_node(eid, label=ent, type="entity")
            G.add_edge(f"post:{p.slug}", eid, label="mentions", weight=1.0)

    # Related edges: shared-entity Jaccard + explicit crosslinks
    crosslink_map: dict[str, set[str]] = {}
    entity_sets: dict[str, set[str]] = {}
    for p in posts:
        ext = extractions.get(p.slug)
        if ext is None:
            continue
        crosslink_map[p.slug] = ext.crosslink_slugs & slugs
        entity_sets[p.slug] = set(ext.entities)

    related: dict[str, list[dict]] = {p.slug: [] for p in posts}
    for a, b in combinations(sorted(slugs), 2):
        shared = entity_sets[a] & entity_sets[b]
        jac = _jaccard(entity_sets[a], entity_sets[b])
        cross = b in crosslink_map[a] or a in crosslink_map[b]
        basis = []
        if jac > 0:
            basis.append("shared-entity")
        if cross:
            basis.append("crosslink")
        if not basis:
            continue
        # combined weight: blend Jaccard with a fixed crosslink boost
        weight = jac + (0.5 if cross else 0.0)
        edge = {
            "type": "related",
            "target": b if a in related else a,  # filled below symmetrically
        }
        G.add_edge(
            f"post:{a}",
            f"post:{b}",
            label="related",
            weight=round(weight, 4),
            basis="+".join(basis),
        )
        rel_a = {"type": "related", "target": b, "weight": round(weight, 4), "basis": "+".join(basis)}
        rel_b = {"type": "related", "target": a, "weight": round(weight, 4), "basis": "+".join(basis)}
        related[a].append(rel_a)
        related[b].append(rel_b)

    # series-order successor edges (optional editorial)
    by_series: dict[str, list[NormalizedPost]] = {}
    for p in posts:
        if p.series:
            by_series.setdefault(p.series, []).append(p)
    for series, members in by_series.items():
        members_sorted = sorted(members, key=lambda x: x.created_at or "")
        for i in range(len(members_sorted) - 1):
            cur, nxt = members_sorted[i], members_sorted[i + 1]
            G.add_edge(f"post:{cur.slug}", f"post:{nxt.slug}", label="successor", weight=1.0)
            related.setdefault(cur.slug, []).append(
                {"type": "successor", "target": nxt.slug, "weight": 1.0, "basis": "series-order"}
            )

    # Trim each post's related list to top-N by weight
    for slug in related:
        related[slug] = sorted(related[slug], key=lambda r: r["weight"], reverse=True)[:RELATED_KEEP]

    return GraphResult(graph=G, related=related)


def export_graph_json(G: nx.Graph) -> dict:
    nodes = []
    for nid, attrs in G.nodes(data=True):
        entry = {
            "id": nid,
            "label": attrs.get("label", nid),
            "type": attrs.get("type", "unknown"),
        }
        for k in ("slug", "status", "topics", "date", "featured"):
            if k in attrs:
                entry[k] = attrs[k]
        nodes.append(entry)
    edges = []
    for u, v, attrs in G.edges(data=True):
        edges.append({
            "from": u,
            "to": v,
            "label": attrs.get("label", ""),
            "weight": attrs.get("weight", 1.0),
            "basis": attrs.get("basis", ""),
        })
    return {"nodes": nodes, "edges": edges}
