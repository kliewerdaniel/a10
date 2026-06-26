---
title: "GPU Offload"
description: "Techniques for delegating AI computations from CPU to GPU for accelerated inference."
tags: ["hardware", "performance", "optimization", "inference"]
related_posts:
  - "2025-11-12-mastering-llama-cpp-local-llm-integration-guide"
related_wiki:
  - "cuda"
  - "local-inference"
  - "quantization"
book_chapter: 3
---

# GPU Offload

GPU offload is the technique of delegating specific computations from CPU to GPU. GPUs excel at parallel processing tasks like matrix multiplications, which are fundamental to neural network inference.

## CPU vs GPU

| Aspect | CPU | GPU |
|--------|-----|-----|
| Cores | Few powerful cores | Thousands of smaller cores |
| Parallelism | Limited | Massive |
| Best for | Sequential tasks | Matrix operations |
| Memory | System RAM | VRAM (faster) |

## GPU Offload in llama.cpp

```bash
# Offload all layers to GPU
./main -m model.gguf -ngl 99

# Offload specific number of layers
./main -m model.gguf -ngl 32

# No GPU offload (CPU only)
./main -m model.gguf -ngl 0
```

## GPU Offload in Ollama

Ollama automatically detects and uses GPU when available:

```bash
# Check GPU status
ollama ps

# Force GPU usage (if needed)
CUDA_VISIBLE_DEVICES=0 ollama run llama3.2
```

## VRAM Requirements

| Model | Q4 | Q8 | FP16 |
|-------|-----|-----|------|
| 8B | 6GB | 9GB | 16GB |
| 13B | 10GB | 15GB | 26GB |
| 70B | 40GB | 70GB | 140GB |

## Performance Gains

- **CPU Only** — Baseline performance
- **Partial Offload** — 2-5x speedup
- **Full Offload** — 10-20x speedup

## Tips

1. **Layer Count** — Start with all layers, reduce if OOM
2. **Batch Size** — Increase batch size for better GPU utilization
3. **Quantization** — Lower precision reduces VRAM needs
4. **Monitoring** — Use `nvidia-smi` to track GPU usage

## Further Reading

- [Mastering llama.cpp: Local LLM Integration Guide](/blog/2025-11-12-mastering-llama-cpp-local-llm-integration-guide)
- Chapter 3 of *Sovereign AI: Building Local-First Intelligent Systems*
