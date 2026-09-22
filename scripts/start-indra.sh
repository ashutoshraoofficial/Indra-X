#!/usr/bin/env bash
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export OPENCLAW_STATE_DIR="$PROJECT_DIR/indra-state"

echo "=========================================================================="
echo "⚡ Starting Indra AI — Sovereign Industrial Multi-Agent Workbench"
echo "   Target Deployment: Mangalore Refinery and Petrochemicals Limited (MRPL)"
echo "   Air-Gap Mode: Zero External Telemetry | Local Weights Only"
echo "=========================================================================="

# 1. Verify Ollama local engine
echo ""
echo "[1/3] Checking Ollama Local Inference Server..."
if pgrep -x "ollama" > /dev/null 2>&1; then
    echo "  ✓ Ollama service is running."
else
    echo "  [*] Launching Ollama background service..."
    ollama serve > "$PROJECT_DIR/indra-state/ollama.log" 2>&1 &
    OLLAMA_PID=$!
    sleep 2
    echo "  ✓ Ollama started (PID: ${OLLAMA_PID:-running})."
fi

# 2. Check and provision models
echo ""
echo "[2/3] Checking Installed Model Catalog..."
"$PROJECT_DIR/indra-ai/bin/indra" models list || true

# 3. Choose launch mode
echo ""
echo "[3/3] Indra AI System Ready."
echo "--------------------------------------------------------------------------"
echo " Select launch mode:"
echo "   1) Professional Terminal Client (indra_terminal.py - Interactive Tools)"
echo "   2) Indra Gateway (WebSocket backend on :18789)"
echo "   3) Indra Terminal UI (Built-in TUI)"
echo "   4) Headless Agent One-Shot Turn"
echo "--------------------------------------------------------------------------"

MODE="${1:-1}"

case "$MODE" in
    1|"terminal"|"cli")
        echo "Launching Indra AI Professional Terminal..."
        exec python3 "$PROJECT_DIR/indra_terminal.py"
        ;;
    2|"gateway")
        echo "Launching Indra AI WebSocket Gateway on :18789..."
        exec "$PROJECT_DIR/indra-ai/bin/indra" gateway
        ;;
    3|"tui")
        echo "Launching Indra AI Built-in TUI..."
        exec "$PROJECT_DIR/indra-ai/bin/indra" tui
        ;;
    4|"agent")
        shift || true
        MESSAGE="${*:-'Perform system health check and list workspace contents'}"
        echo "Running agent turn: '$MESSAGE'..."
        exec "$PROJECT_DIR/indra-ai/bin/indra" agent --message "$MESSAGE" --local
        ;;
    *)
        exec python3 "$PROJECT_DIR/indra_terminal.py"
        ;;
esac
