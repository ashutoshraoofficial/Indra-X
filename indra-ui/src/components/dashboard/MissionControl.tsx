"use client";

import React, { useState } from "react";
import { 
  Activity, 
  Flame, 
  Gauge, 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  FileText, 
  Wrench, 
  CheckCircle2,
  RefreshCw,
  Search,
  ExternalLink
} from "lucide-react";

interface MissionControlProps {
  onNavigateTab: (tab: string) => void;
  onSelectTag: (tag: string) => void;
  onTriggerPrompt: (prompt: string) => void;
}

export function MissionControl({ onNavigateTab, onSelectTag, onTriggerPrompt }: MissionControlProps) {
  const [selectedUnit, setSelectedUnit] = useState("CDU-1");

  const kpis = [
    {
      title: "CRUDE THROUGHPUT",
      value: "72,850 BPD",
      sub: "112.1% Design Load",
      status: "optimal",
      delta: "+2.4%",
      trend: "up",
      tag: "FIC-102",
      color: "emerald",
    },
    {
      title: "FURNACE F-101 COT",
      value: "364.2 °C",
      sub: "Target: 362.0 °C [±5°C]",
      status: "optimal",
      delta: "+0.8%",
      trend: "up",
      tag: "TIC-105",
      color: "cyan",
    },
    {
      title: "C-101 OVERHEAD PRESS",
      value: "14.82 bar",
      sub: "Hi-Hi Limit: 15.00 bar",
      status: "warning",
      delta: "+4.1%",
      trend: "up",
      tag: "PIC-104",
      color: "amber",
    },
    {
      title: "ENERGY INTENSITY INDEX",
      value: "92.4 MBN",
      sub: "Solomon 1st Quartile",
      status: "optimal",
      delta: "-1.8%",
      trend: "down",
      tag: "EII-AGG",
      color: "emerald",
    },
  ];

  const agentAlerts = [
    {
      agent: "Operations Agent",
      role: "DCS Advisory",
      time: "2 mins ago",
      text: "Crude feed assay switch detected (Basrah Heavy 70% blend). Recommending +1.2°C heater inlet trim to preserve Diesel cut point.",
      action: "Optimize Heater Setpoint",
      prompt: "Analyze Basrah Heavy crude blend impact on CDU-1 furnace duty and cut points",
      badge: "border-blue-500/40 text-blue-400 bg-blue-950/30",
    },
    {
      agent: "Safety / HSE Agent",
      role: "OISD Compliance",
      time: "8 mins ago",
      text: "Cold Work Permit #PTW-8841 verified against P&ID isolations. Confined space gas test: LEL 0.0%, H2S 0ppm, O2 20.9% (Compliant with OISD-STD-105).",
      action: "View Permit Diff",
      prompt: "Review PTW-8841 mechanical isolation boundary on P-201A",
      badge: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
    },
    {
      agent: "Maintenance Agent",
      role: "Vibration Diagnostics",
      time: "14 mins ago",
      text: "Bently Nevada 3500 FFT spectrum on Pump P-201A indicates 1X rotational unbalance and suction pressure cavitation warning.",
      action: "Diagnose Pump Cavitation",
      prompt: "Run root cause analysis on Pump P-201A suction cavitation using SAP PM history",
      badge: "border-amber-500/40 text-amber-400 bg-amber-950/30",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#080c15] overflow-y-auto p-4 md:p-6 space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 font-mono">
                MISSION CONTROL
              </span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300">
                MRPL REFINERY PHASE-III
              </span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1 font-sans">
            Real-time autonomous supervision, ISA-101 process overview, and multi-agent coordination cockpit.
          </p>
        </div>

        {/* Unit Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900/80 border border-white/[0.08] font-mono text-xs">
          {["CDU-1", "VDU-2", "HCU-1", "PFCCU", "DCU", "SRU"].map((unit) => (
            <button
              key={unit}
              onClick={() => setSelectedUnit(unit)}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                selectedUnit === unit
                  ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            onClick={() => onSelectTag(kpi.tag)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c1220]/90 p-4 transition-all hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]"
          >
            <div className="flex items-center justify-between text-[11px] font-mono font-medium text-slate-400">
              <span>{kpi.title}</span>
              <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                {kpi.tag}
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-white tracking-tight">
                {kpi.value}
              </span>
              <span
                className={`flex items-center text-xs font-mono font-semibold ${
                  kpi.trend === "up" && kpi.status === "warning"
                    ? "text-amber-400"
                    : kpi.trend === "up"
                    ? "text-emerald-400"
                    : "text-emerald-400"
                }`}
              >
                {kpi.trend === "up" ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
                {kpi.delta}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate">{kpi.sub}</span>
              <span
                className={`h-2 w-2 rounded-full ${
                  kpi.status === "optimal"
                    ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    : "bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Center 2-Column: Live Process Topology + Multi-Agent Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Process Topology & Equipment Nodes */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-white/[0.08] bg-[#0c1220]/80 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                {selectedUnit} Process Train Topology • Live Nodes
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab("pid")}
              className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Full P&ID Canvas</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Isometric Process Flow Visualization */}
          <div className="relative rounded-lg border border-white/[0.06] bg-[#070a12] p-5 overflow-hidden industrial-grid min-h-[300px] flex flex-col justify-between">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Equipment Flow Row */}
            <div className="grid grid-cols-4 gap-3 relative z-10">
              {/* Node 1: Crude Pre-Heat */}
              <div 
                onClick={() => onSelectTag("E-101")}
                className="group rounded-lg border border-slate-800 bg-slate-900/60 p-3 hover:border-cyan-500/50 cursor-pointer transition-all hover:bg-slate-900"
              >
                <div className="text-[10px] font-mono text-slate-500">EXCHANGER TRAIN</div>
                <div className="font-mono font-bold text-white text-sm group-hover:text-cyan-300">E-101 A-F</div>
                <div className="mt-2 text-xs font-mono text-emerald-400">182.0 °C OUT</div>
                <div className="text-[10px] text-slate-400 mt-1">Crude Preheat Train</div>
              </div>

              {/* Node 2: Furnace F-101 */}
              <div 
                onClick={() => onSelectTag("F-101")}
                className="group rounded-lg border border-slate-800 bg-slate-900/60 p-3 hover:border-cyan-500/50 cursor-pointer transition-all hover:bg-slate-900"
              >
                <div className="text-[10px] font-mono text-slate-500">ATM FURNACE</div>
                <div className="font-mono font-bold text-white text-sm group-hover:text-cyan-300">F-101</div>
                <div className="mt-2 text-xs font-mono text-cyan-300 font-bold">364.2 °C COT</div>
                <div className="text-[10px] text-slate-400 mt-1">Natural Gas Fired</div>
              </div>

              {/* Node 3: Column C-101 */}
              <div 
                onClick={() => onSelectTag("C-101")}
                className="group rounded-lg border border-amber-500/40 bg-amber-950/20 p-3 hover:border-amber-400 cursor-pointer transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)]"
              >
                <div className="text-[10px] font-mono text-amber-400 font-bold flex items-center justify-between">
                  <span>FRACTIONATOR</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                </div>
                <div className="font-mono font-bold text-white text-sm group-hover:text-amber-300">C-101</div>
                <div className="mt-2 text-xs font-mono text-amber-300 font-bold">182.4 °C OH</div>
                <div className="text-[10px] text-slate-400 mt-1">Atmospheric Column</div>
              </div>

              {/* Node 4: Bottoms Pump P-201A */}
              <div 
                onClick={() => onSelectTag("P-201A")}
                className="group rounded-lg border border-red-500/40 bg-red-950/20 p-3 hover:border-red-400 cursor-pointer transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)]"
              >
                <div className="text-[10px] font-mono text-red-400 font-bold flex items-center justify-between">
                  <span>RESIDUE PUMP</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                </div>
                <div className="font-mono font-bold text-white text-sm group-hover:text-red-300">P-201A</div>
                <div className="mt-2 text-xs font-mono text-red-300 font-bold">8.6 mm/s VIB</div>
                <div className="text-[10px] text-slate-400 mt-1">Atm Bottoms To DCU</div>
              </div>
            </div>

            {/* Bottom Process Indicators Bar */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span>DCS LINK: <strong className="text-emerald-400">YOKOGAWA CENTUM VP</strong></span>
                <span>SAFETY: <strong className="text-cyan-400">TRICONEX SIL-3</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>All 18 Interlocks Verified</span>
              </div>
            </div>
          </div>

          {/* Quick Action Chips */}
          <div className="pt-2">
            <div className="text-xs font-mono text-slate-400 mb-2">QUICK CO-PILOT ACTIONS:</div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Draft PTW Cold Work (P-201A)", prompt: "Draft an OISD-STD-105 compliant cold work permit for Pump P-201A mechanical seal replacement with isolation tag boundaries." },
                { label: "Analyze C-101 Pressure Spike", prompt: "Perform root cause analysis on Column C-101 overhead pressure excursion at 14.82 bar using telemetry history." },
                { label: "Generate 8-Hour Shift Handover", prompt: "Compile a formal Shift Handover Report for Shift B including active alarms, bypassed interlocks, and production volumes." },
                { label: "Check OISD-105 Compliance Checklist", prompt: "Run an automated compliance audit against OISD-STD-105 for current active refinery permits." }
              ].map((chip, i) => (
                <button
                  key={i}
                  onClick={() => onTriggerPrompt(chip.prompt)}
                  className="rounded-md border border-white/[0.08] bg-slate-900/60 px-3 py-1.5 text-xs font-mono text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="h-3 w-3 text-cyan-400" />
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Multi-Agent Live Intelligence Feed */}
        <div className="lg:col-span-5 flex flex-col rounded-xl border border-white/[0.08] bg-[#0c1220]/80 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                Multi-Agent Supervisory Feed
              </h2>
            </div>
            <span className="text-[10px] font-mono rounded bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 text-indigo-300">
              3 AGENTS ACTIVE
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {agentAlerts.map((alert, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/[0.06] bg-slate-900/40 p-3.5 space-y-2.5 hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${alert.badge}`}>
                      {alert.agent}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">• {alert.role}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{alert.time}</span>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {alert.text}
                </p>

                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => onTriggerPrompt(alert.prompt)}
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    <span>{alert.action}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Air-Gap Guarantee Card */}
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <div>
                <div className="text-xs font-mono font-bold text-emerald-300 uppercase">
                  Sovereign Air-Gap Verified
                </div>
                <div className="text-[10px] text-slate-400">
                  Zero cloud telemetry • Local Gemma 4 & Qwen 2.5
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab("security")}
              className="text-xs font-mono text-emerald-400 hover:underline"
            >
              Audit Log →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
