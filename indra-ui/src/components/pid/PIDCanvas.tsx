"use client";

import React, { useState, useEffect } from "react";
import { AnalogIndicator } from "./AnalogIndicator";
import { 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  AlertCircle, 
  Layers, 
  FileSpreadsheet, 
  Upload, 
  Filter, 
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { PIDUploader } from "./PIDUploader";

export function PIDCanvas() {
  const [pv1, setPv1] = useState(182.4);
  const [pv2, setPv2] = useState(142.8);
  const [pv3, setPv3] = useState(14.82);
  const [selectedTag, setSelectedTag] = useState<string | null>("C-101");
  const [activeSubView, setActiveSubView] = useState<"canvas" | "schedule" | "upload">("canvas");
  const [zoomLevel, setZoomLevel] = useState(100);

  // Live fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setPv1(prev => parseFloat((prev + (Math.random() - 0.48) * 0.3).toFixed(1)));
      setPv2(prev => parseFloat((prev + (Math.random() - 0.5) * 0.6).toFixed(1)));
      setPv3(prev => parseFloat((prev + (Math.random() - 0.5) * 0.04).toFixed(2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const equipmentDetails: Record<string, any> = {
    "C-101": {
      name: "Atmospheric Distillation Column",
      tag: "C-101",
      service: "Crude Fractionation",
      designPress: "18.5 bar",
      designTemp: "380 °C",
      trays: "48 Sieve Trays",
      material: "Clad Carbon Steel (316L)",
      lastMaint: "12-Jan-2026 (Annual Turnaround)",
      sapWo: "#IW31-904128",
      status: "OPERATIONAL",
    },
    "P-201A": {
      name: "Atmospheric Residue Bottoms Pump",
      tag: "P-201A",
      service: "Atmospheric Residue to DCU",
      designPress: "24.0 bar",
      designTemp: "360 °C",
      type: "Centrifugal API 610 (Between Bearings)",
      vibration: "8.6 mm/s (Warning > 7.1)",
      lastMaint: "24-Aug-2026 (Bearing greasing)",
      sapWo: "#IW21-4001928 (Mechanical Seal Leak)",
      status: "VIBRATION ALERT",
    },
    "TIC-101": {
      name: "Overhead Vapor Temperature Transmitter",
      tag: "TIC-101",
      loop: "C-101 Top Temp Control Loop",
      range: "0 - 220 °C",
      alarmHH: "175.0 °C",
      currentPV: `${pv1} °C`,
      action: "Cascades to Reflux Valve FV-104",
      status: "HI-HI EXCURSION",
    },
    "FV-201": {
      name: "Residue Quench Flow Control Valve",
      tag: "FV-201",
      size: "6 Inch ANSI 300#",
      failAction: "Fail Closed (FC)",
      position: "64.2% Open",
      actuator: "Pneumatic Diaphragm with Smart Positioner",
      status: "GOOD",
    },
  };

  return (
    <div className="flex flex-col h-full bg-[#080c15] relative overflow-hidden font-sans">
      {/* Sub-navigation bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0c1220] px-4 py-2 z-20">
        <div className="flex items-center gap-2 font-mono text-xs">
          {[
            { id: "canvas", label: "P&ID Schematic (ISA-5.1)", icon: <Layers className="h-3.5 w-3.5 text-cyan-400" /> },
            { id: "schedule", label: "Equipment Schedules", icon: <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" /> },
            { id: "upload", label: "Ingest Drawing (OCR/SAHI)", icon: <Upload className="h-3.5 w-3.5 text-indigo-400" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSubView(item.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                activeSubView === item.id
                  ? "bg-blue-600/30 border border-blue-500/50 text-white font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {activeSubView === "canvas" && (
          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="flex items-center bg-slate-900 border border-white/[0.08] rounded-md px-1 py-0.5">
              <button 
                onClick={() => setZoomLevel(prev => Math.max(70, prev - 10))} 
                className="p-1 hover:text-cyan-400 text-slate-300"
                title="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-[10px] text-slate-400 px-2">{zoomLevel}%</span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))} 
                className="p-1 hover:text-cyan-400 text-slate-300"
                title="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => setZoomLevel(100)} 
                className="p-1 hover:text-cyan-400 text-slate-300 border-l border-white/[0.08] ml-1"
                title="Reset Zoom"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search tag (e.g. C-101)..."
                onChange={(e) => {
                  const val = e.target.value.toUpperCase();
                  if (equipmentDetails[val]) setSelectedTag(val);
                }}
                className="h-7 pl-8 pr-3 text-xs rounded-md border border-white/[0.1] bg-[#070b14] text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Viewport */}
      {activeSubView === "upload" && (
        <div className="flex-1 overflow-y-auto p-6">
          <PIDUploader />
        </div>
      )}

      {activeSubView === "schedule" && (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <h2 className="text-base font-mono font-bold text-white uppercase">Auto-Extracted Line & Equipment Schedule</h2>
              <p className="text-xs text-slate-400">Synthesized via SAHI Tiling + YOLO Symbol Detection + PaddleOCR</p>
            </div>
            <button 
              onClick={() => alert("Exporting MRPL standard format Excel schedule...")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700/40 border border-emerald-500/50 hover:bg-emerald-600/40 text-emerald-300 text-xs font-mono font-bold"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              <span>Export CSV/XLSX</span>
            </button>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#0c1424] overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#070b14] text-slate-400 border-b border-white/[0.08] text-[11px]">
                <tr>
                  <th className="p-3">TAG NO.</th>
                  <th className="p-3">DESCRIPTION</th>
                  <th className="p-3">SERVICE / FLUID</th>
                  <th className="p-3">LINE SIZE / SPEC</th>
                  <th className="p-3">DESIGN P/T</th>
                  <th className="p-3">FAIL ACTION</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05] text-slate-200">
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-cyan-400">C-101</td>
                  <td className="p-3">Atmospheric Crude Column</td>
                  <td className="p-3">Crude / Hydrocarbon Vapor</td>
                  <td className="p-3">48 Trays • Clad 316L</td>
                  <td className="p-3">18.5 bar / 380°C</td>
                  <td className="p-3">—</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px]">OPERATIONAL</span></td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-amber-400">TIC-101</td>
                  <td className="p-3">Column Top Temp Transmitter</td>
                  <td className="p-3">Overhead Vapor</td>
                  <td className="p-3">RTD PT100 Duplex</td>
                  <td className="p-3">0 - 220 °C</td>
                  <td className="p-3">—</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-500/30 text-red-300 text-[10px]">CRIT EXCURSION</span></td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-red-400">P-201A</td>
                  <td className="p-3">Atmospheric Bottoms Pump</td>
                  <td className="p-3">Reduced Crude (Residue)</td>
                  <td className="p-3">API 610 Centrifugal</td>
                  <td className="p-3">24.0 bar / 360°C</td>
                  <td className="p-3">—</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300 text-[10px]">HIGH VIB</span></td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-cyan-400">FV-201</td>
                  <td className="p-3">Residue Quench Control Valve</td>
                  <td className="p-3">Quench Gas Oil</td>
                  <td className="p-3">6" 300# Globe</td>
                  <td className="p-3">20.0 bar / 250°C</td>
                  <td className="p-3 font-bold text-slate-400">FC</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px]">NORMAL</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubView === "canvas" && (
        <div className="flex-1 flex overflow-hidden relative">
          {/* Main Drawing Area */}
          <div className="flex-1 relative overflow-auto industrial-grid flex items-center justify-center p-8">
            <div 
              className="relative transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {/* High-Performance Industrial SVG Drawing */}
              <svg 
                className="w-[900px] h-[580px] overflow-visible select-none drop-shadow-2xl" 
                viewBox="0 0 900 580"
              >
                {/* Background Grid Accent Lines */}
                <defs>
                  <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Piping: Feed Line */}
                <path d="M 50 260 L 220 260" stroke="#94a3b8" strokeWidth="4" fill="none" strokeDasharray="6 3" />
                <polygon points="215,255 230,260 215,265" fill="#94a3b8" />
                <text x="60" y="245" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">CRUDE FEED (FIC-102)</text>

                {/* Column C-101 (Main Vessel) */}
                <g 
                  onClick={() => setSelectedTag("C-101")} 
                  className="cursor-pointer group"
                >
                  <rect 
                    x="230" y="90" width="130" height="340" rx="30" 
                    fill="#0e172a" 
                    stroke={selectedTag === "C-101" ? "#38bdf8" : "#475569"} 
                    strokeWidth="3" 
                  />
                  {/* Internal Trays */}
                  {[140, 180, 220, 260, 300, 340, 380].map((y, i) => (
                    <line key={i} x1="240" y1={y} x2="350" y2={y} stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
                  ))}
                  <text x="295" y="270" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="monospace" fontWeight="bold">
                    C-101
                  </text>
                  <text x="295" y="290" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                    Atmospheric Tower
                  </text>
                </g>

                {/* Overhead Vapor Line */}
                <path d="M 295 90 L 295 40 L 520 40 L 520 90" stroke="#ef4444" strokeWidth="4" fill="none" filter="url(#glow)" />
                <polygon points="515,85 520,95 525,85" fill="#ef4444" />

                {/* Overhead Condenser E-101 */}
                <g className="cursor-pointer">
                  <rect x="470" y="90" width="100" height="50" rx="6" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                  <text x="520" y="120" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="monospace" fontWeight="bold">E-101</text>
                  <text x="520" y="132" textAnchor="middle" fill="#94a3b8" fontSize="9">Fin-Fan Condenser</text>
                </g>

                {/* Line from Condenser to Accumulator V-101 */}
                <path d="M 520 140 L 520 180" stroke="#94a3b8" strokeWidth="3" fill="none" />

                {/* Overhead Accumulator Drum V-101 */}
                <g className="cursor-pointer">
                  <rect x="475" y="180" width="90" height="60" rx="15" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                  <text x="520" y="215" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="monospace" fontWeight="bold">V-101</text>
                </g>

                {/* Bottoms Residue Line to Pump P-201A */}
                <path d="M 295 430 L 295 490 L 440 490" stroke="#f59e0b" strokeWidth="4" fill="none" />

                {/* Bottoms Pump P-201A */}
                <g 
                  onClick={() => setSelectedTag("P-201A")} 
                  className="cursor-pointer group"
                >
                  <circle 
                    cx="470" cy="490" r="26" 
                    fill="#0e172a" 
                    stroke={selectedTag === "P-201A" ? "#ef4444" : "#f59e0b"} 
                    strokeWidth="3" 
                  />
                  <path d="M 470 464 L 496 490" stroke="#f59e0b" strokeWidth="3" />
                  <text x="470" y="495" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    P-201A
                  </text>
                </g>

                {/* Discharge Line to Control Valve FV-201 */}
                <path d="M 496 490 L 620 490" stroke="#f59e0b" strokeWidth="4" fill="none" />

                {/* Valve FV-201 */}
                <g 
                  onClick={() => setSelectedTag("FV-201")} 
                  className="cursor-pointer"
                >
                  <polygon points="620,480 620,500 645,490" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <polygon points="670,480 670,500 645,490" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="645" cy="470" r="8" fill="#0e172a" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="645" y1="478" x2="645" y2="490" stroke="#38bdf8" strokeWidth="2" />
                  <text x="645" y="520" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">FV-201</text>
                </g>

                {/* Discharge Out to DCU */}
                <path d="M 670 490 L 820 490" stroke="#f59e0b" strokeWidth="4" fill="none" />
                <polygon points="815,485 830,490 815,495" fill="#f59e0b" />
                <text x="720" y="475" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">TO DELAYED COKER (DCU)</text>

                {/* Instrument Bubble: TIC-101 */}
                <g 
                  onClick={() => setSelectedTag("TIC-101")} 
                  className="cursor-pointer"
                >
                  <line x1="295" y1="65" x2="380" y2="65" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="380" cy="65" r="20" fill="#1e1b4b" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
                  <line x1="360" y1="65" x2="400" y2="65" stroke="#ef4444" strokeWidth="1" />
                  <text x="380" y="60" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">TIC</text>
                  <text x="380" y="75" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="bold">101</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Right Floating Inspection Drawer */}
          {selectedTag && equipmentDetails[selectedTag] && (
            <div className="w-80 border-l border-white/[0.08] bg-[#0c1424]/95 p-4 overflow-y-auto space-y-4 font-mono text-xs z-10 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Equipment Faceplate</span>
                  <div className="text-base font-bold text-cyan-400">{selectedTag}</div>
                </div>
                <button 
                  onClick={() => setSelectedTag(null)}
                  className="text-slate-400 hover:text-white text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-white font-sans font-semibold text-sm">
                  {equipmentDetails[selectedTag].name}
                </div>
                <div className="text-slate-400 text-[11px]">
                  Service: <strong className="text-slate-200">{equipmentDetails[selectedTag].service || equipmentDetails[selectedTag].loop}</strong>
                </div>
              </div>

              {/* Tag Live Telemetry Gauge Widget */}
              <div className="rounded-lg border border-white/[0.08] bg-[#070b14] p-3 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-400">Live Process Value:</span>
                  <span className="text-sm font-bold text-red-400 animate-pulse">
                    {selectedTag === "TIC-101" ? `${pv1} °C` : selectedTag === "P-201A" ? "8.6 mm/s" : "NORMAL"}
                  </span>
                </div>
                {selectedTag === "TIC-101" && (
                  <div className="text-[10px] text-slate-500 flex justify-between">
                    <span>Alarm Limit: 175.0 °C</span>
                    <span className="text-red-400 font-bold">EXCEEDED</span>
                  </div>
                )}
              </div>

              {/* Specs Table */}
              <div className="space-y-1.5 text-[11px]">
                {Object.entries(equipmentDetails[selectedTag])
                  .filter(([k]) => !["name", "tag", "service", "loop"].includes(k))
                  .map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-slate-200 font-semibold">{val as any}</span>
                    </div>
                  ))}
              </div>

              {/* Linked Maintenance Actions */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => alert(`Opening SAP PM Maintenance History for ${selectedTag}`)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>SAP PM Asset History</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
