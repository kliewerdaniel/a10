---
title: "Docker"
description: "A platform for building, shipping, and running applications in lightweight, portable containers."
tags: ["containers", "devops", "deployment", "infrastructure"]
related_posts:
  - "2024-10-04-detailed-description-of-insight-journal"
related_wiki:
  - "kubernetes"
  - "local-first-ai"
  - "python"
book_chapter: 8
---

# Docker

Docker is a platform that uses OS-level virtualization to package and run applications in software containers. Containers are lightweight, standalone, executable packages that include everything needed to run an application.

## Core Concepts

- **Images** — Read-only templates used to create containers
- **Containers** — Running instances of images
- **Dockerfiles** — Scripts that define how to build an image
- **Docker Compose** — Tool for defining multi-container applications

## Sovereign AI Stack with Docker

```dockerfile
# Dockerfile for local LLM app
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

```yaml
# docker-compose.yml
services:
  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
  
  app:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - ollama

volumes:
  ollama_data:
```

## Benefits for Sovereign AI

- **Reproducibility** — Same environment everywhere
- **Isolation** — Services don't interfere with each other
- **Portability** — Run on any Docker-compatible host
- **Easy Updates** — Roll back to previous versions

## Further Reading

- [Docker Official Documentation](https://docs.docker.com/)
- Chapter 8 of *Sovereign AI: Building Local-First Intelligent Systems*
