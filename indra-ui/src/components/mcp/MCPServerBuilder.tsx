"use client";

import React, { useState } from "react";
import { Terminal, Globe, Key, Settings2, PlayCircle, ShieldCheck } from "lucide-react";

export function MCPServerBuilder() {
  const [transport, setTransport] = useState<"stdio" | "http">("stdio");

  return (
    <div className="flex flex-col h-full bg-background p-6 space-y-6 max-w-4xl mx-auto overflow-y-auto w-full">
      <div className="border-b border-isa-slate/30 pb-4">
        <h2 className="text-xl font-semibold text-foreground">Add New MCP Server</h2>
        <p className="text-sm text-muted-foreground mt-1">Configure a new Model Context Protocol tool provider</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Transport Protocol</label>
            <div className="flex gap-4">
              <button 
                onClick={() => setTransport("stdio")}
                className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-md border ${transport === "stdio" ? "border-isa-accent bg-isa-accent/10 text-isa-accent" : "border-isa-slate/30 bg-muted/10 text-muted-foreground hover:bg-isa-slate/10"}`}
              >
                <Terminal className="h-5 w-5" />
                <span className="font-medium">Stdio (Local)</span>
              </button>
              <button 
                onClick={() => setTransport("http")}
                className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-md border ${transport === "http" ? "border-isa-accent bg-isa-accent/10 text-isa-accent" : "border-isa-slate/30 bg-muted/10 text-muted-foreground hover:bg-isa-slate/10"}`}
              >
                <Globe className="h-5 w-5" />
                <span className="font-medium">HTTP (SSE)</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Server Name</label>
            <input type="text" placeholder="e.g. sap-pm-mcp" className="w-full bg-background border border-isa-slate/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-isa-accent text-foreground" />
          </div>

          {transport === "stdio" ? (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Command & Arguments</label>
              <input type="text" placeholder="Command (e.g. python)" className="w-full bg-background border border-isa-slate/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-isa-accent text-foreground mb-2" />
              <textarea placeholder='["-m", "fastmcp", "run", "dcs_bridge.py"]' className="w-full bg-background border border-isa-slate/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-isa-accent font-mono h-24 text-foreground"></textarea>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">SSE Endpoint URL</label>
              <input type="url" placeholder="http://localhost:8080/sse" className="w-full bg-background border border-isa-slate/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-isa-accent text-foreground" />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Key className="h-4 w-4 text-isa-slate" /> Environment Variables
              </label>
              <button className="text-xs text-isa-accent hover:underline">Add Variable</button>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input type="text" placeholder="KEY" defaultValue="OPCUA_ENDPOINT" className="w-1/3 bg-background border border-isa-slate/30 rounded-md px-3 py-2 text-xs font-mono focus:outline-none focus:border-isa-accent text-foreground" />
                <input type="password" placeholder="VALUE" defaultValue="opc.tcp://192.168.1.100:4840" className="flex-1 bg-background border border-isa-slate/30 rounded-md px-3 py-2 text-xs font-mono focus:outline-none focus:border-isa-accent text-foreground" />
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="KEY" defaultValue="SAP_API_KEY" className="w-1/3 bg-background border border-isa-slate/30 rounded-md px-3 py-2 text-xs font-mono focus:outline-none focus:border-isa-accent text-foreground" />
                <input type="password" placeholder="VALUE" className="flex-1 bg-background border border-isa-slate/30 rounded-md px-3 py-2 text-xs font-mono focus:outline-none focus:border-isa-accent text-foreground" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-isa-slate" /> Access Permissions
            </label>
            <div className="border border-isa-slate/30 rounded-md p-3 space-y-2 bg-muted/5">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" defaultChecked className="rounded border-isa-slate/30" />
                Operations Agent
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" defaultChecked className="rounded border-isa-slate/30" />
                Maintenance Agent
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" className="rounded border-isa-slate/30" />
                Safety Agent
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-isa-slate/30 pt-6 flex justify-between items-center mt-auto">
        <button className="flex items-center gap-2 px-4 py-2 bg-muted/20 border border-isa-slate/30 rounded-md text-foreground hover:bg-muted/40 transition-colors text-sm font-medium">
          <PlayCircle className="h-4 w-4 text-isa-accent" />
          Test Connection
        </button>
        <div className="flex gap-3">
          <button className="px-6 py-2 rounded-md border border-isa-slate/30 text-foreground hover:bg-isa-slate/10 transition-colors text-sm font-medium">
            Cancel
          </button>
          <button className="px-6 py-2 rounded-md bg-foreground text-background hover:opacity-90 transition-opacity text-sm font-medium">
            Save Server
          </button>
        </div>
      </div>
    </div>
  );
}
