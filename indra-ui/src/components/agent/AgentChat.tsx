"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  ChevronRight, 
  ChevronDown, 
  User, 
  Bot, 
  TerminalSquare, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Paperclip, 
  FileText, 
  Check, 
  Copy, 
  RotateCcw,
  Zap,
  Activity,
  Wrench,
  Eye
} from "lucide-react";
import { ApprovalGate } from "./ApprovalGate";

interface Message {
  id: string;
  role: "user" | "agent";
  agentName?: "Orchestrator" | "Operations Agent" | "Safety Agent" | "Maintenance Agent" | "Vision Agent";
  content: string;
  thoughts?: string;
  thoughtTime?: string;
  tools?: {
    name: string;
    server?: string;
    status: "running" | "success" | "error" | "requires_approval";
    args: string;
    result?: string;
    approvalAction?: string;
    consequenceLevel?: "low" | "medium" | "high";
  }[];
  timestamp?: string;
}

interface AgentChatProps {
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export function AgentChat({ externalPrompt, onClearExternalPrompt, onNavigateTab }: AgentChatProps) {
  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      role: "agent",
      agentName: "Operations Agent",
      timestamp: "01:50 IST",
      content: "Indra AI Sovereign Industrial Workbench online. Yokogawa CENTUM VP DCS bridge connected (OPC-UA latency 18ms). Plant status: MRPL CDU-1 is operating at 112% capacity. Atmospheric column C-101 overhead vapor temp (TIC-101) is currently elevated at 182.4°C (Limit: 175.0°C). How can I assist?",
      thoughts: "1. Ingested live DCS snapshot from FastMCP opc-ua bridge.\n2. Detected ISA-18.2 Critical excursion on TIC-101.\n3. Verified Triconex SIS SIL-3 safety envelope is armed (read-only mode).\n4. Ready for operator queries or root-cause workflow.",
      thoughtTime: "0.8s",
      tools: [
        {
          name: "opc_ua_read_tag_group",
          server: "dcs-scada-mcp",
          status: "success",
          args: '{"unit": "CDU-1", "tags": ["TIC-101", "FIC-102", "PIC-104", "P-201A_VIB"]}',
          result: '{"TIC-101": 182.4, "FIC-102": 142.8, "PIC-104": 14.82, "P-201A_VIB": 8.6, "status": "GOOD_CASCADE"}'
        }
      ]
    }
  ]);

  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  // Handle external prompts passed from Mission Control or Alarm Banner
  useEffect(() => {
    if (externalPrompt && externalPrompt.trim()) {
      handleDirectPrompt(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  const handleDirectPrompt = (promptText: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: promptText,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }) + " IST",
    };
    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    setTimeout(() => {
      generateSmartResponse(promptText);
      setIsGenerating(false);
    }, 1200);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    const currentInput = input;
    setInput("");
    handleDirectPrompt(currentInput);
  };

  const generateSmartResponse = (prompt: string) => {
    const lower = prompt.toLowerCase();
    const replyId = (Date.now() + 1).toString();
    const timeNow = new Date().toLocaleTimeString("en-IN", { hour12: false }) + " IST";

    if (lower.includes("permit") || lower.includes("ptw") || lower.includes("p-201a")) {
      setMessages(prev => [
        ...prev,
        {
          id: replyId,
          role: "agent",
          agentName: "Safety Agent",
          timestamp: timeNow,
          content: "I have prepared the draft Cold Work Permit for Pump P-201A mechanical seal replacement. I cross-referenced P&ID drawing #401-CDU-02 to establish mechanical positive isolation and verified gas monitoring requisites under OISD-STD-105.",
          thoughts: "1. Parsed target equipment: P-201A (Atmospheric Residue Bottoms Pump).\n2. Queried P&ID graph: Found suction block valve V-201, discharge block valve V-204, and drain valve VD-201.\n3. Queried MSDS: Service is Heavy Reduced Crude at 340°C. Mandatory LEL < 0.5% and Pyrophoric iron scale wash (OISD-STD-112).\n4. Requesting operator approval before locking isolation tag boundary.",
          thoughtTime: "1.4s",
          tools: [
            {
              name: "query_pid_isolation_boundary",
              server: "pid-graph-mcp",
              status: "success",
              args: '{"equipment": "P-201A", "service": "Heavy Reduced Crude"}',
              result: '{"isolation_points": ["V-201 (Suction)", "V-204 (Discharge)", "VD-201 (Casing Drain)"], "spade_locations": ["SP-201A-1", "SP-201A-2"]}'
            },
            {
              name: "generate_oisd_105_ptw",
              server: "safety-compliance-mcp",
              status: "requires_approval",
              args: '{"permit_type": "COLD_WORK", "equipment": "P-201A", "isolation_count": 3, "gas_test_req": true}',
              approvalAction: "Authorize Cold Work Permit #PTW-8842 for P-201A Seal Replacement with 3 mechanical blind points",
              consequenceLevel: "high"
            }
          ]
        }
      ]);
    } else if (lower.includes("temp") || lower.includes("tic-101") || lower.includes("pressure") || lower.includes("rca")) {
      setMessages(prev => [
        ...prev,
        {
          id: replyId,
          role: "agent",
          agentName: "Operations Agent",
          timestamp: timeNow,
          content: "Root cause analysis for Column C-101 overhead excursion completed. Upstream telemetry indicates crude feed gravity shifted abruptly from API 33.2 to 28.7 at 01:42 IST, increasing light ends vapor volume by +14.2%. Recommending an increase in Overhead Reflux flow (FIC-104) from 94 m³/h to 102 m³/h to stabilize tower temperature.",
          thoughts: "1. Extracted 30-min time-series for TIC-101, PIC-104, and FIC-104.\n2. Cross-referenced LIMS crude assay feed log.\n3. Verified column pressure relief valves (PSV-101A/B set at 18.5 bar) are untouched.\n4. Simulated column tray mass balance using sandboxed Python model.",
          thoughtTime: "2.1s",
          tools: [
            {
              name: "fastmcp_query_historian_trend",
              server: "historian-mcp",
              status: "success",
              args: '{"tags": ["TIC-101", "PIC-104", "FIC-104"], "window_min": 30}',
              result: '{"TIC-101_ramp": "+1.8C/min", "PIC-104_peak": "14.82 bar", "reflux_ratio": 2.14}'
            },
            {
              name: "execute_sandboxed_reflux_calc",
              server: "code-sandbox-mcp",
              status: "success",
              args: '{"calc": "column_tray_equilibrium", "target_temp": 174.0, "current_pv": 182.4}',
              result: '{"recommended_reflux_sp": 102.5, "duty_reduction_gcal": 1.4, "convergence": true}'
            }
          ]
        }
      ]);
    } else if (lower.includes("shift") || lower.includes("handover")) {
      setMessages(prev => [
        ...prev,
        {
          id: replyId,
          role: "agent",
          agentName: "Operations Agent",
          timestamp: timeNow,
          content: "I have compiled the formal 8-Hour Shift Handover Report for Shift B (CDU-1 & HCU-1). Total throughput logged: 24,180 bbls. 1 active mechanical seal isolation on P-201A, 0 bypassed safety interlocks, and 1 temporary high temperature alarm recorded on TIC-101. The report document is ready for supervisor sign-off.",
          thoughts: "1. Aggregated Shift B alarm log (1 critical, 1 high, 1 medium).\n2. Checked Triconex SIS bypass register: 0 active overrides.\n3. Queried SAP PM open notifications: IW21 #4001928 logged for P-201A seal.\n4. Formatted deliverable per MRPL Refinery Operations Manual Appendix D.",
          thoughtTime: "1.7s",
          tools: [
            {
              name: "generate_shift_handover_report",
              server: "deliverables-mcp",
              status: "success",
              args: '{"shift": "B", "lead": "Er. Ashutosh Rao", "units": ["CDU-1", "HCU-1"]}',
              result: '{"status": "GENERATED", "doc_id": "MRPL-DPR-2026-09-23-B", "download_url": "/api/deliverables/handover"}'
            }
          ]
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          id: replyId,
          role: "agent",
          agentName: "Orchestrator",
          timestamp: timeNow,
          content: `Query received: "${prompt}". Operations, Safety, and Maintenance subagents have evaluated plant telemetry. All primary process loops in MRPL CDU-1 are within safe operational envelopes. Would you like me to inspect specific P&ID tags, run hydraulic calculations, or review active permits?`,
          thoughts: "1. General inquiry parsed.\n2. Verified health of all 7 connected FastMCP bridges.\n3. Ready for specialized task dispatch.",
          thoughtTime: "0.9s",
        }
      ]);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#080c15] relative overflow-hidden">
      {/* Subagent Selector Filter Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0c1220]/90 px-4 py-2.5 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs">
          <span className="text-slate-500 mr-1 hidden sm:inline">ROUTER:</span>
          {[
            { id: "all", label: "Multi-Agent Co-Pilot", icon: <Sparkles className="h-3 w-3 text-cyan-400" /> },
            { id: "ops", label: "Operations", icon: <Activity className="h-3 w-3 text-blue-400" /> },
            { id: "safety", label: "Safety & HSE", icon: <ShieldCheck className="h-3 w-3 text-emerald-400" /> },
            { id: "maint", label: "Maintenance", icon: <Wrench className="h-3 w-3 text-amber-400" /> },
            { id: "vision", label: "P&ID Vision", icon: <Eye className="h-3 w-3 text-purple-400" /> },
          ].map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                selectedAgent === agent.id
                  ? "bg-blue-600/30 border border-blue-500/50 text-white font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {agent.icon}
              <span>{agent.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="rounded bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 text-indigo-300 flex items-center gap-1.5">
            <Cpu className="h-3 w-3 text-indigo-400" />
            <span className="hidden md:inline">Gemma 4 12B • 32k</span>
          </span>
        </div>
      </div>

      {/* Messages Stream Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isGenerating && (
          <div className="flex items-start gap-3 max-w-4xl mx-auto w-full">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400">
              <Bot className="h-4 w-4 animate-spin" />
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#0c1220] p-4 text-xs font-mono text-cyan-300 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
              </span>
              <span>Agents deliberating & executing FastMCP tools...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar & Controls */}
      <div className="border-t border-white/[0.08] bg-[#0c1220]/95 p-3 md:p-4 backdrop-blur-md">
        <form onSubmit={handleSend} className="relative mx-auto max-w-4xl flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full rounded-xl border border-white/[0.12] bg-[#080c15] pl-4 pr-10 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-sans"
              placeholder="Ask Indra AI (e.g. 'Draft cold work permit for P-201A', 'Diagnose TIC-101 alarm', '/handover')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-400">
              <button
                type="button"
                title="Attach P&ID Drawing or Log file"
                onClick={() => onNavigateTab && onNavigateTab("pid")}
                className="hover:text-cyan-400 p-1 rounded"
              >
                <Paperclip className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:from-blue-500 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="mx-auto max-w-4xl mt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
          <div className="flex items-center gap-2">
            <span>Air-Gapped Local Inference</span>
            <span>•</span>
            <span>Zero Outbound Traffic</span>
          </div>
          <div className="hidden sm:block">
            <span>Press Enter to dispatch • Shift + Enter for newline</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isAgent = message.role === "agent";

  return (
    <div className={`flex gap-3 md:gap-4 max-w-4xl mx-auto w-full ${isAgent ? "" : "flex-row-reverse"}`}>
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          isAgent
            ? "bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
            : "bg-slate-800 border border-white/[0.1] text-slate-200"
        }`}
      >
        {isAgent ? <Bot className="h-4 w-4 text-cyan-400" /> : <User className="h-4 w-4 text-slate-300" />}
      </div>

      {/* Message Bubble Container */}
      <div className={`flex flex-col gap-2 max-w-[85%] ${isAgent ? "items-start" : "items-end"}`}>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="font-semibold text-slate-200">
            {isAgent ? message.agentName || "Indra Co-Pilot" : "Operator (Er. Ashutosh Rao)"}
          </span>
          {message.timestamp && <span>{message.timestamp}</span>}
        </div>

        {/* Expandable Thought Trace */}
        {message.thoughts && (
          <ThoughtTrace thoughts={message.thoughts} duration={message.thoughtTime} />
        )}

        {/* Text Content */}
        <div
          className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
            isAgent
              ? "bg-[#0c1220] border border-white/[0.08] text-slate-200 shadow-md"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md font-sans"
          }`}
        >
          {message.content}
        </div>

        {/* Tools Execution Cards */}
        {message.tools && message.tools.map((tool, idx) => (
          <div key={idx} className="w-full mt-1.5">
            <ToolExecutionCard tool={tool} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ThoughtTrace({ thoughts, duration }: { thoughts: string; duration?: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full rounded-lg border border-cyan-500/20 bg-cyan-950/20 text-xs overflow-hidden font-mono transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-3 py-2 text-cyan-400 hover:bg-cyan-950/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          <span className="font-semibold">Reasoning Thought Trace</span>
        </div>
        {duration && (
          <span className="text-[10px] text-cyan-500/80 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
            {duration}
          </span>
        )}
      </button>

      {expanded && (
        <div className="px-3.5 py-2.5 border-t border-cyan-500/20 bg-[#070b14]/90 text-slate-300 whitespace-pre-wrap leading-relaxed text-[11px]">
          {thoughts}
        </div>
      )}
    </div>
  );
}

function ToolExecutionCard({ tool }: { tool: any }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tool.result || tool.args);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (tool.status === "requires_approval") {
    return (
      <ApprovalGate
        actionDescription={tool.approvalAction}
        consequenceLevel={tool.consequenceLevel || "high"}
        onApprove={() => console.log("Approved action:", tool.name)}
        onReject={(reason) => console.log("Rejected action:", tool.name, reason)}
      />
    );
  }

  return (
    <div className="w-full rounded-lg border border-white/[0.08] bg-[#0c1220] text-xs font-mono overflow-hidden shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-3 py-2 hover:bg-white/[0.04] transition-colors"
      >
        <div className="flex items-center gap-2 text-slate-300">
          <TerminalSquare className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-bold text-slate-200">{tool.name}</span>
          {tool.server && (
            <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-white/[0.05]">
              {tool.server}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {tool.status === "success" && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              SUCCESS
            </span>
          )}
          {tool.status === "running" && (
            <span className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold bg-amber-950/40 border border-amber-500/30 px-1.5 py-0.5 rounded animate-pulse">
              RUNNING
            </span>
          )}
          {expanded ? <ChevronDown className="h-3.5 w-3.5 text-slate-400" /> : <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
        </div>
      </button>

      {expanded && (
        <div className="p-3 border-t border-white/[0.08] bg-[#070b14] space-y-2 text-[11px]">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span>Tool Arguments (JSON):</span>
              <button onClick={handleCopy} className="hover:text-slate-300 flex items-center gap-1">
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span className="text-[10px]">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <pre className="text-cyan-300 bg-slate-950/80 p-2 rounded border border-white/[0.05] overflow-x-auto">
              {tool.args}
            </pre>
          </div>

          {tool.result && (
            <div>
              <div className="text-slate-500 mb-1">Result Payload:</div>
              <pre className="text-emerald-400 bg-slate-950/80 p-2 rounded border border-white/[0.05] overflow-x-auto">
                {tool.result}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
