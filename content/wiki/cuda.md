---
title: "CUDA"
description: "NVIDIA's parallel computing platform for general-purpose GPU computing."
tags: ["gpu", "nvidia", "computing", "performance"]
related_posts:
  - "2025-11-12-mastering-llama-cpp-local-llm-integration-guide"
  - "2025-03-24-model-context-protocol"
related_wiki:
  - "gpu-offload"
  - "local-inference"
  - "quantization"
book_chapter: 3
---

# CUDA

CUDA (Compute Unified Device Architecture) is NVIDIA's parallel computing platform that enables developers to use GPUs for general-purpose processing. It's essential for accelerating AI inference and training.

## Why CUDA Matters

- **GPU Computing** — Unlock massive parallel processing power
- **AI Acceleration** — PyTorch, TensorFlow, and llama.cpp use CUDA
- **Wide Support** — Most AI frameworks have CUDA backends
- **Optimized Libraries** — cuBLAS, cuDNN, cuFFT

## CUDA Toolkit Components

- **nvcc** — CUDA C/C++ compiler
- **cuBLAS** — Linear algebra operations
- **cuDNN** — Deep learning primitives
- **CUDA Runtime** — GPU memory management

## Checking CUDA Support

```bash
# Check CUDA installation
nvcc --version

# Check GPU
nvidia-smi

# Check CUDA in PyTorch
python -c "import torch; print(torch.cuda.is_available())"
```

## CUDA in Local LLM Inference

```bash
# llama.cpp with CUDA
cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release

# Run with GPU acceleration
./build/bin/main -m model.gguf -ngl 99
```

## Alternative GPU Backends

| Backend | Hardware | Notes |
|---------|----------|-------|
| CUDA | NVIDIA | Most supported |
| ROCm | AMD | Growing support |
| Metal | Apple | M1/M2/M3 chips |
| Vulkan | Cross-platform | Experimental |

## Further Reading

- [NVIDIA CUDA Documentation](https://docs.nvidia.com/cuda/)
- [Mastering llama.cpp: Local LLM Integration Guide](/blog/2025-11-12-mastering-llama-cpp-local-llm-integration-guide)
- Chapter 3 of *Sovereign AI: Building Local-First Intelligent Systems*
