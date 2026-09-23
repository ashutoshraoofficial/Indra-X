"use client";

import React, { useState } from "react";
import { AlertTriangle, BellRing, Sparkles, Volume2, VolumeX, CheckCircle, ChevronDown, ChevronUp, Flame } from "lucide-react";

interface AlarmBannerProps {
  onSelectAlarm?: (alarm: { tag: string; desc: string; pv: string; limit: string }) => void;
  onDiagnoseAI?: (tag: string) => void;
}

export function AlarmBanner({ onSelectAlarm, onDiagnoseAI }: AlarmBannerProps) {
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [acked, setAcked] = useState<string[]>([]);

  const alarms = [
    {
      id: "alm-1",
      tag: "TIC-101",
      unit: "CDU-1",
      desc: "COLUMN C-101 OVERHEAD VAPOR TEMP HI-HI",
      value: "182.4 °C",
      limit: "175.0 °C",
      priority: "CRIT",
      time: "01:54:12 IST",
      delta: "+7.4 °C",
    },
    {
      id: "alm-2",
      tag: "P-201A",
      unit: "HCU-1",
      desc: "BOTTOMS PUMP BEARING VIBRATION ABNORMAL",
      value: "8.6 mm/s",
      limit: "7.1 mm/s",
      priority: "HIGH",
      time: "01:52:40 IST",
      delta: "+1.5 mm/s",
    },
    {
      id: "alm-3",
      tag: "TK-305",
      unit: "OF&S",
      desc: "SOUR WATER STRIPPER FEED TANK LEVEL DEV",
      value: "88.2 %",
      limit: "85.0 %",
      priority: "MED",
      time: "01:48:19 IST",
      delta: "+3.2 %",
    },
  ];

  const handleAck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!acked.includes(id)) {
      setAcked([...acked, id]);
    }
  };

  const handleAckAll = () => {
    setAcked(alarms.map(a => a.id));
  };

  const unackedCount = alarms.filter(a => !acked.includes(a.id)).length;

  return (
    <div className="relative z-30 border-b border-white/[0.08] bg-[#0b101c]/95 backdrop-blur-md">
      {/* Primary Strip */}
      <div className="flex h-11 w-full items-center justify-between px-3 md:px-5">
        {/* Left: Alarm Status Pill & Active Alarms */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2 rounded border border-red-500/30 bg-red-950/40 px-2 py-0.5 text-xs font-mono font-bold text-red-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            <span className="tracking-wider">ISA-18.2</span>
            <span className="rounded bg-red-500/20 px-1 py-0.2 text-[10px] text-red-300">
              {unackedCount} ACTIVE
            </span>
          </div>

          <div className="h-4 w-px bg-white/[0.1] hidden md:block" />

          {/* Alarm Cards Carousel */}
          <div className="flex items-center gap-2">
            {alarms.map((alarm) => {
              const isAcked = acked.includes(alarm.id);
              return (
                <div
                  key={alarm.id}
                  onClick={() => onSelectAlarm && onSelectAlarm({ tag: alarm.tag, desc: alarm.desc, pv: alarm.value, limit: alarm.limit })}
                  className={`group flex items-center gap-2.5 rounded border px-2.5 py-1 text-xs font-mono cursor-pointer transition-all ${
                    isAcked
                      ? "border-slate-800 bg-slate-900/40 opacity-60 text-slate-400"
                      : alarm.priority === "CRIT"
                      ? "border-red-500/40 bg-red-950/30 text-slate-100 hover:border-red-400 hover:bg-red-900/30 shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                      : alarm.priority === "HIGH"
                      ? "border-amber-500/40 bg-amber-950/20 text-slate-200 hover:border-amber-400"
                      : "border-orange-500/30 bg-orange-950/20 text-slate-300"
                  }`}
                >
                  {/* Shape Badge per ISA-18.2 */}
                  {alarm.priority === "CRIT" && (
                    <div className="flex h-4 w-9 items-center justify-center rounded-[2px] bg-red-600 text-[9px] font-black text-white tracking-widest shadow-sm">
                      CRIT
                    </div>
                  )}
                  {alarm.priority === "HIGH" && (
                    <div
                      className="flex h-4 w-9 items-center justify-center bg-amber-500 text-[9px] font-black text-black tracking-widest"
                      style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                    >
                      <span className="mt-0.5">HIGH</span>
                    </div>
                  )}
                  {alarm.priority === "MED" && (
                    <div
                      className="flex h-4 w-9 items-center justify-center bg-orange-500 text-[9px] font-black text-black tracking-widest"
                      style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                    >
                      MED
                    </div>
                  )}

                  <span className="font-bold text-cyan-400 tracking-tight">{alarm.tag}</span>
                  <span className="text-white/40 hidden lg:inline">|</span>
                  <span className="truncate max-w-[200px] text-slate-200 hidden lg:inline">{alarm.desc}</span>
                  <span className="font-semibold text-rose-300 bg-black/40 px-1 rounded">{alarm.value}</span>

                  {/* AI Quick Diagnosis Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDiagnoseAI && onDiagnoseAI(alarm.tag);
                    }}
                    title="Run Multi-Agent Root Cause Analysis"
                    className="ml-1 hidden items-center gap-1 rounded bg-cyan-950/70 border border-cyan-500/40 px-1.5 py-0.5 text-[10px] text-cyan-300 group-hover:flex hover:bg-cyan-900/80 transition-colors"
                  >
                    <Sparkles className="h-2.5 w-2.5 text-cyan-400 animate-spin" />
                    <span>RCA</span>
                  </button>

                  {!isAcked && (
                    <button
                      onClick={(e) => handleAck(alarm.id, e)}
                      title="Acknowledge alarm"
                      className="rounded hover:bg-white/10 p-0.5 text-slate-400 hover:text-white"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <div className="hidden xl:flex items-center gap-2 border-l border-white/[0.08] pl-3 text-[11px]">
            <span className="text-slate-500">FLOOD RATE:</span>
            <span className="text-emerald-400 font-semibold">1.4 / min (NORMAL)</span>
          </div>

          <button
            onClick={() => setMuted(!muted)}
            className="flex items-center gap-1 rounded px-2 py-1 text-slate-400 hover:bg-white/[0.06] hover:text-slate-200 transition-colors"
            title={muted ? "Unmute Alarm Horn" : "Mute Alarm Horn"}
          >
            {muted ? <VolumeX className="h-3.5 w-3.5 text-rose-400" /> : <Volume2 className="h-3.5 w-3.5 text-slate-400" />}
          </button>

          <button
            onClick={handleAckAll}
            disabled={unackedCount === 0}
            className={`rounded border px-2.5 py-1 text-[11px] font-bold tracking-wider transition-all ${
              unackedCount > 0
                ? "border-red-500/40 bg-red-600/20 text-red-300 hover:bg-red-600/30 hover:text-white shadow-sm"
                : "border-slate-800 bg-slate-900/50 text-slate-500 cursor-not-allowed"
            }`}
          >
            ACK ALL
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors"
            title={expanded ? "Collapse alarm drawer" : "Expand alarm list"}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Drawer */}
      {expanded && (
        <div className="border-t border-white/[0.08] bg-[#070b14]/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-red-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                Active Process Alarms Log • EEMUA 191 Classification
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Yokogawa CENTUM VP DCS • Unit CDU-1 & HCU-1
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            {alarms.map((alarm) => (
              <div
                key={alarm.id}
                className="flex flex-col justify-between rounded border border-white/[0.07] bg-slate-900/40 p-3 font-mono text-xs hover:border-cyan-500/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-400 text-sm">{alarm.tag}</span>
                    <span className="text-[10px] text-slate-400">{alarm.time}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 font-sans">{alarm.desc}</div>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/[0.05]">
                  <div className="text-[11px]">
                    <span className="text-slate-500">PV: </span>
                    <span className="text-red-400 font-bold">{alarm.value}</span>
                    <span className="text-slate-500 ml-2">SP: {alarm.limit}</span>
                  </div>
                  <button
                    onClick={() => onDiagnoseAI && onDiagnoseAI(alarm.tag)}
                    className="flex items-center gap-1 text-[10px] bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded hover:bg-cyan-900/60"
                  >
                    <Sparkles className="h-2.5 w-2.5 text-cyan-400" />
                    AI Diagnosis
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
