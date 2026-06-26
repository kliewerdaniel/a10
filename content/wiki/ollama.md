---
title: "Ollama"
description: "Local LLM runtime that makes running language models on your own hardware simple and accessible."
tags: ["tool", "llm", "inference", "local-llm"]
related_posts:
  - "2026-03-10-breaking-free-from-chatgpt"
related_wiki:
  - "local-first-ai"
  - "llama3"
  - "local-inference"
book_chapter: 3
---

# Ollama

Ollama is a lightweight, extensible framework for running large language models locally. It simplifies the process of downloading, configuring, and running LLMs on consumer hardware.

## Key Features

- **Simple CLI** — One command to pull and run models
- **Model Library** — Pre-configured models ready to download
- **REST API** — Programmatic access for integration
- **Cross-Platform** — Runs on macOS, Linux, and Windows
- **GPU Support** — Automatic GPU detection and acceleration

## Quick Start

```bash
# Install
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model
ollama pull llama3.2

# Run interactively
ollama run llama3.2

# API endpoint
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "What is sovereign AI?"
}'
```

## Popular Models

- **llama3.2** — Meta's latest Llama model
- **qwen2.5** — Alibaba's multilingual model
- **mistral** — Mistral AI's efficient model
- **codellama** — Specialized for code generation

## Integration

Ollama provides an OpenAI-compatible API, making it easy to swap cloud APIs for local inference in existing applications.

## Further Reading

- [Breaking Free from ChatGPT](/blog/2026-03-10-breaking-free-from-chatgpt)
- Chapter 3 of *Sovereign AI: Building Local-First Intelligent Systems*
