# Detailed Product Overview: Indra AI (Sovereign Industrial AI Workbench)

**System Designation:** Indra AI  
**Target Enterprise:** Mangalore Refinery and Petrochemicals Limited (MRPL) / Heavy Process Industry  
**Hackathon Problem Statement:** SIH26117 — Sovereign Multi-Agent AI Workbench  
**Deployment Constraint:** 100% Air-Gapped / On-Premise Infrastructure  

---

## 1. Product Vision & Value Proposition

**Indra AI** is an autonomous, on-premise multi-agent AI workbench engineered specifically for high-hazard industrial environments like petroleum refineries and chemical processing facilities. 

In modern refineries, engineers spend up to 40% of their time manually transferring data between distributed control systems (DCS), reading paper logbooks, cross-referencing piping & instrumentation diagrams (P&IDs), and drafting safety permits. **Indra AI** acts as a force-multiplier by delegating these low-value, repetitive knowledge tasks to a team of specialized AI subagents running locally on air-gapped GPU infrastructure.

### Key Value Metrics:
* **100% Data Sovereignty:** No data ever leaves the plant boundary. Zero cloud calls, zero telemetry.
* **70% Reduction in Administrative Overhead:** Automated shift handover logs, PTW permit drafting, and work order generation.
* **Near-Zero Hallucination:** Every output is grounded in live SCADA telemetry, vector-indexed SOP manuals, or verified CAD/P&ID files via the Model Context Protocol (MCP).

---

## 2. System Architecture & Component Design

```
+-----------------------------------------------------------------------------------+
|                            INDRA AI TERMINAL FRONTEND                             |
|             (Interactive CLI / TUI for Plant Engineers & Operators)               |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                        MULTI-AGENT ORCHESTRATION LAYER                            |
|            (State Machine Engine: Operations, Maintenance, Safety Agents)         |
+-----------------------------------------------------------------------------------+
                                         |
            +----------------------------+----------------------------+
            |                                                         |
            v                                                         v
+-----------------------+                                 +-----------------------+
|  MODEL CONTEXT PROTO  |                                 | LITELLM ROUTER & vLLM |
|      (FastMCP)        |                                 | (Quantized Inference) |
+-----------------------+                                 +-----------------------+
| • DCS / SCADA (OPC)   |                                 | • DeepSeek-V4 (Reason)|
| • SAP PM / LIMS       |                                 | • Gemma-4 (Vision/P&ID|
| • Local OCR / Scanners|                                 | • Kimi-K3 / CodeLLM   |
+-----------------------+                                 +-----------------------+
            |                                                         |
            v                                                         v
+-----------------------------------------------------------------------------------+
|                        SECURE ISOLATION & DATA STORAGE                            |
|     (Firecracker MicroVM Sandbox | Qdrant Vector DB | Encrypted Local Storage)    |
+-----------------------------------------------------------------------------------+
```

### Component Breakdown:

1. **Indra AI CLI / TUI (User Interface)**
   * Built as an interactive terminal interface tailored for plant operators and systems engineers.
   * Supports real-time streaming agent thought processes, multi-file inspection, script execution, and diff viewing directly in the terminal.

2. **Multi-Agent Orchestration Layer**
   * Manages domain-specific subagents:
     * **Operations Agent:** Monitors unit parameters, generates shift logs, and analyzes process deviations.
     * **Maintenance Agent:** Parses equipment manuals, queries SAP PM histories, and drafts work orders.
     * **Safety (HSE) Agent:** Verifies isolation lists, checks lower explosive limit (LEL) gas levels, and pre-fills Permits to Work (PTW).
     * **Vision Agent:** Reads scanned engineering drawings, P&IDs, and physical gauge photos.

3. **Industrial MCP Bridge Layer (FastMCP)**
   * Connects the multi-agent system directly to physical OT/IT infrastructure via standardized protocol bridges:
     * **OPC-UA / Modbus MCP:** Real-time sensor telemetry (temperatures, pressures, flow rates).
     * **LIMS MCP:** Laboratory test results for crude oil assays and product purity.
     * **Folder-Watch OCR MCP:** Automatically parses paper documents scanned by field personnel.

4. **Dynamic Model Router & Local vLLM Serving**
   * Uses LiteLLM to dispatch subagent queries to task-optimized open-weight models:
     * **DeepSeek-V4-Distill / Kimi-K3-Pro (AWQ 4-Bit):** Complex multi-step reasoning and HAZOP analysis.
     * **Gemma-4-Vision (INT8 Quantized):** High-resolution visual parsing of P&IDs and dials.
     * **DeepSeek-Coder-V4 (AWQ 4-Bit):** Generating Python automation scripts and SQL queries.
     * **Gemma-4-8B (GGUF):** Ultra-fast Edge log summarization.

5. **Firecracker MicroVM Sandbox**
   * Any code generated by the AI (e.g., Python scripts for calculating pressure drops or formatting reports) is run in an isolated MicroVM container, preventing accidental system state mutations.

---

## 3. Departmental Use Cases & Workflows

### A. Operations Department
* **Automated Shift Handover:** Compiles 8-hour telemetry trends, process alarms, and operator notes into standardized shift transition logs.
* **Alarm Flood Summarization:** During unit trips, condenses hundreds of simultaneous SCADA alarms into a chronological sequence of root events.

### B. Maintenance & Reliability
* **Work Order Generation:** Converts field operator voice/text notes into structured SAP PM work requests with appropriate equipment tag numbers and priority levels.
* **Equipment History Lookup:** Searches 10+ years of maintenance records to locate previous failure modes for specific pumps or compressors.

### C. Health, Safety & Environment (HSE)
* **Permit to Work (PTW) Drafting:** Cross-references active P&ID isolation points with gas detector telemetry to pre-draft Hot Work and Cold Work permits.
* **HAZOP Study Assistance:** Automatically flags potential hazard paths when modification of change (MOC) proposals are entered.

### D. Technical Services & Engineering
* **P&ID Line & Valve Extraction:** Converts static CAD/PDF engineering drawings into structured line lists and valve indexes.
* **Spec Verification:** Compares vendor equipment data sheets against internal MRPL engineering standards.

---

## 4. Security, Compliance & Air-Gapped Deployment

| Feature | Technical Implementation |
| :--- | :--- |
| **Network Boundary** | Strict air-gap; isolated inside refinery OT/IT DMZ. |
| **Internet Dependency** | Zero outbound traffic; `HF_HUB_OFFLINE=1` hardcoded. |
| **Access Control** | Role-Based Access Control (RBAC) linked to Active Directory / LDAP. |
| **Audit Logging** | Every agent action, query, prompt, and tool call is immutably logged. |
| **Data Grounding** | RAG via local Qdrant Vector DB prevents hallucinated responses. |

---

## 5. Hardware Specifications & Infrastructure Sizing

### Recommended On-Premise Hardware (Single Refinery Complex)
* **Compute Server:** Dual-socket AMD EPYC 9654 (192 Cores), 512GB DDR5 RAM.
* **GPU Accelerator Stack:** 
  * *Option A (Production):* 2x NVIDIA A100 / H100 (80GB VRAM each).
  * *Option B (Cost-Optimized):* 4x NVIDIA RTX 4090 (24GB VRAM each) / RTX 6000 Ada.
* **Storage Array:** 8TB NVMe U.2 SSD array in RAID 10 (Inference cache, local model weights, Qdrant vector storage).
* **Operating System:** RHEL 9.x / Ubuntu Server 24.04 LTS (FIPS 140-3 compliant kernel).
