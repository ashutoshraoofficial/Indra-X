"use client";

import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, AlertTriangle, AlertCircle, WifiOff, Database, Lock, Terminal, ShieldAlert } from "lucide-react";
import { AirGapVerifier } from "./AirGapVerifier";
import { AuditTrail } from "./AuditTrail";

export function SecurityDashboard() {
  const [subTab, setSubTab] = useState<"compliance" | "airgap" | "audit">("compliance");

  const complianceStandards = [
    {
      name: "IEC 62443-3-3",
      desc: "Foundational Security Requirements (FR1–FR7) for Industrial Automation & Control Systems (IACS)",
      status: "compliant",
      score: "100%",
    },
    {
      name: "NIST SP 800-82 Rev 3",
      desc: "Guide to Industrial Control Systems (ICS) & OT Network Security Boundaries",
      status: "compliant",
      score: "100%",
    },
    {
      name: "NIST AI RMF 1.0",
      desc: "Artificial Intelligence Risk Management Framework (Govern, Map, Measure, Manage)",
      status: "compliant",
      score: "96.4%",
    },
    {
      name: "OISD-STD-105",
      desc: "Work Permit System in Petroleum & Petrochemical Plants (Cold, Hot, Confined Space)",
      status: "compliant",
      score: "100%",
    },
    {
      name: "OISD-STD-152",
      desc: "Safety Instrumentation for Process Systems & Emergency Trip Interlocks",
      status: "compliant",
      score: "100%",
    },
    {
      name: "BIS IS/ISO/IEC 42001",
      desc: "Artificial Intelligence Management System (AIMS) National Standards",
      status: "compliant",
      score: "98.0%",
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#080c15] overflow-y-auto p-4 md:p-6 space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 font-mono">
                SECURITY, AIR-GAP & MERKLE AUDIT
              </span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Defense-in-depth security, non-AI physical safety bounds, and cryptographic tamper-evident audit trails.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900/90 border border-white/[0.08] font-mono text-xs">
          {[
            { id: "compliance", label: "Compliance Matrix", icon: <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> },
            { id: "airgap", label: "Air-Gap Packet Verifier", icon: <WifiOff className="h-3.5 w-3.5 text-cyan-400" /> },
            { id: "audit", label: "Merkle Hash Ledger", icon: <Database className="h-3.5 w-3.5 text-amber-400" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSubTab(item.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all ${
                subTab === item.id
                  ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content */}
      {subTab === "airgap" && <AirGapVerifier />}
      {subTab === "audit" && <AuditTrail />}

      {subTab === "compliance" && (
        <div className="space-y-6">
          {/* Top 3 Summary Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
              <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
                <span>AIR-GAP ENFORCEMENT</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">0 Outbound</div>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                Isolated industrial DMZ Level 3.5. Zero cloud API calls or DNS requests allowed.
              </p>
            </div>

            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
              <div className="flex items-center justify-between text-cyan-400 font-bold mb-1">
                <span>SAFETY ENVELOPE GATE</span>
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">SIL-3 Armed</div>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                Non-AI deterministic C++ guardrail enforces hard physical limits on relief valves & heaters.
              </p>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
              <div className="flex items-center justify-between text-amber-400 font-bold mb-1">
                <span>DUAL-LLM PROMPT GUARD</span>
                <Lock className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">0 Injections</div>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                Quarantine LLM sanitizes raw input payloads before passing to privileged inference tier.
              </p>
            </div>
          </div>

          {/* Compliance Matrix Table */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0c1220]/80 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                Industrial & PSU Regulatory Conformance Standards
              </h2>
              <span className="text-xs font-mono text-emerald-400 font-semibold">ALL MANDATES SATISFIED</span>
            </div>

            <div className="space-y-3">
              {complianceStandards.map((std, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-white/[0.06] bg-slate-900/40 hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-sm text-cyan-300">{std.name}</span>
                    <span className="text-xs text-slate-400 font-sans mt-0.5">{std.desc}</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-xs text-slate-300">{std.score}</span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Certified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
