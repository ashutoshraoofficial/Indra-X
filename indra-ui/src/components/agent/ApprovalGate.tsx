"use client";

import React, { useState } from "react";
import { Check, X, ShieldAlert, Clock } from "lucide-react";

interface ApprovalGateProps {
  actionDescription: string;
  consequenceLevel?: "low" | "medium" | "high" | "critical";
  onApprove: () => void;
  onReject: (reason: string) => void;
  ttlSeconds?: number;
}

export function ApprovalGate({
  actionDescription,
  consequenceLevel = "medium",
  onApprove,
  onReject,
  ttlSeconds = 300,
}: ApprovalGateProps) {
  const [rejectReason, setRejectReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  const levelStyles = {
    low: "border-isa-low bg-isa-low/10",
    medium: "border-isa-med bg-isa-med/10",
    high: "border-isa-high bg-isa-high/10",
    critical: "border-isa-crit bg-isa-crit/10",
  };

  const levelColors = {
    low: "text-isa-low",
    medium: "text-isa-med",
    high: "text-isa-high",
    critical: "text-isa-crit",
  };

  return (
    <div className={`my-4 flex flex-col gap-3 rounded-lg border p-4 ${levelStyles[consequenceLevel]}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className={`h-5 w-5 ${levelColors[consequenceLevel]}`} />
          <h4 className="font-semibold text-foreground uppercase tracking-wider text-sm">
            Action Approval Required
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>TTL: {ttlSeconds}s</span>
        </div>
      </div>

      <div className="rounded-md bg-background/50 p-3 font-mono text-sm text-foreground">
        {actionDescription}
      </div>

      {isRejecting ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="w-full rounded-md border border-isa-slate/30 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-isa-accent"
            placeholder="Enter rejection reason / operator instruction..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => setIsRejecting(false)}
              className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onReject(rejectReason)}
              disabled={!rejectReason.trim()}
              className="flex items-center gap-1.5 rounded-md bg-isa-crit px-3 py-1.5 text-xs font-medium text-white opacity-90 hover:opacity-100 disabled:opacity-50 transition-opacity"
            >
              <X className="h-3.5 w-3.5" />
              Confirm Reject
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            onClick={onApprove}
            className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
          >
            <Check className="h-4 w-4" />
            Approve Once
          </button>
          <button
            onClick={onApprove}
            className="flex items-center gap-1.5 rounded-md bg-isa-slate/20 px-4 py-2 text-sm font-medium text-foreground hover:bg-isa-slate/30 transition-colors"
          >
            <Check className="h-4 w-4 opacity-70" />
            Approve for Shift
          </button>
          <button
            onClick={() => setIsRejecting(true)}
            className="flex items-center gap-1.5 rounded-md border border-isa-slate/30 bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-isa-slate/10 transition-colors ml-auto"
          >
            <X className="h-4 w-4" />
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
