"use client";

import React, { useState, useEffect } from "react";
import { 
  Activity, 
  GitFork, 
  Terminal, 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Zap,
  Play,
  RotateCcw,
  Check
} from "lucide-react";

interface InspectorPanelProps {
  selectedTag?: string;
  onTagAction?: (tag: string, action: string) => void;
}

export function InspectorPanel({ selectedTag = "TIC-101", onTagAction }: InspectorPanelProps) {
  const [activeTab, setActiveTab] = useState<"telemetry" | "graph" | "terminal" | "deliverable">("telemetry");
  const [currentTag, setCurrentTag] = useState(selectedTag);

  useEffect(() => {
    if (selectedTag) setCurrentTag(selectedTag);
  }, [selectedTag]);

  // Live telemetry mock updates
  const [tic101Val, setTic101Val] = useState(182.4);
  const [fic102Val, setFic102Val] = useState(142.8);
  const [pic104Val, setPic104Val] = useState(14.82);

  useEffect(() => {
    const interval = setInterval(() => {
      setTic101Val(prev => parseFloat((prev + (Math.random() - 0.48) * 0.4).toFixed(1)));
      setFic102Val(prev => parseFloat((prev + (Math.random() - 0.5) * 0.8).toFixed(1)));
      setPic104Val(prev => parseFloat((prev + (Math.random() - 0.5) * 0.05).toFixed(2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [simulatedSpike, setSimulatedSpike] = useState(false);

  const handleSimulateSpike = () => {
    setSimulatedSpike(true);
    setTic101Val(188.5);
    setTimeout(() => {
      setSimulatedSpike(false);
    }, 8000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0f1d] border-l border-white/[0.08] text-slate-200 overflow-hidden font-sans">
      {/* Tab Navigation Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0c1220] px-2 py-1.5">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar font-mono text-xs">
          {[
            { id: "telemetry", label: "DCS Telemetry", icon: <Activity className="h-3.5 w-3.5 text-cyan-400" /> },
            { id: "graph", label: "Agent DAG", icon: <GitFork className="h-3.5 w-3.5 text-indigo-400" /> },
            { id: "terminal", label: "Shell", icon: <Terminal className="h-3.5 w-3.5 text-emerald-400" /> },
            { id: "deliverable", label: "PTW Preview", icon: <FileText className="h-3.5 w-3.5 text-amber-400" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-xs ${
                activeTab === tab.id
                  ? "bg-slate-800 text-white font-semibold border border-white/[0.1] shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: DCS Telemetry */}
        {activeTab === "telemetry" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Target Tag Inspector</span>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-cyan-400">{currentTag}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300 font-normal">
                    Yokogawa DCS
                  </span>
                </div>
              </div>

              <button
                onClick={handleSimulateSpike}
                className="flex items-center gap-1 rounded bg-red-950/40 border border-red-500/40 px-2 py-1 text-[11px] text-red-300 hover:bg-red-900/40 transition-colors"
                title="Inject synthetic temperature anomaly to test AI alarms"
              >
                <Zap className="h-3 w-3 text-red-400" />
                <span>Simulate Trip</span>
              </button>
            </div>

            {/* Sparkline & Values Card */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0c1424] p-4 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-slate-400">TIC-101 OH Vapor Temp:</span>
                <span className={`text-xl font-bold ${tic101Val > 175.0 ? "text-red-400 animate-pulse" : "text-emerald-400"}`}>
                  {tic101Val} °C
                </span>
              </div>

              {/* High-Performance Analog Bar Gauge */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0°C</span>
                  <span className="text-emerald-400">Normal (140-170)</span>
                  <span className="text-red-400 font-bold">Limit: 175°C</span>
                  <span>220°C</span>
                </div>
                <div className="relative h-3 w-full rounded bg-slate-900 overflow-hidden border border-white/[0.08]">
                  {/* Normal band */}
                  <div className="absolute left-[63%] w-[14%] h-full bg-emerald-500/20 border-x border-emerald-500/40" />
                  {/* Alarm threshold */}
                  <div className="absolute left-[79%] w-0.5 h-full bg-red-500 z-10" />
                  {/* Actual PV bar */}
                  <div 
                    className={`h-full transition-all duration-500 ${tic101Val > 175 ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" : "bg-cyan-500"}`}
                    style={{ width: `${Math.min(100, Math.max(0, (tic101Val / 220) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Sparkline Visual Simulation */}
              <div className="pt-2 border-t border-white/[0.06]">
                <div className="text-[10px] text-slate-500 mb-1 flex justify-between">
                  <span>30-Minute Real-Time Trend</span>
                  <span className="text-cyan-400 font-semibold">Sampling: 1.0s</span>
                </div>
                <div className="h-16 w-full flex items-end gap-1 px-1 py-1 rounded bg-[#070b14] border border-white/[0.05]">
                  {[35, 38, 42, 40, 44, 46, 45, 48, 52, 50, 56, 62, 70, 78, 85, 82, 88, 92, 94].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t transition-all ${
                        h > 80 ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" : h > 60 ? "bg-amber-400" : "bg-cyan-500/70"
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Other Loop Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-white/[0.08] bg-[#0c1424] p-3">
                <span className="text-[10px] text-slate-500">FIC-102 (Crude Feed)</span>
                <div className="text-sm font-bold text-white mt-1">{fic102Val} m³/h</div>
                <span className="text-[10px] text-emerald-400 font-semibold">[GOOD]</span>
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-[#0c1424] p-3">
                <span className="text-[10px] text-slate-500">PIC-104 (OH Press)</span>
                <div className="text-sm font-bold text-amber-400 mt-1">{pic104Val} bar</div>
                <span className="text-[10px] text-amber-400 font-semibold">[HIGH]</span>
              </div>
            </div>

            {/* SIS ESD Interlock Safety Envelope Card */}
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3.5 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="font-bold text-slate-100 uppercase text-xs">Deterministic Safety Envelope</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                Triconex SIS hardware interlock I-101 prevents AI execution from exceeding 18.5 bar relief ceiling. Hardware overrides AI commands automatically.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: Agent DAG (LangGraph) */}
        {activeTab === "graph" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Multi-Agent State Graph</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                LangGraph StateGraph
              </span>
            </div>

            {/* Interactive Graph Diagram */}
            <div className="rounded-xl border border-white/[0.08] bg-[#070b14] p-4 space-y-3 relative overflow-hidden industrial-grid">
              {/* Node 1: Supervisor */}
              <div className="rounded-lg border border-blue-500/40 bg-blue-950/30 p-2.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-400 font-semibold">NODE: ROUTER</span>
                  <div className="font-bold text-white text-xs">Supervisor Agent</div>
                </div>
                <span className="h-2 w-2 rounded-full bg-blue-400" />
              </div>

              {/* Edge */}
              <div className="w-0.5 h-4 bg-slate-700 mx-auto" />

              {/* Node 2: Operations & Safety Split */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-cyan-500/40 bg-cyan-950/30 p-2.5">
                  <span className="text-[10px] text-cyan-400 font-semibold">TELEMETRY</span>
                  <div className="font-bold text-white text-xs">Operations Agent</div>
                  <span className="text-[10px] text-emerald-400">Active (18ms)</span>
                </div>

                <div className="rounded-lg border border-amber-500/40 bg-amber-950/30 p-2.5">
                  <span className="text-[10px] text-amber-400 font-semibold">GATEKEEPER</span>
                  <div className="font-bold text-white text-xs">Safety HSE Agent</div>
                  <span className="text-[10px] text-amber-300">Breakpoint Active</span>
                </div>
              </div>

              {/* Edge */}
              <div className="w-0.5 h-4 bg-slate-700 mx-auto" />

              {/* Node 3: Deliverable & Action Sandbox */}
              <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-2.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 font-semibold">SANDBOX EXEC</span>
                  <div className="font-bold text-white text-xs">Deliverable Compiler (DOCX)</div>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* State Channel Inspector */}
            <div className="rounded-lg border border-white/[0.08] bg-[#0c1424] p-3 text-[11px] space-y-1.5">
              <span className="text-slate-500 font-semibold">Thread State (JSON Channels):</span>
              <pre className="text-cyan-300 bg-slate-950/80 p-2 rounded text-[10px] overflow-x-auto">
{JSON.stringify({
  "session_id": "MRPL-CDU-9021",
  "active_unit": "CDU-1",
  "isolation_points": ["V-201", "V-204", "VD-201"],
  "ptw_permit_status": "AWAITING_APPROVAL",
  "airgap_enforced": true
}, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: Terminal / Shell */}
        {activeTab === "terminal" && (
          <div className="h-full flex flex-col space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Sandboxed Execution Shell (MicroVM)</span>
              <span className="text-emerald-400 font-semibold">AIRGAP SECURED</span>
            </div>

            <div className="flex-1 rounded-xl border border-white/[0.08] bg-[#050811] p-3 text-[11px] text-slate-300 overflow-y-auto space-y-1.5 min-h-[300px]">
              <div className="text-slate-500"># FastMCP Industrial Bus Initialized</div>
              <div className="text-cyan-400">$ fastmcp connect --transport=stdio dcs_bridge.py</div>
              <div className="text-emerald-400">&gt; Connected to Yokogawa CENTUM VP (24 nodes subscribed)</div>
              <div className="text-cyan-400">$ python -m indra.physics.hydraulic_calc --pipe=12_INCH_SCH40</div>
              <div className="text-slate-300">&gt; Delta P: 0.42 bar/100m (Darcy-Weisbach)</div>
              <div className="text-slate-300">&gt; Velocity: 2.14 m/s (Within API RP 14E limits)</div>
              <div className="text-cyan-400">$ fastmcp query sap_pm --equipment=P-201A</div>
              <div className="text-amber-300">&gt; Notification #IW21-4001928: Mech seal leakage (Priority 2)</div>
              <div className="text-emerald-400">&gt; Status: All commands verified by non-AI physics barrier.</div>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="text-emerald-400">indra@airgap-node:~$</span>
                <span className="h-3 w-1.5 bg-cyan-400 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Deliverable Preview (PTW) */}
        {activeTab === "deliverable" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-base font-bold text-white">PTW-8842 Preview</span>
                <div className="text-[10px] text-slate-400">OISD-STD-105 Cold Work Permit</div>
              </div>
              <button 
                onClick={() => alert("Downloading OISD-STD-105 formatted document: PTW-8842.docx")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export DOCX</span>
              </button>
            </div>

            {/* Document Mock Viewer */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0c1424] p-4 text-[11px] font-sans space-y-3 text-slate-300">
              <div className="border-b border-white/[0.08] pb-2 font-mono font-bold text-white text-xs flex justify-between">
                <span>MANGALORE REFINERY & PETROCHEMICALS LTD.</span>
                <span className="text-cyan-400">FORM: CW-01</span>
              </div>

              <div>
                <strong className="text-slate-400 font-mono text-[10px]">EQUIPMENT TAG:</strong>
                <div className="text-white font-mono font-bold">P-201A (Atmospheric Residue Bottoms Pump)</div>
              </div>

              <div>
                <strong className="text-slate-400 font-mono text-[10px]">MECHANICAL ISOLATIONS (POSITIVE BLINDING):</strong>
                <ul className="list-disc pl-4 mt-1 font-mono text-slate-200 text-[10px] space-y-0.5">
                  <li>Suction Isolation Valve V-201: CLOSED & LOCKED</li>
                  <li>Discharge Isolation Valve V-204: CLOSED & LOCKED</li>
                  <li>Casing Drain VD-201: OPEN TO SOUR SLOP</li>
                </ul>
              </div>

              <div className="rounded bg-emerald-950/30 border border-emerald-500/30 p-2 text-emerald-300 font-mono text-[10px]">
                GAS TEST VERIFIED: LEL: 0.0% | H2S: 0 ppm | O2: 20.9%
              </div>

              <div className="border-t border-white/[0.08] pt-2 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>ISSUED BY: INDRA AI HSE AGENT</span>
                <span>SIGN-OFF: REQUIRED</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
