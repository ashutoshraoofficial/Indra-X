#!/usr/bin/env bash
set -e

echo "=== [Indra AI] Local Inference Engine Setup (Ollama) ==="

# Check Ollama binary
if ! command -v ollama &> /dev/null; then
    echo "[-] Ollama not found in PATH. Please install Ollama from https://ollama.com or brew install ollama"
    exit 1
fi

echo "[+] Detected Ollama at $(command -v ollama)"

# Model definitions
PRIMARY_MODEL="gemma4:12b"
FALLBACK_MODEL="gemma4:e4b"

echo "[*] Pulling primary reasoning & tool-use model: ${PRIMARY_MODEL}..."
ollama pull "${PRIMARY_MODEL}" || {
    echo "[!] Could not pull ${PRIMARY_MODEL}. Trying fast fallback: ${FALLBACK_MODEL}..."
    ollama pull "${FALLBACK_MODEL}"
}

echo "[*] Creating custom industrial reasoning profile 'indra-reasoning'..."
cat << 'EOF' > /tmp/Modelfile-indra
FROM gemma4:12b
PARAMETER num_ctx 32768
PARAMETER temperature 0.2
SYSTEM """You are Indra AI, an autonomous industrial multi-agent system deployed in sovereign, air-gapped refinery infrastructure (Mangalore Refinery and Petrochemicals Limited - MRPL).
You have full access to OS-level tools for reading, creating, modifying files, executing authorized system tasks, and conducting plant diagnostics."""
EOF

ollama create indra-reasoning -f /tmp/Modelfile-indra 2>/dev/null || true
rm -f /tmp/Modelfile-indra

echo "[✓] Local model configuration completed."
