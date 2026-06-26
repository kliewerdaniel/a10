---
title: "Prompt Engineering"
description: "The systematic design of input prompts to elicit desired responses from language models."
tags: ["llm", "technique", "optimization", "practical"]
related_posts:
  - "2025-03-09-mastra-ollama-nextjs"
  - "2025-10-19-building-a-local-llm-powered-knowledge-graph"
related_wiki:
  - "llama3"
  - "ai-agents"
  - "local-inference"
book_chapter: 7
---

# Prompt Engineering

Prompt Engineering is the systematic design of input prompts to elicit desired responses from language models. Effective prompt engineering significantly enhances LLM performance, relevance, and output quality.

## Core Techniques

### Zero-Shot Prompting
Ask the model to perform a task without examples:
```
Classify this text as positive, negative, or neutral: "The product works great!"
```

### Few-Shot Prompting
Provide examples to guide the model:
```
Classify the sentiment:
Text: "I love this!" → Positive
Text: "Terrible experience" → Negative
Text: "It's okay, nothing special" →
```

### Chain-of-Thought
Guide the model through reasoning steps:
```
Solve this step by step:
1. First, identify the key information
2. Then, determine the relationships
3. Finally, provide your answer
```

### System Prompts
Set the model's behavior and context:
```
You are a helpful assistant that specializes in sovereign AI.
Always prioritize local-first solutions and data privacy.
```

## Best Practices

1. **Be Specific** — Clear instructions produce better results
2. **Provide Context** — Give the model relevant background
3. **Use Delimiters** — Separate instructions from content
4. **Iterate** — Refine prompts based on outputs
5. **Test** — Validate across different inputs

## Local LLM Considerations

Local models (Llama, Qwen) may need:
- Simpler, more direct prompts
- Explicit formatting instructions
- Shorter context windows
- Temperature adjustment for creativity vs accuracy

## Further Reading

- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- Chapter 7 of *Sovereign AI: Building Local-First Intelligent Systems*
