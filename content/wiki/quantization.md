---
title: "Quantization"
description: "Reducing model precision to enable efficient local inference on consumer hardware."
tags: ["optimization", "inference", "performance", "deployment"]
related_posts:
  - "2025-11-12-mastering-llama-cpp-local-llm-integration-guide"
related_wiki:
  - "llama3"
  - "local-inference"
  - "gpu-offload"
book_chapter: 3
---

# Quantization

Quantization reduces the precision of model parameters to optimize performance, efficiency, and deployment on resource-constrained devices. By converting high-precision numbers to lower-precision formats, it decreases memory usage and improves speed.

## Quantization Methods

| Method | Precision | Trade-off |
|--------|-----------|-----------|
| FP32 | 32-bit float | Original quality |
| FP16 | 16-bit float | Minimal loss |
| INT8 | 8-bit integer | Good balance |
| INT4 | 4-bit integer | Maximum compression |

## GGUF Format

The standard format for quantized models (used by llama.cpp and Ollama):

```
model-q4_k_m.gguf    # 4-bit quantization
model-q5_k_m.gguf    # 5-bit quantization
model-q8_0.gguf      # 8-bit quantization
```

## Running Quantized Models

```bash
# With Ollama
ollama pull llama3.2:7b-q4_K_M

# With llama.cpp
./main -m models/llama-3-8b-q4_k_m.gguf -n 256
```

## Performance Impact

- **Q4_K_M** — ~50% size reduction, slight quality loss
- **Q5_K_M** — ~40% size reduction, minimal quality loss
- **Q8_0** — ~25% size reduction, near-original quality

## When to Use

- **Local Deployment** — Essential for running models on consumer hardware
- **Edge Devices** — Mobile and embedded systems
- **Cost Reduction** — Less memory and compute required
- **Speed** — Faster inference with smaller models

## Further Reading

- [Mastering llama.cpp: Local LLM Integration Guide](/blog/2025-11-12-mastering-llama-cpp-local-llm-integration-guide)
- Chapter 3 of *Sovereign AI: Building Local-First Intelligent Systems*
