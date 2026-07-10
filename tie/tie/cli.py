from __future__ import annotations

import glob

import click
from rich.console import Console

console = Console()


@click.group()
def cli():
    """Telemetry Intelligence Engine — local-first GraphRAG for website analytics."""


@cli.command()
@click.option("--days", default=30, help="Days of history to export")
def export(days: int):
    """Export raw events from PostHog."""
    from tie.exporter import export_posthog_events

    console.log("[bold]Phase 1a:[/bold] Exporting PostHog events...")
    path = export_posthog_events(days=days)
    console.log(f"[green]Exported to:[/green] {path}")


@cli.command()
@click.argument("raw_path", required=False)
def normalize(raw_path: str | None = None):
    """Normalize raw PostHog events into TIE schema."""
    from tie.processor import normalize_posthog_events

    if not raw_path:
        import glob
        files = sorted(glob.glob("data/posthog_export_*.json"))
        if not files:
            console.log("[red]No raw export found. Run 'tie export' first.[/red]")
            return
        raw_path = files[-1]
        console.log(f"[dim]Using latest export: {raw_path}[/dim]")

    console.log("[bold]Phase 1b:[/bold] Normalizing events...")
    path = normalize_posthog_events(raw_path)
    console.log(f"[green]Normalized to:[/green] {path}")


@cli.command()
def parse_content():
    """Parse site content into content entities."""
    from tie.processor import parse_content_layer

    console.log("[bold]Phase 2a:[/bold] Parsing content layer...")
    entities = parse_content_layer()
    console.log(f"[green]Parsed {len(entities)} content entities[/green]")


@cli.command()
@click.option("--normalized", "-n", default=None, help="Path to normalized events JSON")
@click.option("--content", "-c", default=None, help="Path to content entities JSON")
def graph(normalized: str | None, content: str | None):
    """Build and visualize the behavioral graph."""
    from tie.graph import build_and_render

    if not normalized:
        files = sorted(glob.glob("data/normalized_*.json"))
        if files:
            normalized = files[-1]
            console.log(f"[dim]Using latest normalized: {normalized}[/dim]")

    if not content:
        files = sorted(glob.glob("data/content_entities.json"))
        if files:
            content = files[-1]
            console.log(f"[dim]Using content entities: {content}[/dim]")

    console.log("[bold]Phase 2b:[/bold] Building graph...")
    path = build_and_render(normalized, content)
    console.log(f"[green]Graph visualization:[/green] {path}")


@cli.command()
@click.option("--days", default=30)
def pipeline(days: int):
    """Run the full Phase 1–2 pipeline: export → normalize → parse content → graph."""
    console.log("[bold]Running full TIE pipeline (Phase 1–2)...[/bold]")

    from tie.exporter import export_posthog_events
    from tie.processor import normalize_posthog_events, parse_content_layer
    from tie.graph import build_and_render

    raw = export_posthog_events(days=days)
    console.log(f"[green]1. Exported:[/green] {raw}")

    normalized = normalize_posthog_events(raw)
    console.log(f"[green]2. Normalized:[/green] {normalized}")

    entities = parse_content_layer()
    console.log(f"[green]3. Content entities:[/green] {len(entities)}")

    content_path = "data/content_entities.json"
    viz = build_and_render(normalized, content_path)
    console.log(f"[green]4. Graph:[/green] {viz}")

    console.log("[bold green]Pipeline complete![/bold green]")


@cli.command()
@click.option("--rebuild", is_flag=True, help="Rebuild ChromaDB from scratch")
def ingest(rebuild: bool):
    """Ingest graph + content into ChromaDB for RAG queries."""
    from tie.rag import get_chroma_client, embed_fn, reset_collections, ingest_graph, ingest_content

    console.log("[bold]Phase 3a:[/bold] Ingesting into ChromaDB...")

    client = get_chroma_client()
    ef = embed_fn()
    collections = reset_collections(client, ef)

    graph_files = sorted(glob.glob("data/website_behavior_graph_*.html"))
    if not graph_files:
        console.log("[red]No graph file found. Run 'tie graph' first.[/red]")
        return
    latest_graph = graph_files[-1]
    console.log(f"[dim]Using graph: {latest_graph}[/dim]")
    ingest_graph(latest_graph, collections)

    content_files = sorted(glob.glob("data/content_entities.json"))
    if content_files:
        ingest_content(content_files[-1], collections)

    console.log("[bold green]Ingest complete. Ready for queries.[/bold green]")


@cli.command()
@click.argument("question")
@click.option("--persona", type=click.Choice(["seo", "product", "research", "us"]), default="research")
@click.option("--model", default="llama3.1:8b")
def query(question: str, persona: str, model: str):
    """Ask a natural-language question about your analytics graph."""
    from tie.rag import get_chroma_client, embed_fn, get_collections
    from tie.analyst import query_analytics

    client = get_chroma_client()
    ef = embed_fn()
    collections = get_collections(client, ef)

    answer = query_analytics(question, collections, persona)
    console.print(answer)


@cli.command()
def report():
    """Generate a full Telemetry Intelligence Report."""
    from tie.rag import get_chroma_client, embed_fn, get_collections
    from tie.analyst import generate_report

    console.log("[bold]Phase 4:[/bold] Generating Telemetry Intelligence Report...")

    client = get_chroma_client()
    ef = embed_fn()
    collections = get_collections(client, ef)

    report_text = generate_report(collections)
    console.print(report_text)


if __name__ == "__main__":
    cli()
