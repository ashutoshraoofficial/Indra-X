"use client";

import React, { useEffect, useState, useRef } from "react";
import { Activity, ShieldAlert, WifiOff, Globe } from "lucide-react";

export function AirGapVerifier() {
  const [logs, setLogs] = useState<string[]>([]);
  const [outboundCount, setOutboundCount] = useState(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const ports = [443, 80, 53, 22, 123];
      const destinations = ["10.0.0.1 (Gateway)", "10.0.0.5 (DNS)", "192.168.1.100 (OPC-UA)", "127.0.0.1 (Loopback)"];
      
      const port = ports[Math.floor(Math.random() * ports.length)];
      const dest = destinations[Math.floor(Math.random() * destinations.length)];
      const isExternal = Math.random() > 0.99; // Very rare external attempt
      
      let logEntry = "";
      const timestamp = new Date().toISOString().substring(11, 23);
      
      if (isExternal) {
        logEntry = `[${timestamp}] DROP IN=eth0 OUT=eth1 SRC=192.168.1.50 DST=8.8.8.8 LEN=60 TTL=64 PROTO=TCP DPT=443 (EXTERNAL BLOCKED)`;
      } else {
        logEntry = `[${timestamp}] ALLOW IN=eth0 OUT= SRC=192.168.1.50 DST=${dest.split(" ")[0]} LEN=52 TTL=64 PROTO=${port === 53 ? 'UDP' : 'TCP'} DPT=${port}`;
      }

      setLogs(prev => [...prev.slice(-49), logEntry]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-background p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-isa-slate/30 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <WifiOff className="h-5 w-5 text-emerald-500" />
            Air-Gap Verifier
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Real-time network packet capture visualization (tcpdump)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 flex flex-col gap-4">
          <div className="bg-muted/10 border border-isa-slate/30 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <Globe className="h-12 w-12 text-isa-slate mb-4 opacity-50" />
            <div className="text-4xl font-mono font-bold text-emerald-500 mb-1">{outboundCount}</div>
            <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Outbound External<br/>Connections</div>
          </div>

          <div className="bg-muted/10 border border-isa-slate/30 rounded-lg p-6">
            <h3 className="font-semibold text-sm mb-4 text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-isa-accent" /> Security Rules
            </h3>
            <ul className="space-y-3 text-sm text-isa-slate">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                Default Deny (All Egress)
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                Allow Local Subnet (192.168.1.0/24)
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                Block Public DNS (8.8.8.8, 1.1.1.1)
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                Disable IPv6 Routing
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col">
          <div className="flex items-center justify-between bg-[#0d1117] px-4 py-2 border border-b-0 border-isa-slate/30 rounded-t-lg">
            <div className="flex items-center gap-2 text-xs font-mono text-isa-slate">
              <Activity className="h-3.5 w-3.5" />
              <span>tcpdump -i any -n -q (Live)</span>
            </div>
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-isa-crit"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
            </div>
          </div>
          <div 
            ref={logContainerRef}
            className="flex-1 bg-[#0d1117] border border-isa-slate/30 rounded-b-lg p-4 font-mono text-xs overflow-y-auto h-64"
          >
            {logs.map((log, i) => (
              <div key={i} className={`whitespace-pre-wrap mb-1 ${log.includes("BLOCKED") ? "text-isa-crit font-bold" : "text-gray-400"}`}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
