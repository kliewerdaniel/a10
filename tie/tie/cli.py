from __future__ import annotations

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
    import glob
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


if __name__ == "__main__":
    cli()
