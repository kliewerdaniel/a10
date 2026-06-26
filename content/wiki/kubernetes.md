---
title: "Kubernetes"
description: "An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications."
tags: ["containers", "orchestration", "devops", "scaling"]
related_posts:
  - "2025-03-12-integrating-openai-agents-sdk-ollama"
related_wiki:
  - "docker"
  - "local-first-ai"
  - "security"
book_chapter: 8
---

# Kubernetes

Kubernetes (K8s) is an open-source container orchestration platform designed to automate deploying, scaling, and operating application containers across clusters of hosts.

## Core Concepts

- **Cluster** — Set of nodes running containerized applications
- **Pod** — Smallest deployable unit (one or more containers)
- **Service** — Stable network endpoint for accessing pods
- **Deployment** — Manages desired state of pod replicas
- **ConfigMap/Secrets** — Configuration and sensitive data management

## Sovereign AI on Kubernetes

```yaml
# Deployment for local LLM service
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ollama
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ollama
  template:
    metadata:
      labels:
        app: ollama
    spec:
      containers:
      - name: ollama
        image: ollama/ollama
        ports:
        - containerPort: 11434
        volumeMounts:
        - name: ollama-data
          mountPath: /root/.ollama
      volumes:
      - name: ollama-data
        persistentVolumeClaim:
          claimName: ollama-pvc
```

## Why Kubernetes for Sovereign AI

- **Scaling** — Automatically scale inference based on demand
- **Self-Healing** — Restart failed containers automatically
- **Multi-Cloud** — Deploy across cloud providers or on-premises
- **GPU Scheduling** — Schedule workloads on GPU-enabled nodes

## Further Reading

- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- Chapter 8 of *Sovereign AI: Building Local-First Intelligent Systems*
