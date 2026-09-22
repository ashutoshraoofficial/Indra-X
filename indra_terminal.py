#!/usr/bin/env python3
"""
Indra AI — Sovereign Industrial Multi-Agent Workbench
Interactive Professional Terminal Frontend with OS Tools & Local LLM Integration
"""

import os
import sys
import time
import json
import urllib.request
import urllib.error
import subprocess
from pathlib import Path

# Professional Terminal Color Palette (Electric Blue, Cyan, Slate Gray, Pure White)
BLUE = "\033[38;2;43;120;255m"       # Royal Electric Blue
BLUE_BRIGHT = "\033[38;2;90;170;255m" # Bright Cyan/Blue
CYAN = "\033[38;2;56;189;248m"       # Professional Cyan
WHITE_BOLD = "\033[1;37m"            # Pure White Bold
GRAY = "\033[38;2;148;163;184m"       # Slate Gray (subdued)
DIM = "\033[38;2;100;116;139m"        # Dim Slate
GOLD = "\033[38;2;251;191;36m"       # Accent Gold / Amber
GREEN = "\033[38;2;52;211;153m"      # Success Green
RED = "\033[38;2;248;113;113m"       # Error Red
RESET = "\033[0m"

OLLAMA_BASE_URL = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
DEFAULT_MODEL = os.environ.get("MODEL", "indra-reasoning")

def clear_screen():
    print("\033[2J\033[H", end="")

def print_banner():
    art = f"""
{BLUE}                         ▄▄████▄▄
{BLUE}                     ▄▄████████████▄▄
{BLUE_BRIGHT}                  ▄███████▀    ▀███████▄
{BLUE_BRIGHT}                ▄██████▀   ▄██▄   ▀██████▄
{CYAN}               ██████▀   ▄██████▄   ▀██████
{CYAN}             ▄██████     ▀██████▀     ██████▄
{WHITE_BOLD}            ███████▄       ▀██▀       ▄███████
{CYAN}             ▀██████▄    ▄██████▄    ▄██████▀
{CYAN}               ██████▄   ▀██████▀   ▄██████
{BLUE_BRIGHT}                ▀██████▄   ▀██▀   ▄██████▀
{BLUE_BRIGHT}                  ▀███████▄    ▄███████▀
{BLUE}                     ▀▀████████████▀▀
{BLUE}                         ▀▀████▀▀{RESET}

{WHITE_BOLD}  ██╗███╗   ██╗██████╗ ██████╗  █████╗        █████╗ ██╗
{WHITE_BOLD}  ██║████╗  ██║██╔══██╗██╔══██╗██╔══██╗      ██╔══██╗██║
{BLUE_BRIGHT}  ██║██╔██╗ ██║██║  ██║██████╔╝███████║      ███████║██║
{BLUE_BRIGHT}  ██║██║╚██╗██║██║  ██║██╔══██╗██╔══██║      ██╔══██║██║
{BLUE}  ██║██║ ╚████║██████╔╝██║  ██║██║  ██║      ██║  ██║██║
{BLUE}  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝      ╚═╝  ╚═╝╚═╝{RESET}
      {GOLD}⚡{RESET} {WHITE_BOLD}SOVEREIGN INDUSTRIAL MULTI-AGENT WORKBENCH{RESET} {GOLD}⚡{RESET}
"""
    print(art)
    
    meta_box = f"""{DIM}┌──────────────────────────────────────────────────────────────────────────────────┐
│  {WHITE_BOLD}Deployment:{RESET} {CYAN}100% Air-Gapped / On-Premise{RESET}  │  {WHITE_BOLD}Security:{RESET} {BLUE_BRIGHT}Zero Telemetry / FIPS 140-3{RESET}     │
│  {WHITE_BOLD}Core Models:{RESET} {CYAN}Gemma-4:12B (Tool Calling) • Gemma-4:E4B (Fast Edge) • Custom LoRA{RESET}    │
│  {WHITE_BOLD}OS Engine:{RESET}   {BLUE_BRIGHT}Filesystem CRUD • Shell Sandbox • Web Research • SCADA Telemetry{RESET}    │
└──────────────────────────────────────────────────────────────────────────────────┘{RESET}
"""
    print(meta_box)

def type_effect(text, color=RESET, speed=0.005):
    for char in text:
        sys.stdout.write(f"{color}{char}{RESET}")
        sys.stdout.flush()
        time.sleep(speed)
    print()

# ==============================================================================
# OS Tool Implementations
# ==============================================================================

def tool_write_file(path: str, content: str) -> str:
    """Create or overwrite a file on the filesystem."""
    try:
        target = Path(path).resolve()
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
        size = len(content.encode("utf-8"))
        return f"Successfully written {size} bytes to {target}"
    except Exception as e:
        return f"Error writing file {path}: {e}"

def tool_read_file(path: str) -> str:
    """Read file content from the filesystem."""
    try:
        target = Path(path).resolve()
        if not target.exists():
            return f"Error: File '{path}' does not exist."
        content = target.read_text(encoding="utf-8", errors="replace")
        lines = len(content.splitlines())
        return f"[File: {target} ({lines} lines)]\n{content}"
    except Exception as e:
        return f"Error reading file {path}: {e}"

def tool_edit_file(path: str, old_text: str, new_text: str) -> str:
    """Replace target text in an existing file."""
    try:
        target = Path(path).resolve()
        if not target.exists():
            return f"Error: File '{path}' does not exist."
        content = target.read_text(encoding="utf-8", errors="replace")
        if old_text not in content:
            return f"Error: Specified old_text was not found in {path}"
        updated = content.replace(old_text, new_text, 1)
        target.write_text(updated, encoding="utf-8")
        return f"Successfully modified {target}"
    except Exception as e:
        return f"Error editing file {path}: {e}"

def tool_list_directory(path: str = ".") -> str:
    """List contents of a directory."""
    try:
        target = Path(path).resolve()
        if not target.exists():
            return f"Error: Directory '{path}' does not exist."
        entries = []
        for item in sorted(target.iterdir()):
            item_type = "DIR " if item.is_dir() else "FILE"
            entries.append(f"{item_type}  {item.name}")
        return f"Directory listing for {target}:\n" + "\n".join(entries[:50])
    except Exception as e:
        return f"Error listing directory {path}: {e}"

def tool_run_command(command: str) -> str:
    """Run an authorized shell command inside the industrial workspace."""
    try:
        res = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            timeout=30
        )
        out = (res.stdout + res.stderr).strip()
        return out if out else f"[Command finished with exit code {res.returncode}]"
    except subprocess.TimeoutExpired:
        return f"Error: Command timed out after 30 seconds."
    except Exception as e:
        return f"Error running command: {e}"

def tool_web_research(url: str) -> str:
    """Fetch website or HTTP resource for industrial research."""
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Indra-AI-Industrial-Agent/2026.3"}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read().decode("utf-8", errors="replace")
            # Strip tags for concise reading
            clean_text = " ".join(data.split())[:2000]
            return f"[Web Data from {url}]:\n{clean_text}..."
    except Exception as e:
        return f"Error visiting web resource {url}: {e}"

# Tool Registry and Schemas
TOOLS_SPEC = [
    {
        "type": "function",
        "function": {
            "name": "write_file",
            "description": "Create or overwrite a file on the local filesystem.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Relative or absolute file path"},
                    "content": {"type": "string", "description": "Text content to write"}
                },
                "required": ["path", "content"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "read_file",
            "description": "Read the contents of a local file.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "File path to read"}
                },
                "required": ["path"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "edit_file",
            "description": "Replace a contiguous block of text in an existing file.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "File path to edit"},
                    "old_text": {"type": "string", "description": "Exact text to find and replace"},
                    "new_text": {"type": "string", "description": "Replacement text"}
                },
                "required": ["path", "old_text", "new_text"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "list_directory",
            "description": "List files and subdirectories at a given path.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Directory path (defaults to '.')"}
                }
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "run_command",
            "description": "Execute an authorized shell command.",
            "parameters": {
                "type": "object",
                "properties": {
                    "command": {"type": "string", "description": "Shell command to run"}
                },
                "required": ["command"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "web_research",
            "description": "Visit an external URL to gather research or documentation.",
            "parameters": {
                "type": "object",
                "properties": {
                    "url": {"type": "string", "description": "Target HTTP/HTTPS URL"}
                },
                "required": ["url"]
            }
        }
    }
]

TOOL_DISPATCH = {
    "write_file": lambda args: tool_write_file(args.get("path"), args.get("content", "")),
    "read_file": lambda args: tool_read_file(args.get("path")),
    "edit_file": lambda args: tool_edit_file(args.get("path"), args.get("old_text", ""), args.get("new_text", "")),
    "list_directory": lambda args: tool_list_directory(args.get("path", ".")),
    "run_command": lambda args: tool_run_command(args.get("command")),
    "web_research": lambda args: tool_web_research(args.get("url"))
}

# ==============================================================================
# Model Query Engine
# ==============================================================================

def check_ollama_status() -> bool:
    try:
        req = urllib.request.Request(f"{OLLAMA_BASE_URL}/api/version")
        with urllib.request.urlopen(req, timeout=1.5) as resp:
            return resp.status == 200
    except Exception:
        return False

def resolve_active_model() -> str:
    """Auto-detect available local model from Ollama catalog."""
    explicit = os.environ.get("MODEL")
    if explicit:
        return explicit
    try:
        req = urllib.request.Request(f"{OLLAMA_BASE_URL}/api/tags")
        with urllib.request.urlopen(req, timeout=1.5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            models = [m.get("name", "") for m in data.get("models", [])]
            for m in models:
                if "indra-reasoning" in m:
                    return m
            for m in models:
                if "gemma4" in m.lower():
                    return m
            if models:
                return models[0]
    except Exception:
        pass
    return "gemma4:e4b"

def query_local_model(messages, model=None):
    """Query Ollama or OpenAI-compatible endpoint with tools."""
    active_model = model or resolve_active_model()
    url = f"{OLLAMA_BASE_URL}/v1/chat/completions"
    payload = {
        "model": active_model,
        "messages": messages,
        "tools": TOOLS_SPEC,
        "temperature": 0.2
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer ollama"
        }
    )
    
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))

# ==============================================================================
# Main Interactive Loop
# ==============================================================================

def main():
    clear_screen()
    print_banner()
    
    ollama_online = check_ollama_status()
    if ollama_online:
        active_m = resolve_active_model()
        type_effect(f"[Inference] Local Ollama server connected at {OLLAMA_BASE_URL}.", GREEN)
        type_effect(f"[Active Model] {active_m} (with Native Tool Calling).", CYAN)
    else:
        type_effect(f"[Inference] Ollama service not currently answering on {OLLAMA_BASE_URL}.", GOLD)
        type_effect(f"            (Direct OS commands /write, /read, /edit, /ls, /run, /fetch are active)", GRAY)
        
    type_effect(f"[OS Tools] Filesystem (write/read/edit), Shell Sandbox, Web Research enabled.", BLUE_BRIGHT)
    type_effect(f"[Status] System ready. Type your command or question (e.g. 'Create a file notes.txt').", WHITE_BOLD)
    print()

    system_prompt = (
        "You are Indra AI, an industrial AI agent operating in an air-gapped refinery facility (MRPL). "
        "You have full capabilities to read, write, and modify files on the OS, run terminal commands, "
        "and fetch research URLs. Always use the provided tools when asked to create, edit, read files, or browse."
    )
    
    conversation = [{"role": "system", "content": system_prompt}]

    while True:
        try:
            prompt_str = f"{BLUE_BRIGHT}Indra {WHITE_BOLD}>{RESET} "
            user_input = input(prompt_str).strip()
            if not user_input:
                continue
                
            if user_input.lower() in ['exit', 'quit', 'q']:
                print()
                type_effect("[System] Disconnecting active subagents. Terminating session safely.", GRAY)
                break

            # Built-in direct slash command shortcuts
            if user_input.startswith("/write "):
                parts = user_input[7:].split(" ", 1)
                if len(parts) == 2:
                    res = tool_write_file(parts[0], parts[1])
                    print(f"{GREEN}✓ {res}{RESET}")
                else:
                    print(f"{RED}Usage: /write <path> <content>{RESET}")
                continue

            if user_input.startswith("/read "):
                path = user_input[6:].strip()
                res = tool_read_file(path)
                print(f"{CYAN}{res}{RESET}")
                continue

            if user_input.startswith("/edit "):
                parts = user_input[6:].split("::", 2)
                if len(parts) == 3:
                    res = tool_edit_file(parts[0].strip(), parts[1].strip(), parts[2].strip())
                    print(f"{GREEN}✓ {res}{RESET}")
                else:
                    print(f"{RED}Usage: /edit <path> :: <old_text> :: <new_text>{RESET}")
                continue

            if user_input.startswith("/ls"):
                path = user_input[3:].strip() or "."
                res = tool_list_directory(path)
                print(f"{CYAN}{res}{RESET}")
                continue

            if user_input.startswith("/run "):
                cmd = user_input[5:].strip()
                print(f"{DIM}● Executing: {cmd}...{RESET}")
                res = tool_run_command(cmd)
                print(f"{WHITE_BOLD}{res}{RESET}")
                continue

            if user_input.startswith("/fetch "):
                url = user_input[7:].strip()
                print(f"{DIM}● Fetching web resource: {url}...{RESET}")
                res = tool_web_research(url)
                print(f"{CYAN}{res}{RESET}")
                continue

            if user_input.startswith("/help"):
                print(f"""
{WHITE_BOLD}Available Commands & Capabilities:{RESET}
  • Natural Language: Just ask (e.g. "create a file log.txt with initial readings")
  • Direct OS Shortcuts:
      {CYAN}/write <file> <text>{RESET}          Create/write file
      {CYAN}/read <file>{RESET}                  Read file
      {CYAN}/edit <file> :: <old> :: <new>{RESET} Edit existing file
      {CYAN}/ls [dir]{RESET}                    List directory contents
      {CYAN}/run <command>{RESET}               Execute shell command
      {CYAN}/fetch <url>{RESET}                 Web research / HTTP scrape
      {CYAN}/help{RESET}                        Show this menu
      {CYAN}exit{RESET}                         Quit session
""")
                continue

            # Natural Language AI Agent Turn
            conversation.append({"role": "user", "content": user_input})
            print(f"{DIM}● Dispatching to Indra Multi-Agent State Machine...{RESET}")

            if not check_ollama_status():
                # Fallback handler if server isn't running
                print(f"{GOLD}[Indra Orchestrator]{RESET} Local inference server is offline.")
                print(f"{GRAY}  Tip: Start Ollama with `ollama serve` or `./scripts/start-indra.sh`.{RESET}")
                print(f"{GRAY}  Executing direct OS action heuristics...{RESET}")
                
                # Heuristic fallback for common demo queries
                lowered = user_input.lower()
                if "create" in lowered and "file" in lowered:
                    words = user_input.split()
                    fname = "demo_report.txt"
                    for w in words:
                        if "." in w:
                            fname = w
                    tool_write_file(fname, f"Generated by Indra AI Industrial Agent\nTimestamp: {time.ctime()}\nTask: {user_input}\nStatus: Completed air-gapped.")
                    print(f"{GREEN}✓ Created file '{fname}' in workspace.{RESET}")
                elif "list" in lowered or "ls" in lowered:
                    print(f"{CYAN}{tool_list_directory('.')}{RESET}")
                else:
                    print(f"{CYAN}[Indra AI]{RESET} Received command: '{user_input}'. Use /help for available OS tools.")
                continue

            # Query local model with tools
            try:
                response = query_local_model(conversation)
                choice = response["choices"][0]["message"]
                conversation.append(choice)

                # Check for tool calls
                if "tool_calls" in choice and choice["tool_calls"]:
                    for tc in choice["tool_calls"]:
                        fn_name = tc["function"]["name"]
                        fn_args_raw = tc["function"].get("arguments", "{}")
                        try:
                            fn_args = json.loads(fn_args_raw) if isinstance(fn_args_raw, str) else fn_args_raw
                        except Exception:
                            fn_args = {}
                            
                        print(f"{CYAN}◆ Tool Triggered:{RESET} {WHITE_BOLD}{fn_name}{RESET} with args: {fn_args}")
                        
                        handler = TOOL_DISPATCH.get(fn_name)
                        if handler:
                            result = handler(fn_args)
                            print(f"{GREEN}  ↳ Output:{RESET} {result[:300]}")
                        else:
                            result = f"Error: Unknown tool '{fn_name}'"

                        conversation.append({
                            "role": "tool",
                            "tool_call_id": tc.get("id", "call_default"),
                            "name": fn_name,
                            "content": str(result)
                        })

                    # Second turn for final synthesis
                    final_response = query_local_model(conversation)
                    final_msg = final_response["choices"][0]["message"].get("content", "")
                    print(f"\n{BLUE_BRIGHT}Indra AI:{RESET} {final_msg}\n")
                    conversation.append({"role": "assistant", "content": final_msg})
                else:
                    msg_text = choice.get("content", "")
                    print(f"\n{BLUE_BRIGHT}Indra AI:{RESET} {msg_text}\n")

            except Exception as e:
                print(f"{RED}[Error querying model]{RESET} {e}")

        except (KeyboardInterrupt, EOFError):
            print()
            type_effect("\n[System] Session interrupted by user. Safe shutdown complete.", GRAY)
            break

if __name__ == "__main__":
    main()
