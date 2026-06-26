---
title: "Retrieval-Augmented Generation (RAG)"
description: "A technique that combines information retrieval with language model generation to produce grounded, attributable responses."
tags: ["architecture", "retrieval", "generation", "embeddings"]
related_posts:
  - "2026-06-14-sovereign-memory-bank"
related_wiki:
  - "local-first-ai"
  - "knowledge-graphs"
  - "embeddings"
book_chapter: 5
---

# Retrieval-Augmented Generation (RAG)

RAG combines the power of large language models with external knowledge retrieval. Instead of relying solely on the model's training data, RAG systems retrieve relevant documents at query time and use them to ground the generation.

## How RAG Works

1. **Index** — Documents are chunked, embedded, and stored in a vector database
2. **Retrieve** — User query is embedded and相似 documents are found
3. **Augment** — Retrieved documents are added to the prompt context
4. **Generate** — LLM generates a response grounded in the retrieved content

## The RAG Stack

- **Embedding Model**: Sentence Transformers, OpenAI embeddings, or local models
- **Vector Store**: ChromaDB, FAISS, Pinecone, or Weaviate
- **Chunking Strategy**: Fixed-size, semantic, or recursive splitting
- **LLM**: Any language model (Ollama for local, API for cloud)

## Local RAG with ChromaDB

```python
import chromadb
from sentence_transformers import SentenceTransformer

# Initialize
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.create_collection("documents")

# Index
model = SentenceTransformer("all-MiniLM-L6-v2")
docs = ["Document 1...", "Document 2..."]
embeddings = model.encode(docs).tolist()
collection.add(documents=docs, embeddings=embeddings, ids=["1", "2"])

# Query
query_embedding = model.encode(["What is sovereign AI?"]).tolist()
results = collection.query(query_embeddings=query_embedding, n_results=3)
```

## Further Reading

- [Sovereign Memory Bank](/blog/2026-06-14-sovereign-memory-bank)
- Chapter 5 of *Sovereign AI: Building Local-First Intelligent Systems*
