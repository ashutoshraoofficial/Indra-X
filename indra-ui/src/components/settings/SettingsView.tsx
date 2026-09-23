"use client";

import React, { useState } from "react";
import { Settings, Cpu, HardDrive, ShieldCheck, WifiOff, Terminal, Save, CheckCircle2, RotateCcw } from "lucide-react";

export function SettingsView() {
  const [ollamaUrl, setOllamaUrl] = useState("http://127.0.0.1:11434");
  const [model, setModel] = useState("gemma4:12b");
  const [opcuaUrl, setOpcuaUrl] = useState("opc.tcp://192.168.1.100:4840");
  const [airgapEnforced, setAirgapEnforced] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col h-full bg-[#080c15] overflow-y-auto p-4 md:p-6 space-y-6 font-sans">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
                SYSTEM CONFIGURATION & OT GATEWAY
              </span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Air-gapped node parameters, local Ollama runtime endpoints, and OPC-UA DCS connectivity.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all shadow-md"
        >
          {saved ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Save className="h-4 w-4" />}
          <span>{saved ? "Configuration Saved!" : "Save Node Configuration"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* Card 1: Local Model Inference */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0c1424] p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 text-cyan-400 font-bold">
            <Cpu className="h-4 w-4" />
            <span className="text-sm">Local Model Runtime (Ollama / vLLM)</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 mb-1 block">Ollama Base URL (Air-Gapped):</label>
              <input
                type="text"
                value={ollamaUrl}
                onChange={(e) => setOllamaUrl(e.target.value)}
                className="w-full rounded-lg border border-white/[0.1] bg-[#070b14] px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-slate-400 mb-1 block">Primary Active Model:</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-lg border border-white/[0.1] bg-[#070b14] px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
              >
                <option value="gemma4:12b">Google Gemma 4 (12B Instruct) — Default</option>
                <option value="gemma4:e4b">Google Gemma 4 Edge (4B) — Fast Fallback</option>
                <option value="qwen2.5:14b">Qwen 2.5 Industrial (14B)</option>
                <option value="deepseek-r1:14b">DeepSeek R1 (14B Distill)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 mb-1 block">Context Window Allocation:</label>
              <input
                type="text"
                disabled
                value="32,768 Tokens (Extended Industrial KV Cache)"
                className="w-full rounded-lg border border-white/[0.05] bg-[#070b14]/50 px-3 py-2 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Card 2: OT SCADA / OPC-UA */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0c1424] p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 text-emerald-400 font-bold">
            <HardDrive className="h-4 w-4" />
            <span className="text-sm">OPC-UA DCS Endpoint (Level 3 OT)</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 mb-1 block">OPC-UA Server Endpoint:</label>
              <input
                type="text"
                value={opcuaUrl}
                onChange={(e) => setOpcuaUrl(e.target.value)}
                className="w-full rounded-lg border border-white/[0.1] bg-[#070b14] px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-slate-400 mb-1 block">Security Policy:</label>
              <input
                type="text"
                disabled
                value="Basic256Sha256 • Sign & Encrypt (Mandatory)"
                className="w-full rounded-lg border border-white/[0.05] bg-[#070b14]/50 px-3 py-2 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-400">Strict Air-Gap Enforced:</span>
              <button
                onClick={() => setAirgapEnforced(!airgapEnforced)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  airgapEnforced
                    ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                    : "bg-red-950/60 border border-red-500/40 text-red-300"
                }`}
              >
                {airgapEnforced ? "AIR-GAP ACTIVE (0 EGRESS)" : "UNRESTRICTED"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
