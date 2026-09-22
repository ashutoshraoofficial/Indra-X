# Master Research Report: Industrial AI Workbench Stack (2026)

This document compiles the exhaustive research conducted on permissive open-source tools for building a Sovereign Air-Gapped Industrial AI Workbench.

## Part 1: Open-Source Agentic Coding Tools & Frameworks

Open-source agentic coding has coalesced around five distinct paradigms:
1. **Full Autonomous Software Engineers (Devin-style):** *OpenHands*, *Devika*, *Goose*. These agents run multi-step planning loops, execute bash commands, browse docs, edit code across files.
2. **Interactive IDE Agents & IDE Forks:** *Cline*, *Void*, *Continue.dev*, *PearAI*. Embedded directly inside VS Code / JetBrains.
3. **Terminal-First Pair Programmers:** *Aider*, *Mentat*. Extremely tight edit loops, AST-based repo mapping, and automatic git committing.
4. **Research & Benchmark-Proven Scaffolding Harnesses:** *SWE-agent*, *AutoCodeRover*, *Agentless*.
5. **Full-Stack In-Browser App Generators:** *bolt.diy* (open-source fork of bolt.new).

### 1. OpenHands (formerly OpenDevin)
* **License:** **MIT License**
* **Local / Ollama Support:** **Yes**.
* **Architecture:** Operates over an `EventStream`. Runs bash, git, and compilation tasks inside isolated Docker containers. Primary agent is `CodeActAgent`.

### 2. Cline (formerly Claude Dev)
* **License:** **Apache 2.0 License**.
* **Local Support:** **Yes**.
* **Architecture:** Uses system-prompt-driven tool calling with human-in-the-loop approval. First-class MCP client support.

### 3. Aider
* **License:** **Apache 2.0 License**.
* **Local Support:** **Yes**.
* **Architecture:** Git-Native Workflow. Builds a Tree-sitter-based abstract syntax tree (AST) map of the entire codebase.

### 4. SWE-agent (Princeton University)
* **License:** **MIT License**.
* **Architecture:** Agent-Computer Interface (ACI) exposing compact, deterministic commands (e.g. `open <file> <line>`, `edit <start>:<end>`).

### 5. Continue.dev
* **License:** **Apache 2.0 License**.
* **Local Support:** **Yes (Gold Standard for Local)**. Powers tab-autocomplete (FIM models).

### Strategic Recommendation for Agentic Coding
For building a customized CLI agent for MRPL, embedding **Aider** (for Python-driven programmatic code editing) or forking a terminal CLI like **free-claude-code** and routing it through local endpoints is the optimal Apache/MIT strategy.

---

## Part 2: Multi-Agent Orchestration & MCP Ecosystems

### 1. LangGraph (LangChain AI)
* **License:** **MIT License**
* **Key Architecture:** Cyclic graph state machine (`StateGraph`). Nodes represent computations; edges define transitions.
* **MCP Integration:** Native support under `langchain.mcp` using `MCPAdapter` (built on FastMCP).
* **Production Readiness:** **Tier 1 (Enterprise Standard)**.

### 2. CrewAI (CrewAI Inc.)
* **License:** **MIT License**
* **Key Architecture:** Role-playing, collaborative agent paradigm (`Agent`, `Task`, `Crew`).
* **MCP Integration:** First-class native integration via the `mcps` attribute.

### 3. PydanticAI (Pydantic Team)
* **License:** **MIT License**
* **Key Architecture:** Type-safe, Pythonic agent framework. Built entirely around static type validation (`Agent[Deps, ResultType]`).
* **MCP Integration:** Native first-class integration via `pydantic_ai.capabilities.MCP` and `MCPToolset`.

### 4. Dify.ai
* **License:** **Dify Open Source License** (Modified Apache 2.0)
* **Key Architecture:** Full-stack, self-hosted LLM application development platform with a visual DAG canvas.

### 5. FastMCP (PrefectHQ) & Official MCP SDK
* **License:** **Apache License 2.0** / **MIT**
* **Key Architecture:** High-level, ergonomic framework for building production MCP servers and clients in Python. Mimics the elegance of FastAPI.

### Strategic Recommendation for Orchestration
**LangGraph** is the industry standard for highly complex, cyclic state machines required by industrial control processes. **FastMCP** is the mandatory standard for building the protocol bridges to industrial sensors and databases.

---

## Part 3: Model Fine-Tuning, Inference & Industrial Vision

### 1. Model Fine-Tuning
* **Unsloth (Apache 2.0/LGPLv3):** Hand-written custom Triton kernels achieving 2x-5x faster training speeds and 70-80% VRAM reduction.
* **Axolotl (Apache 2.0):** Comprehensive, YAML-driven fine-tuning orchestrator for enterprise multi-GPU clusters. Supports Full Fine-Tuning, LoRA, QLoRA.
* **torchtune (BSD 3-Clause):** PyTorch-native modular library for LLM fine-tuning.

### 2. Local Inference Engines
* **vLLM (Apache 2.0):** High-throughput, low-latency distributed serving engine using PagedAttention. The absolute enterprise standard.
* **SGLang (Apache 2.0):** High-performance serving engine designed specifically for complex agentic workflows using RadixAttention.
* **llama.cpp (MIT):** Pure C/C++ inference engine for Edge/CPU nodes.

### 3. RAG & Document Parsing
* **Qdrant (Apache 2.0):** High-performance vector database. Mandatory air-gapped configuration (`telemetry_disabled: true`).
* **Docling (MIT):** Advanced document parsing toolkit engineered by IBM. Converts complex PDFs and scanned images into semantically rich Markdown. Excels at complex table structure extraction.
* **PaddleOCR (Apache 2.0):** Industrial-grade multilingual OCR system. Used extensively in manufacturing plants and automated inspection lines.

### 4. Vision & Foundation Models
* **Qwen2.5-VL (Open Weights):** State-of-the-art open Vision-Language Model. Native dynamic resolution processing for P&IDs, scientific chart reasoning, and complex document OCR.
* **Florence-2 (MIT):** Unified vision foundation model by Microsoft. Sub-1B parameter count allows ultra-fast inference on edge CPUs.

### 5. Execution Sandboxing
* **Firecracker (Apache 2.0):** Minimalist, hyper-secure microVMs. Boots in < 5 milliseconds. The absolute gold standard for executing untrusted AI-generated code in air-gapped environments.

---

## Conclusion: The Sovereign Architecture

By combining **LangGraph** (Orchestration), a rebranded terminal CLI frontend, **FastMCP** (Industrial Bridging), **vLLM + Qwen2.5-VL** (Inference & Vision), and **Firecracker** (Secure Sandboxing), MRPL can achieve a 100% sovereign, air-gapped AI platform that strictly adheres to permissive open-source licenses while delivering frontier-level AI capabilities.
