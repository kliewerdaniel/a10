"""CLI entry point.

Usage:
    python run.py                         # uses defaults (content/blog -> public/artifacts)
    python run.py --content X --out Y
    python run.py --check-only           # run gate without writing? (no: emit is required for the gate)
"""
from __future__ import annotations

import sys
from pathlib import Path

import click

from compiler.config import DEFAULT_CONTENT_DIR, DEFAULT_OUT_DIR
from compiler.pipeline import run


@click.command()
@click.option("--content", "content_dir", type=click.Path(path_type=Path), default=DEFAULT_CONTENT_DIR,
              help="Directory of blog markdown (default: content/blog).")
@click.option("--out", "out_dir", type=click.Path(path_type=Path), default=DEFAULT_OUT_DIR,
              help="Output directory for artifacts (default: public/artifacts).")
def cli(content_dir: Path, out_dir: Path) -> None:
    """Compile blog markdown into static knowledge artifacts (build-time only)."""
    try:
        summary = run(content_dir, out_dir)
    except RuntimeError as e:
        click.echo(str(e), err=True)
        sys.exit(1)
    click.echo("Knowledge compiler — build complete")
    click.echo(f"  posts compiled : {summary['posts']}")
    click.echo(f"  graph nodes    : {summary['graph_nodes']}")
    click.echo(f"  graph edges    : {summary['graph_edges']}")
    click.echo(f"  search entries : {summary['search_entries']}")
    click.echo(f"  artifacts dir  : {summary['out_dir']}")
    click.echo(f"  verify gate    : {'PASS' if summary['gate_passed'] else 'FAIL'}")


if __name__ == "__main__":
    cli()
