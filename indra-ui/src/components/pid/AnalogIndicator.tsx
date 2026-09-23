"use client";

import React from "react";

interface AnalogIndicatorProps {
  tag: string;
  pv: number; // Process Variable
  sp: number; // Setpoint
  min: number; // Scale Min
  max: number; // Scale Max
  ll?: number; // Low Low Alarm
  l?: number; // Low Alarm
  h?: number; // High Alarm
  hh?: number; // High High Alarm
  units: string;
}

export function AnalogIndicator({
  tag,
  pv,
  sp,
  min,
  max,
  ll = 10,
  l = 20,
  h = 80,
  hh = 90,
  units,
}: AnalogIndicatorProps) {
  // Normalize value to percentage
  const getPercent = (val: number) => Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));

  const pvPercent = getPercent(pv);
  const spPercent = getPercent(sp);
  const llPercent = getPercent(ll);
  const lPercent = getPercent(l);
  const hPercent = getPercent(h);
  const hhPercent = getPercent(hh);

  // Determine state color based on ISA-101
  let statusColor = "bg-isa-slate"; // Normal
  let borderColor = "border-isa-slate";
  let textColor = "text-isa-slate";

  if (pv >= hh || pv <= ll) {
    statusColor = "bg-isa-crit"; // Critical
    borderColor = "border-isa-crit";
    textColor = "text-isa-crit";
  } else if (pv >= h || pv <= l) {
    statusColor = "bg-isa-high"; // High/Low
    borderColor = "border-isa-high";
    textColor = "text-isa-high";
  }

  return (
    <div className="flex flex-col w-20 items-center justify-center bg-background border border-isa-slate/30 p-2 rounded-sm select-none">
      <div className="text-[10px] font-bold text-foreground mb-1">{tag}</div>
      <div className={`text-xs font-mono font-semibold ${textColor}`}>
        {pv.toFixed(1)}
      </div>

      <div className="relative h-32 w-4 mt-2 bg-muted border border-isa-slate/40 rounded-sm">
        {/* Normal Operating Range Band */}
        <div 
          className="absolute w-full bg-isa-slate/20 right-0 left-0"
          style={{ bottom: `${lPercent}%`, height: `${hPercent - lPercent}%` }}
        />

        {/* Alarm Limits (Ticks) */}
        <div className="absolute w-full h-[1px] bg-isa-crit z-10" style={{ bottom: `${hhPercent}%` }} />
        <div className="absolute w-full h-[1px] bg-isa-high z-10" style={{ bottom: `${hPercent}%` }} />
        <div className="absolute w-full h-[1px] bg-isa-high z-10" style={{ bottom: `${lPercent}%` }} />
        <div className="absolute w-full h-[1px] bg-isa-crit z-10" style={{ bottom: `${llPercent}%` }} />

        {/* SP Marker */}
        <div 
          className="absolute w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-foreground z-20"
          style={{ bottom: `calc(${spPercent}% - 4px)`, right: "100%" }}
        />

        {/* PV Bar */}
        <div 
          className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out ${statusColor}`}
          style={{ height: `${pvPercent}%` }}
        />
      </div>

      <div className="text-[10px] text-muted-foreground mt-1">{units}</div>
    </div>
  );
}
