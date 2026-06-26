---
title: "GraphRAG"
description: "A framework combining graph-based data retrieval with generative models for building local-first research assistants."
tags: ["knowledge-graphs", "rag", "retrieval", "neo4j"]
related_posts:
  - "2025-11-15-building-evaluating-local-research-assistant-graphrag-vero-eval"
related_wiki:
  - "rag"
  - "knowledge-graphs"
  - "embeddings"
book_chapter: 5
---

# GraphRAG

GraphRAG (Graph Retrieval-Augmented Generation) combines graph-based data retrieval with generative models to create intelligent research assistants. It leverages graph databases for efficient information retrieval.

## Architecture

```
Query → Entity Extraction → Graph Traversal → Context Assembly → LLM Generation
```

## Key Components

- **Graph Database** — Neo4j for storing entities and relationships
- **Embedding Model** — Sentence transformers for semantic search
- **LLM** — Ollama for local text generation
- **Evaluation** — vero-eval for performance assessment

## Benefits Over Vector RAG

1. **Relationship Awareness** — Understands connections between entities
2. **Multi-Hop Reasoning** — Follows paths across the graph
3. **Structured Context** — Provides organized, relevant information
4. **Local-First** — Runs entirely on local infrastructure

## Example: Building a Knowledge Graph

```python
import networkx as nx
from neo4j import GraphDatabase

# Create graph
G = nx.DiGraph()
G.add_edge("Data Sovereignty", "Local-First AI", relation="enables")
G.add_edge("Local-First AI", "Ollama", relation="uses")
G.add_edge("Ollama", "Llama 3", relation="runs")

# Store in Neo4j
driver = GraphDatabase.driver("bolt://localhost:7687")
with driver.session() as session:
    for u, v, data in G.edges(data=True):
        session.run("""
            MERGE (a:Entity {name: $u})
            MERGE (b:Entity {name: $v})
            MERGE (a)-[:RELATION {type: $rel}]->(b)
        """, u=u, v=v, rel=data['relation'])
```

## Further Reading

- [Building a Local Research Assistant with GraphRAG](/blog/2025-11-15-building-evaluating-local-research-assistant-graphrag-vero-eval)
- Chapter 5 of *Sovereign AI: Building Local-First Intelligent Systems*
