---
title: "Sentence Transformers"
description: "Models that generate dense vector embeddings for sentences and paragraphs, enabling semantic search and retrieval."
tags: ["embeddings", "nlp", "semantic-search", "retrieval"]
related_posts:
  - "2025-10-19-building-a-local-llm-powered-knowledge-graph"
related_wiki:
  - "embeddings"
  - "rag"
  - "embeddings"
book_chapter: 5
---

# Sentence Transformers

Sentence Transformers are models designed to generate dense vector representations (embeddings) for sentences and paragraphs. They capture semantic meaning, enabling tasks like semantic search, clustering, and classification.

## Key Features

- **Semantic Understanding** — Captures meaning, not just keywords
- **Fixed-Size Vectors** — Consistent embedding dimensions
- **Fast Inference** — Optimized for production use
- **Multiple Models** — Choose based on quality/speed tradeoff

## Popular Models

| Model | Dimensions | Speed | Quality |
|-------|-----------|-------|---------|
| all-MiniLM-L6-v2 | 384 | Fast | Good |
| all-mpnet-base-v2 | 768 | Medium | Better |
| BGE-large-en-v1.5 | 1024 | Slow | Best |

## Usage

```python
from sentence_transformers import SentenceTransformer

# Load model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Generate embeddings
sentences = [
    "Data sovereignty means controlling your AI",
    "Local-first architecture prioritizes privacy",
    "Cloud APIs send data to external servers"
]
embeddings = model.encode(sentences)

# Find similar sentences
from sentence_transformers.util import cos_sim
similarities = cos_sim(embeddings[0], embeddings[1:])
```

## Use Cases

- **Semantic Search** — Find relevant documents by meaning
- **RAG Indexing** — Embed documents for retrieval-augmented generation
- **Clustering** — Group similar content together
- **Deduplication** — Find near-duplicate content

## Further Reading

- [Sentence Transformers Documentation](https://www.sbert.net/)
- Chapter 5 of *Sovereign AI: Building Local-First Intelligent Systems*
