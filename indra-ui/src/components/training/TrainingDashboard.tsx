"use client";

import React, { useState } from "react";
import { 
  BrainCircuit, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Sparkles, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  LineChart,
  HardDrive,
  BarChart3
} from "lucide-react";

export function TrainingDashboard() {
  const [baseModel, setBaseModel] = useState("gemma-4-12b");
  const [loraRank, setLoraRank] = useState(16);
  const [epochs, setEpochs] = useState(3);
  const [isTraining, setIsTraining] = useState(false);
  const [currentLoss, setCurrentLoss] = useState(1.42);

  const datasets = [
    {
      name: "MRPL_CDU_Standard_Operating_Procedures_2026.jsonl",
      entries: "4,280 QA Pairs",
      size: "14.2 MB",
      domain: "Refinery Operations",
      status: "Ready",
    },
    {
      name: "OISD_STD_105_112_152_Statutory_Compliance.jsonl",
      entries: "2,150 Rules",
      size: "8.6 MB",
      domain: "Process Safety & Permits",
      status: "Ready",
    },
    {
      name: "SAP_PM_Equipment_Failure_Root_Causes_Historical.jsonl",
      entries: "11,840 Records",
      size: "34.1 MB",
      domain: "Maintenance & Diagnostics",
      status: "Ready",
    },
  ];

  const handleStartTraining = () => {
    setIsTraining(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentLoss(prev => parseFloat((Math.max(0.38, prev - 0.08 + (Math.random() - 0.5) * 0.02)).toFixed(3)));
      if (step >= 12) {
        clearInterval(interval);
        setIsTraining(false);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#080c15] overflow-y-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 font-mono">
                SOVEREIGN MODEL TRAINING & FINE-TUNING
              </span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1 font-sans">
            On-premise QLoRA parameter-efficient adaptation with 3-tier safety evaluation (No cloud egress).
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 rounded-lg bg-slate-900 border border-white/[0.08] px-3 py-1.5 text-slate-300">
            <HardDrive className="h-4 w-4 text-cyan-400" />
            <span>VRAM: <strong className="text-emerald-400">19.4 / 24.0 GB</strong> (RTX 4090)</span>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Config & Datasets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: QLoRA Fine-Tuning Setup */}
        <div className="lg:col-span-6 flex flex-col rounded-xl border border-white/[0.08] bg-[#0c1220]/80 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-cyan-400" />
              <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                QLoRA Hyperparameters Cockpit
              </h2>
            </div>
            <span className="text-[10px] font-mono rounded bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 text-cyan-300">
              4-BIT NF4 QUANTIZED
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {/* Base Model Selector */}
            <div>
              <label className="text-slate-400 mb-1.5 block">Foundation Model:</label>
              <select
                value={baseModel}
                onChange={(e) => setBaseModel(e.target.value)}
                className="w-full rounded-lg border border-white/[0.1] bg-[#070b14] px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
              >
                <option value="gemma-4-12b">Google Gemma 4 (12B Instruct) — Default Reasoning</option>
                <option value="qwen-2.5-14b">Qwen 2.5 Industrial (14B) — Specialized Engineering</option>
                <option value="deepseek-r1-14b">DeepSeek R1 Distill (14B) — Complex Root Cause</option>
                <option value="gemma-4-e4b">Google Gemma 4 Edge (4B) — Ultra-Low Latency</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 mb-1.5 block">LoRA Rank (r): {loraRank}</label>
                <input
                  type="range"
                  min="8"
                  max="64"
                  step="8"
                  value={loraRank}
                  onChange={(e) => setLoraRank(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <label className="text-slate-400 mb-1.5 block">Training Epochs: {epochs}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={epochs}
                  onChange={(e) => setEpochs(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>

            {/* Live Loss Card */}
            <div className="rounded-xl border border-white/[0.08] bg-[#070b14] p-4 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Current Cross-Entropy Loss:</span>
                <span className={`text-xl font-bold ${isTraining ? "text-cyan-400 animate-pulse" : "text-emerald-400"}`}>
                  {currentLoss}
                </span>
              </div>
              <div className="h-12 w-full flex items-end gap-1 px-1 py-1 rounded bg-black/40 border border-white/[0.05]">
                {[1.6, 1.52, 1.45, 1.38, 1.25, 1.15, 0.98, 0.84, 0.72, 0.65, 0.52, 0.44].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-cyan-400 opacity-80"
                    style={{ height: `${(v / 1.6) * 100}%` }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleStartTraining}
              disabled={isTraining}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                isTraining
                  ? "bg-amber-600/30 border border-amber-500/40 text-amber-300"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg"
              }`}
            >
              {isTraining ? (
                <>
                  <RotateCcw className="h-4 w-4 animate-spin text-amber-300" />
                  <span>Optimizing Weights on Local GPU...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Launch Sovereign QLoRA Fine-Tuning</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right 6 Cols: Datasets & Safety Evaluation */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          {/* Datasets Library */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0c1220]/80 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-indigo-400" />
                <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Curated Domain Datasets
                </h2>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Total: 18,270 pairs</span>
            </div>

            <div className="space-y-2.5">
              {datasets.map((ds, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-white/[0.06] bg-slate-900/40 p-3 font-mono text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-slate-200 truncate max-w-[280px]">{ds.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {ds.domain} • <span className="text-cyan-400">{ds.entries}</span> ({ds.size})
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    {ds.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Tier Safety Evaluator Benchmark */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0c1220]/80 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  3-Tier Safety Verification
                </h2>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                100% HARDWARE ENVELOPE PASS
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/50 border border-white/[0.05]">
                <div>
                  <span className="text-slate-300 font-bold">1. RAG Grounding (RAGAS)</span>
                  <div className="text-[11px] text-slate-400">Zero hallucination citation verification</div>
                </div>
                <span className="text-emerald-400 font-bold text-sm">98.4%</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/50 border border-white/[0.05]">
                <div>
                  <span className="text-slate-300 font-bold">2. Entity Integrity Rate (EIR)</span>
                  <div className="text-[11px] text-slate-400">Exact P&ID tag match against plant registry</div>
                </div>
                <span className="text-emerald-400 font-bold text-sm">100.0%</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/50 border border-white/[0.05]">
                <div>
                  <span className="text-slate-300 font-bold">3. Safety Adversarial Suite</span>
                  <div className="text-[11px] text-slate-400">250+ red-team prompts attempting safety bypass</div>
                </div>
                <span className="text-emerald-400 font-bold text-sm">0 Breaches</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
