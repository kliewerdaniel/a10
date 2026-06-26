---
title: "Llama 3"
description: "Meta's open-source large language model designed for local inference and sovereign AI applications."
tags: ["llm", "local-llm", "meta", "open-source"]
related_posts:
  - "2026-03-10-breaking-free-from-chatgpt"
related_wiki:
  - "ollama"
  - "local-inference"
  - "quantization"
book_chapter: 3
---

# Llama 3

Llama 3 is Meta's open-source large language model designed for local inference. It enables private, intelligent reflection and AI-powered applications while maintaining data sovereignty.

## Key Features

- **Open Weights** — Freely available for research and commercial use
- **Multiple Sizes** — Available in 8B, 70B, and 405B parameter variants
- **Local Inference** — Runs on consumer hardware with quantization
- **Multilingual** — Strong performance across multiple languages

## Running with Ollama

```bash
# Pull Llama 3.2
ollama pull llama3.2

# Run interactively
ollama run llama3.2

# Use via API
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "Explain data sovereignty in simple terms."
}'
```

## Quantized Variants

For local deployment, quantized versions (GGUF format) reduce memory requirements:

- **Q4_K_M** — Good balance of quality and speed
- **Q5_K_M** — Higher quality, slightly slower
- **Q8_0** — Near-original quality

## Further Reading

- [Breaking Free from ChatGPT](/blog/2026-03-10-breaking-free-from-chatgpt)
- Chapter 3 of *Sovereign AI: Building Local-First Intelligent Systems*
