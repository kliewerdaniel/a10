---
title: "Embeddings"
description: "Dense vector representations of text that capture semantic meaning for similarity search and retrieval."
tags: ["nlp", "vectors", "semantic-search", "retrieval"]
related_posts:
  - "2026-06-14-sovereign-memory-bank"
related_wiki:
  - "rag"
  - "sentence-transformers"
  - "knowledge-graphs"
book_chapter: 5
---

# Embeddings

Embeddings are dense vector representations of text that capture semantic meaning, enabling tasks such as similarity measurement, clustering, and information retrieval using mathematical operations.

## How Embeddings Work

1. **Tokenization** — Text is split into tokens
2. **Encoding** — A neural network converts tokens into fixed-size vectors
3. **Similarity** — Cosine similarity measures semantic closeness between vectors

## Local Embedding Models

- **all-MiniLM-L6-v2** — Fast, lightweight, good for most use cases
- **nomic-embed-text** — High quality, runs on Ollama
- **BGE-large-en-v1.5** — Strong retrieval performance

## Usage with ChromaDB

```python
import chromadb
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.create_collection("documents")

# Index documents
docs = ["Document 1...", "Document 2..."]
embeddings = model.encode(docs).tolist()
collection.add(documents=docs, embeddings=embeddings, ids=["1", "2"])

# Query
query_embedding = model.encode(["What is sovereign AI?"]).tolist()
results = collection.query(query_embeddings=query_embedding, n_results=3)
```

## Applications

- **Semantic Search** — Find documents by meaning, not keywords
- **RAG** — Ground LLM responses in retrieved context
- **Clustering** — Group similar documents together
- **Recommendation** — Find related content

## Further Reading

- [Sovereign Memory Bank](/blog/2026-06-14-sovereign-memory-bank)
- Chapter 5 of *Sovereign AI: Building Local-First Intelligent Systems*
