"use client";

import React, { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { AlarmBanner } from "./AlarmBanner";
import { StatusBar } from "./StatusBar";
import { 
  Home, 
  MessageSquare, 
  ActivitySquare, 
  Database, 
  Shield, 
  Settings, 
  Menu, 
  Layers, 
  BrainCircuit, 
  ChevronRight, 
  PanelRightClose, 
  PanelRightOpen,
  Search,
  Sparkles,
  ShieldCheck,
  Flame,
  Radio
} from "lucide-react";

interface WorkbenchShellProps {
  children: React.ReactNode;
  inspectorPanel?: React.ReactNode;
  activeNavTab: string;
  onSelectNavTab: (tab: string) => void;
  onDiagnoseAI?: (tag: string) => void;
}

export function WorkbenchShell({ 
  children, 
  inspectorPanel, 
  activeNavTab, 
  onSelectNavTab,
  onDiagnoseAI 
}: WorkbenchShellProps) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showInspector, setShowInspector] = useState(true);

  const navItems = [
    { id: "overview", label: "Mission Control", icon: <Home className="h-5 w-5" />, badge: "LIVE" },
    { id: "chat", label: "Agent Co-Pilot", icon: <MessageSquare className="h-5 w-5" />, badge: "4 AGENTS" },
    { id: "pid", label: "P&ID Digital Twin", icon: <ActivitySquare className="h-5 w-5" />, badge: "SCADA" },
    { id: "mcp", label: "FastMCP Mesh", icon: <Database className="h-5 w-5" />, badge: "7 ACTIVE" },
    { id: "training", label: "Model Training", icon: <BrainCircuit className="h-5 w-5" />, badge: "QLoRA" },
    { id: "security", label: "Air-Gap & Audit", icon: <Shield className="h-5 w-5" />, badge: "MERKLE" },
  ];

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#080c15] text-slate-100 select-none">
      {/* 1. Master Command Header */}
      <header className="flex h-14 w-full items-center justify-between border-b border-white/[0.08] bg-[#0c1220]/95 px-4 z-40 backdrop-blur-md">
        {/* Brand & Facility Info */}
        <div className="flex items-center gap-3">
          {/* Vajra Diamond Emblem */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#090d18]">
              <Sparkles className="h-5 w-5 text-cyan-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-extrabold tracking-wider text-white">
                INDRA <span className="text-cyan-400">AI</span>
              </span>
              <span className="rounded bg-blue-950/80 border border-blue-500/40 px-1.5 py-0.2 font-mono text-[10px] font-bold text-blue-300">
                SOVEREIGN WORKBENCH
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
              <span>MRPL Mangalore Refinery</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Phase III (15 MMTPA)</span>
            </div>
          </div>
        </div>

        {/* Center Quick Unit Switcher & Search */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg bg-slate-900/90 border border-white/[0.08] p-1 text-xs font-mono">
            <span className="text-slate-500 px-2 text-[11px]">ACTIVE UNIT:</span>
            {["CDU-1", "HCU-2", "PFCCU"].map((u) => (
              <button
                key={u}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  u === "CDU-1"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          {/* Quick Tag Jump Pill */}
          <div className="hidden lg:flex items-center gap-2 rounded-lg bg-[#070b14] border border-white/[0.08] px-3 py-1.5 text-xs text-slate-400 font-mono">
            <Search className="h-3.5 w-3.5 text-slate-500" />
            <span>Search Tag / Command...</span>
            <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 border border-white/[0.05]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Status Badges & Controls */}
        <div className="flex items-center gap-3">
          {/* Master SIL-3 SIS Interlock Status */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 text-xs font-mono text-emerald-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold text-[11px]">SIL-3 SIS: ARMED</span>
          </div>

          {/* Inspector Panel Toggle Button */}
          <button
            onClick={() => setShowInspector(!showInspector)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-mono transition-all border ${
              showInspector
                ? "bg-slate-800 border-white/[0.1] text-cyan-300"
                : "bg-slate-900 border-white/[0.06] text-slate-400 hover:text-white"
            }`}
            title={showInspector ? "Collapse Inspector Panel" : "Expand Inspector Panel"}
          >
            {showInspector ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
            <span className="hidden xl:inline">Inspector</span>
          </button>
        </div>
      </header>

      {/* 2. Persistent ISA-18.2 Smart Alarm Strip */}
      <AlarmBanner onDiagnoseAI={onDiagnoseAI} />

      {/* 3. Main Multi-Pane Workbench Body */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          {/* Left Navigation Rail */}
          <ResizablePanel
            defaultSize={isNavExpanded ? 14 : 4}
            minSize={3}
            maxSize={18}
            className="flex flex-col border-r border-white/[0.08] bg-[#0a0f1d] transition-all duration-200"
          >
            {/* Collapse / Expand Toggle */}
            <div className="flex h-11 items-center justify-between border-b border-white/[0.08] px-3">
              {isNavExpanded && (
                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                  Workspace
                </span>
              )}
              <button
                onClick={() => setIsNavExpanded(!isNavExpanded)}
                className="p-1.5 hover:bg-white/[0.06] rounded-md transition-colors text-slate-400 hover:text-white mx-auto"
                title={isNavExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-1 flex-col items-center gap-2 py-3 px-1.5">
              {navItems.map((item) => {
                const isActive = activeNavTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectNavTab(item.id)}
                    title={!isNavExpanded ? item.label : undefined}
                    className={`flex items-center gap-3 rounded-lg p-2.5 transition-all w-full font-mono text-xs ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                        : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
                    }`}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    {isNavExpanded && (
                      <div className="flex flex-1 items-center justify-between truncate text-left">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                            isActive ? "bg-cyan-500/30 text-cyan-200" : "bg-white/[0.05] text-slate-500"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom Config Link */}
            <div className="flex flex-col items-center p-2 border-t border-white/[0.08]">
              <button
                onClick={() => onSelectNavTab("settings")}
                title="System Configuration"
                className={`flex items-center gap-3 rounded-lg p-2.5 transition-all w-full font-mono text-xs ${
                  activeNavTab === "settings"
                    ? "bg-slate-800 text-white font-bold"
                    : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Settings className="h-5 w-5 flex-shrink-0" />
                {isNavExpanded && <span className="truncate">Settings & Node</span>}
              </button>
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-1 bg-white/[0.06] hover:bg-cyan-400 transition-colors cursor-col-resize" />

          {/* Center Canvas */}
          <ResizablePanel defaultSize={showInspector ? 70 : 96} minSize={40} className="flex flex-col bg-[#080c15] relative">
            {children}
          </ResizablePanel>

          {/* Right Inspector Panel */}
          {showInspector && inspectorPanel && (
            <>
              <ResizableHandle className="w-1 bg-white/[0.06] hover:bg-cyan-400 transition-colors cursor-col-resize" />
              <ResizablePanel defaultSize={26} minSize={18} maxSize={40} className="flex flex-col bg-[#0a0f1d]">
                {inspectorPanel}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>

      {/* 4. Bottom System Status Bar */}
      <StatusBar />
    </div>
  );
}
