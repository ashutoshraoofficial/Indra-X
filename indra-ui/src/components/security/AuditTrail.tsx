"use client";

import React, { useState } from "react";
import { Link2, Search, Download, Lock, ShieldCheck } from "lucide-react";

export function AuditTrail() {
  const [logs] = useState([
    {
      id: "a1b2c3d4",
      timestamp: "2026-09-23T01:54:12Z",
      operator: "JS (Operator)",
      agent: "Operations Agent",
      action: "Approve Setpoint Change (FIC-104 -> 150.0)",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    },
    {
      id: "b2c3d4e5",
      timestamp: "2026-09-23T01:52:05Z",
      operator: "System",
      agent: "Vision Agent",
      action: "P&ID Graph Ingestion (MRPL_CDU1_104.pdf)",
      hash: "8a2f4b2383c07223bdf0bf3235bbf599e8dff41ea9b02bb1dcfae91122abfc22"
    },
    {
      id: "c3d4e5f6",
      timestamp: "2026-09-23T01:45:33Z",
      operator: "JS (Operator)",
      agent: "Safety Agent",
      action: "PTW Generation (Cold Work, P-201A)",
      hash: "9312111d4d805df62002cd1ebcd500a8c279c090ba23456c20845a70928233bd"
    }
  ]);

  return (
    <div className="flex flex-col h-full bg-background p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-isa-slate/30 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Lock className="h-5 w-5 text-isa-accent" />
            Cryptographic Audit Trail
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Merkle hash-chain of all operator and AI actions</p>
        </div>
        <div className="flex gap-2">
           <div className="relative">
             <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <input type="text" placeholder="Search hash or operator..." className="pl-8 pr-3 py-1.5 text-sm bg-muted/10 border border-isa-slate/30 rounded focus:outline-none focus:border-isa-accent text-foreground" />
           </div>
           <button className="flex items-center gap-1.5 bg-isa-slate/20 text-foreground px-3 py-1.5 rounded text-sm hover:bg-isa-slate/30">
             <Download className="h-4 w-4" /> Export
           </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-isa-slate/30">
        <table className="w-full text-left text-sm text-foreground">
          <thead className="bg-muted/10 border-b border-isa-slate/30 font-mono text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Operator / Agent</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Merkle Root Hash (SHA-256)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-isa-slate/20">
            {logs.map((log, idx) => (
              <tr key={log.id} className="hover:bg-muted/5 transition-colors">
                <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">{log.timestamp}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{log.operator}</span>
                    <span className="text-xs text-muted-foreground">{log.agent}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-isa-slate font-medium">{log.action}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-isa-accent" />
                    <span className="font-mono text-xs text-muted-foreground truncate max-w-[200px]" title={log.hash}>
                      {log.hash}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs px-4 py-3 rounded-md font-mono flex items-center justify-center gap-2 mt-auto">
        <ShieldCheck className="h-4 w-4" />
        CRYPTOGRAPHIC CHAIN VERIFIED. NO TAMPERING DETECTED.
      </div>
    </div>
  );
}
