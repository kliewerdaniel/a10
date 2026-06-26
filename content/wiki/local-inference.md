---
title: "Local Inference"
description: "Running AI model inference on local hardware instead of cloud APIs for privacy and sovereignty."
tags: ["inference", "security", "local-first", "performance"]
related_posts:
  - "2026-03-10-breaking-free-from-chatgpt"
  - "2025-03-12-integrating-openai-agents-sdk-ollama"
related_wiki:
  - "ollama"
  - "llama3"
  - "local-first-ai"
  - "gpu-offload"
book_chapter: 2
---

# Local Inference

Local inference means running AI model inference on your own hardware instead of sending data to cloud APIs. This approach ensures data privacy, reduces latency, and eliminates ongoing cloud costs.

## Why Local Inference

1. **Privacy** — Data never leaves your machine
2. **No API Costs** — One-time hardware investment vs recurring fees
3. **Offline Capability** — Works without internet
4. **Speed** — No network latency for inference
5. **Control** — Choose any model, any configuration

## Local Inference Stack

| Layer | Options |
|-------|---------|
| Runtime | Ollama, llama.cpp, vLLM |
| Models | Llama 3, Qwen, Mistral |
| Hardware | CPU, GPU, Apple Silicon |
| Quantization | GGUF Q4/Q5/Q8 |

## Getting Started

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull and run a model
ollama pull llama3.2
ollama run llama3.2

# Use in Python
import ollama
response = ollama.chat(model='llama3.2', messages=[
    {'role': 'user', 'content': 'What is data sovereignty?'}
])
```

## Hardware Requirements

| Model Size | RAM | GPU VRAM | Performance |
|------------|-----|----------|-------------|
| 8B (Q4) | 8GB | 6GB | Good |
| 13B (Q4) | 16GB | 10GB | Better |
| 70B (Q4) | 40GB | 24GB | Best |

## Further Reading

- [Breaking Free from ChatGPT](/blog/2026-03-10-breaking-free-from-chatgpt)
- Chapter 2 of *Sovereign AI: Building Local-First Intelligent Systems*
