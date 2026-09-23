"use client";

import React from "react";
import { Upload, FileText, CheckCircle2, CircleDashed, Cpu } from "lucide-react";

export function PIDUploader() {
  const [status, setStatus] = React.useState<"idle" | "uploading" | "processing" | "done">("idle");
  const [progress, setProgress] = React.useState(0);

  const handleUpload = () => {
    setStatus("uploading");
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setProgress(current);
      if (current === 20) setStatus("processing");
      if (current >= 100) {
        clearInterval(interval);
        setStatus("done");
      }
    }, 500);
  };

  const steps = [
    { label: "Upload PDF", threshold: 10 },
    { label: "SAHI Tiling", threshold: 30 },
    { label: "YOLO Symbol Detection", threshold: 50 },
    { label: "PaddleOCR Text Extraction", threshold: 70 },
    { label: "Graph Fusion", threshold: 90 },
  ];

  return (
    <div className="flex flex-col h-full bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">P&ID Intelligence Ingestion</h2>
      </div>

      {status === "idle" && (
        <div 
          onClick={handleUpload}
          className="flex flex-col items-center justify-center border-2 border-dashed border-isa-slate/30 rounded-lg bg-muted/10 p-12 cursor-pointer hover:bg-muted/20 transition-colors"
        >
          <Upload className="h-10 w-10 text-isa-slate mb-4" />
          <p className="text-sm font-medium text-foreground">Drag & drop P&ID drawing</p>
          <p className="text-xs text-muted-foreground mt-1">Supports PDF, TIFF, DWG, DXF (Max 50MB)</p>
        </div>
      )}

      {status !== "idle" && (
        <div className="space-y-6 rounded-lg border border-isa-slate/20 bg-muted/5 p-6">
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-isa-accent" />
            <div>
              <div className="text-sm font-semibold text-foreground">MRPL_CDU1_PID_104.pdf</div>
              <div className="text-xs text-muted-foreground">Processing... {progress}%</div>
            </div>
          </div>

          <div className="w-full h-2 bg-isa-slate/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-isa-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4 border-t border-isa-slate/10">
            {steps.map((step, idx) => {
              const isPast = progress >= step.threshold;
              const isCurrent = progress > (idx === 0 ? 0 : steps[idx - 1].threshold) && progress < step.threshold;
              
              return (
                <div key={idx} className="flex flex-col items-center text-center gap-2">
                  {isPast ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : isCurrent ? (
                    <Cpu className="h-5 w-5 text-isa-accent animate-pulse" />
                  ) : (
                    <CircleDashed className="h-5 w-5 text-isa-slate/40" />
                  )}
                  <div className={`text-xs font-mono ${isPast ? "text-foreground" : isCurrent ? "text-isa-accent font-semibold" : "text-muted-foreground"}`}>
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {status === "done" && (
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 text-sm font-medium text-foreground border border-isa-slate/30 rounded hover:bg-isa-slate/10">
            View Error Log
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-isa-accent rounded hover:bg-blue-600">
            Open in Canvas
          </button>
        </div>
      )}
    </div>
  );
}
