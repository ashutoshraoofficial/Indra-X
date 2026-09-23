"use client";

import React, { useState } from "react";
import { Server, Activity, Clock, Terminal, Globe, Plus, Settings, ChevronRight, CheckCircle2, AlertTriangle, ShieldCheck, TerminalSquare } from "lucide-react";
import { MCPInspector } from "./MCPInspector";
import { MCPServerBuilder } from "./MCPServerBuilder";

interface MCPServer {
  id: string;
  name: string;
  transport: "stdio" | "http";
  status: "connected" | "degraded" | "error";
  toolCount: number;
  lastHeartbeat: string;
  description: string;
  endpoint: string;
  latency: string;
}

export function MCPManagerDashboard() {
  const [activeSubTab, setActiveSubTab] = useState<"grid" | "inspector" | "builder">("grid");

  const mockServers: MCPServer[] = [
    {
      id: "dcs-scada",
      name: "dcs-scada-mcp",
      transport: "stdio",
      status: "connected",
      toolCount: 12,
      lastHeartbeat: "1s ago",
      description: "Yokogawa CENTUM VP DCS live telemetry & process values bridge",
      endpoint: "python -m fastmcp run dcs_server.py",
      latency: "18ms",
    },
    {
      id: "sap-pm",
      name: "sap-pm-mcp",
      transport: "http",
      status: "connected",
      toolCount: 6,
      lastHeartbeat: "4s ago",
      description: "SAP S/4HANA Plant Maintenance (PM) work orders, notifications & asset history",
      endpoint: "http://127.0.0.1:8080/mcp/sap",
      latency: "34ms",
    },
    {
      id: "pid-graph",
      name: "pid-graph-mcp",
      transport: "stdio",
      status: "connected",
      toolCount: 8,
      lastHeartbeat: "1s ago",
      description: "NetworkX / Neo4j P&ID topological pipeline graph queries & isolation boundaries",
      endpoint: "python -m fastmcp run pid_graph.py",
      latency: "12ms",
    },
    {
      id: "safety-sis",
      name: "safety-interlock-mcp",
      transport: "stdio",
      status: "connected",
      toolCount: 4,
      lastHeartbeat: "1s ago",
      description: "Schneider Electric Triconex TMR SIL-3 SIS interlock register (READ-ONLY)",
      endpoint: "python -m fastmcp run sis_triconex.py",
      latency: "8ms",
    },
    {
      id: "ocr-watch",
      name: "folder-watch-ocr-mcp",
      transport: "stdio",
      status: "connected",
      toolCount: 3,
      lastHeartbeat: "2s ago",
      description: "PaddleOCR + Docling local document ingestion pipeline for scanned certificates",
      endpoint: "python -m fastmcp run doc_ocr.py",
      latency: "45ms",
    },
    {
      id: "lims-lab",
      name: "lims-mcp",
      transport: "http",
      status: "degraded",
      toolCount: 5,
      lastHeartbeat: "38s ago",
      description: "Laboratory Information Management System (Crude assays, ASTM D86 distillation)",
      endpoint: "http://127.0.0.1:9090/mcp/lims",
      latency: "120ms",
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "bg-emerald-500";
      case "degraded": return "bg-amber-500";
      case "error": return "bg-red-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#080c15] overflow-y-auto p-4 md:p-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 font-mono">
                FASTMCP INDUSTRIAL MESH
              </span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Standardized Model Context Protocol bridges connecting local LLMs to OT SCADA, ERP, and Safety instrumentation.
          </p>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900/90 border border-white/[0.08] font-mono text-xs">
          {[
            { id: "grid", label: "Server Mesh (6)", icon: <Server className="h-3.5 w-3.5 text-cyan-400" /> },
            { id: "inspector", label: "Live Tool Inspector", icon: <TerminalSquare className="h-3.5 w-3.5 text-indigo-400" /> },
            { id: "builder", label: "Connect Server", icon: <Plus className="h-3.5 w-3.5 text-emerald-400" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSubTab(item.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeSubTab === item.id
                  ? "bg-blue-600/30 text-cyan-300 border border-blue-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tab Views */}
      {activeSubTab === "inspector" && <MCPInspector />}
      {activeSubTab === "builder" && <MCPServerBuilder />}

      {activeSubTab === "grid" && (
        <div className="space-y-6">
          {/* Grid of Server Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockServers.map((server) => (
              <div
                key={server.id}
                className="flex flex-col border border-white/[0.08] bg-[#0c1424] rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] group"
              >
                {/* Header */}
                <div className="p-4 border-b border-white/[0.06] flex items-start justify-between bg-[#080d18]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                      <Server className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                        {server.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`h-2 w-2 rounded-full ${getStatusColor(server.status)} ${server.status === "connected" ? "animate-pulse" : ""}`} />
                        <span className="text-[11px] font-mono text-slate-400 capitalize">{server.status}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[11px] font-mono text-cyan-400 font-semibold">{server.latency}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveSubTab("inspector")}
                    className="text-slate-500 hover:text-slate-300 p-1"
                    title="Inspect Server Tools"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {server.description}
                  </p>

                  <div className="rounded bg-black/40 border border-white/[0.05] p-2 font-mono text-[10px] text-slate-400 truncate">
                    <code>{server.endpoint}</code>
                  </div>
                </div>

                {/* Footer Meta */}
                <div className="bg-[#070b14] px-4 py-2.5 flex items-center justify-between border-t border-white/[0.06] text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    {server.transport === "stdio" ? <Terminal className="h-3.5 w-3.5 text-slate-500" /> : <Globe className="h-3.5 w-3.5 text-slate-500" />}
                    <span className="uppercase text-[10px]">{server.transport}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="text-slate-300 font-semibold">{server.toolCount} tools</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                    <Clock className="h-3 w-3" />
                    <span>{server.lastHeartbeat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
