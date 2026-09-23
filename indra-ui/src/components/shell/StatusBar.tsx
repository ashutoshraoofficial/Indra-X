"use client";

import React, { useState, useEffect } from "react";
import { Activity, Cpu, ShieldCheck, Database, HardDrive, TerminalSquare, Radio, CheckCircle2 } from "lucide-react";

export function StatusBar() {
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(18);
  const [tps, setTps] = useState(42.4);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) +
          " • " +
          now.toLocaleTimeString("en-IN", { hour12: false }) +
          " IST"
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(16 + Math.random() * 6));
      setTps(parseFloat((41 + Math.random() * 3).toFixed(1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-8 w-full items-center justify-between border-t border-white/[0.08] bg-[#070b14]/95 px-3 md:px-5 text-[11px] font-mono text-slate-400 select-none">
      {/* Left side: Node Health & Protocols */}
      <div className="flex items-center gap-4">
        {/* Gateway WebSocket */}
        <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors cursor-pointer">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-semibold">GATEWAY :18789</span>
        </div>

        <div className="h-3 w-px bg-white/[0.1]" />

        {/* OPC-UA DCS Link */}
        <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
          <Activity className="h-3 w-3 text-cyan-400" />
          <span>OPC-UA:</span>
          <span className="text-cyan-300 font-bold">{latency}ms</span>
          <span className="text-[10px] text-emerald-400">[GOOD]</span>
        </div>

        <div className="h-3 w-px bg-white/[0.1] hidden sm:block" />

        {/* LLM Engine */}
        <div className="hidden sm:flex items-center gap-1.5 hover:text-slate-200 transition-colors">
          <Cpu className="h-3 w-3 text-indigo-400" />
          <span>Gemma 4 12B:</span>
          <span className="text-indigo-300 font-bold">{tps} t/s</span>
          <span className="text-[10px] text-slate-500">(vLLM Local)</span>
        </div>

        <div className="h-3 w-px bg-white/[0.1] hidden md:block" />

        {/* Merkle Ledger Block */}
        <div className="hidden md:flex items-center gap-1.5 hover:text-slate-200 transition-colors">
          <Database className="h-3 w-3 text-amber-400" />
          <span>MERKLE BLOCK:</span>
          <span className="text-amber-300 font-bold">#4,198</span>
          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
        </div>
      </div>

      {/* Right side: Air-Gap & Shift Details */}
      <div className="flex items-center gap-4">
        {/* Air-Gap Verified Pill */}
        <div className="flex items-center gap-1.5 rounded bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 text-emerald-300">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span className="font-bold tracking-wider text-[10px] uppercase">
            100% Air-Gapped (0 Egress)
          </span>
        </div>

        <div className="h-3 w-px bg-white/[0.1] hidden lg:block" />

        {/* Shift Details */}
        <div className="hidden lg:flex items-center gap-2 text-slate-300">
          <span className="text-slate-500">SHIFT:</span>
          <span className="text-cyan-300 font-semibold">B (AFTERNOON)</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">OPERATOR:</span>
          <span className="text-slate-200 font-semibold">Er. Ashutosh Rao</span>
        </div>

        <div className="h-3 w-px bg-white/[0.1] hidden xl:block" />

        {/* Real-time Clock */}
        <div className="hidden xl:block text-slate-400 font-medium">
          {time}
        </div>
      </div>
    </div>
  );
}
