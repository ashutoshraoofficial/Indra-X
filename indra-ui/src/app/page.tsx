"use client";

import React, { useState } from "react";
import { WorkbenchShell } from "@/components/shell/WorkbenchShell";
import { MissionControl } from "@/components/dashboard/MissionControl";
import { AgentChat } from "@/components/agent/AgentChat";
import { PIDCanvas } from "@/components/pid/PIDCanvas";
import { MCPManagerDashboard } from "@/components/mcp/MCPManagerDashboard";
import { TrainingDashboard } from "@/components/training/TrainingDashboard";
import { SecurityDashboard } from "@/components/security/SecurityDashboard";
import { SettingsView } from "@/components/settings/SettingsView";
import { InspectorPanel } from "@/components/shell/InspectorPanel";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedTag, setSelectedTag] = useState<string>("TIC-101");
  const [injectedPrompt, setInjectedPrompt] = useState<string>("");

  const handleDiagnoseAI = (tag: string) => {
    setSelectedTag(tag);
    setInjectedPrompt(`Perform root cause analysis on anomalous tag ${tag} using DCS telemetry and P&ID topology.`);
    setActiveTab("chat");
  };

  const handleTriggerPrompt = (prompt: string) => {
    setInjectedPrompt(prompt);
    setActiveTab("chat");
  };

  return (
    <WorkbenchShell
      activeNavTab={activeTab}
      onSelectNavTab={setActiveTab}
      onDiagnoseAI={handleDiagnoseAI}
      inspectorPanel={
        <InspectorPanel
          selectedTag={selectedTag}
          onTagAction={(tag, action) => {
            handleTriggerPrompt(`Run action ${action} on equipment tag ${tag}`);
          }}
        />
      }
    >
      {/* Dynamic Center Canvas */}
      {activeTab === "overview" && (
        <MissionControl
          onNavigateTab={setActiveTab}
          onSelectTag={(tag) => {
            setSelectedTag(tag);
          }}
          onTriggerPrompt={handleTriggerPrompt}
        />
      )}

      {activeTab === "chat" && (
        <AgentChat
          externalPrompt={injectedPrompt}
          onClearExternalPrompt={() => setInjectedPrompt("")}
          onNavigateTab={setActiveTab}
        />
      )}

      {activeTab === "pid" && <PIDCanvas />}

      {activeTab === "mcp" && <MCPManagerDashboard />}

      {activeTab === "training" && <TrainingDashboard />}

      {activeTab === "security" && <SecurityDashboard />}

      {activeTab === "settings" && <SettingsView />}
    </WorkbenchShell>
  );
}
