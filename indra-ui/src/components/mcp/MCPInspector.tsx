"use client";

import React, { useState } from "react";
import { TerminalSquare, FileJson, MessageSquare, Play, ChevronRight, Activity } from "lucide-react";

export function MCPInspector() {
  const [activeTab, setActiveTab] = useState<"tools" | "resources" | "prompts">("tools");
  const [selectedTool, setSelectedTool] = useState("read_dcs_tags");

  const tools = [
    { name: "read_dcs_tags", desc: "Read current values from OPC-UA tags" },
    { name: "get_historical_trend", desc: "Fetch time-series data for a tag" },
    { name: "acknowledge_alarm", desc: "Acknowledge an active ISA-18.2 alarm" },
  ];

  return (
    <div className="flex h-full w-full bg-background overflow-hidden border border-isa-slate/20 rounded-lg">
      
      {/* Sidebar Navigation */}
      <div className="w-64 border-r border-isa-slate/30 bg-muted/10 flex flex-col">
        <div className="p-4 border-b border-isa-slate/30">
          <h3 className="font-semibold text-foreground">dcs-scada-mcp</h3>
          <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Connected (Stdio)
          </p>
        </div>
        
        <div className="flex p-2 gap-1 border-b border-isa-slate/20">
          <TabButton active={activeTab === "tools"} onClick={() => setActiveTab("tools")} icon={<TerminalSquare className="h-4 w-4" />} label="Tools" />
          <TabButton active={activeTab === "resources"} onClick={() => setActiveTab("resources")} icon={<FileJson className="h-4 w-4" />} label="Resources" />
          <TabButton active={activeTab === "prompts"} onClick={() => setActiveTab("prompts")} icon={<MessageSquare className="h-4 w-4" />} label="Prompts" />
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {activeTab === "tools" && tools.map(tool => (
            <button 
              key={tool.name}
              onClick={() => setSelectedTool(tool.name)}
              className={`w-full text-left px-3 py-2 rounded-md mb-1 transition-colors text-sm ${selectedTool === tool.name ? "bg-isa-accent/10 text-isa-accent border border-isa-accent/20" : "text-foreground hover:bg-isa-slate/10"}`}
            >
              <div className="font-mono font-semibold">{tool.name}</div>
              <div className="text-xs text-muted-foreground truncate mt-0.5">{tool.desc}</div>
            </button>
          ))}
          {activeTab !== "tools" && (
            <div className="p-4 text-xs text-muted-foreground text-center">No items found.</div>
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Input Form Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl">
            <h2 className="text-xl font-mono font-bold text-foreground mb-2">{selectedTool}</h2>
            <p className="text-sm text-muted-foreground mb-6">Read current values from OPC-UA tags</p>

            <div className="space-y-4 bg-muted/5 p-4 rounded-lg border border-isa-slate/20">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">unit <span className="text-isa-crit">*</span></label>
                <select className="w-full bg-background border border-isa-slate/30 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-isa-accent">
                  <option>CDU-1</option>
                  <option>HCU</option>
                  <option>DCU</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">The process unit to query.</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">tags <span className="text-isa-crit">*</span></label>
                <textarea 
                  className="w-full bg-background border border-isa-slate/30 rounded-md px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-isa-accent"
                  rows={3}
                  defaultValue='["TI-101", "PI-204"]'
                />
                <p className="text-xs text-muted-foreground mt-1">JSON array of tag names (e.g. ["TI-101", "FIC-201"]).</p>
              </div>

              <div className="pt-2">
                <button className="flex items-center gap-2 bg-isa-accent text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium text-sm">
                  <Play className="h-4 w-4 fill-current" />
                  Execute Tool
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* JSON-RPC Traffic Log Viewer */}
        <div className="h-64 border-t border-isa-slate/30 bg-[#0d1117] flex flex-col font-mono text-xs">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-isa-slate/20 bg-muted/5 text-isa-slate">
            <Activity className="h-4 w-4" />
            <span className="font-semibold uppercase tracking-wider">Protocol Inspector</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <LogEntry 
              direction="out"
              method="tools/call"
              payload='{"name": "read_dcs_tags", "arguments": {"unit": "CDU-1", "tags": ["TI-101", "PI-204"]}}'
            />
            <LogEntry 
              direction="in"
              method="tools/call (response)"
              payload='{"content": [{"type": "text", "text": "{\"TI-101\": 345.2, \"PI-204\": 12.4}"}]}'
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}

function TabButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded transition-colors ${active ? "bg-background shadow-sm text-foreground font-semibold" : "text-muted-foreground hover:bg-isa-slate/10"}`}
    >
      {icon} {label}
    </button>
  );
}

function LogEntry({ direction, method, payload }: { direction: "in" | "out", method: string, payload: string }) {
  const isOut = direction === "out";
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className={`px-1.5 rounded-sm font-bold ${isOut ? "bg-blue-900/50 text-blue-400" : "bg-emerald-900/50 text-emerald-400"}`}>
          {isOut ? "->" : "<-"}
        </span>
        <span className="text-gray-300">{method}</span>
      </div>
      <div className="pl-6 text-gray-500">
        {payload}
      </div>
    </div>
  );
}
