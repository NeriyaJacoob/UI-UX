import os
import subprocess
import sys
from datetime import datetime

import json
from modules.utils import log_summary
from modules.constants import DETECTION_FILE, BLOCK_FLAG

MODULE_DIR = os.path.dirname(__file__)
STATS_FILE = os.path.join(MODULE_DIR, "summary", "stats.json")

SIMULATION_SCRIPTS = {
    "infection": os.path.join(MODULE_DIR, "infector.py"),
    "ransom": os.path.join(MODULE_DIR, "simulation", "trigger_ransom.py"),
}

def _update_stats(task: str, detected: bool, blocked: bool):
    """Update summary stats file with task results."""
    if os.path.exists(STATS_FILE):
        with open(STATS_FILE, "r", encoding="utf-8") as f:
            stats = json.load(f)
    else:
        stats = {}

    results = stats.get("task_results", {})
    results[task] = {"detected": detected, "blocked": blocked}
    stats["task_results"] = results

    # Update simulations_blocked list
    stats["simulations_blocked"] = [t for t, r in results.items() if r.get("blocked")]

    total = len(results)
    if total:
        detected_count = sum(1 for r in results.values() if r.get("detected"))
        stats["detection_accuracy"] = int(detected_count / total * 100)

    with open(STATS_FILE, "w", encoding="utf-8") as f:
        json.dump(stats, f, ensure_ascii=False)

def run_simulation(task: str):
    """Run a simulation with detection+blocking logic."""
    # Clear detection file from previous runs
    if os.path.exists(DETECTION_FILE):
        os.remove(DETECTION_FILE)

    # Single log entry for starting the simulation
    log_summary(f"[SYSTEM] סימולציית {task} הופעלה", "system")
    logs = []
    time_now = lambda: datetime.now().strftime("%H:%M:%S")
    logs.append({"time": time_now(), "msg": f"סימולציית {task} הופעלה"})



    stdout = ""
    stderr = ""
    ret = 0

    if task == "encrypt":
        from modules.encrypt import encrypt_files
        try:
            encrypt_files(os.path.expanduser("~/Desktop/TestEncrypt"))
        except Exception as e:
            stderr = str(e)
            ret = 1
    else:
        script = SIMULATION_SCRIPTS.get(task)
        if not script:
            raise ValueError(f"Unknown task: {task}")
        result = subprocess.run([
            sys.executable,
            script
        ], cwd=os.path.dirname(script), capture_output=True, text=True)
        stdout = result.stdout
        stderr = result.stderr
        ret = result.returncode

    detected = os.path.exists(DETECTION_FILE) and os.path.getsize(DETECTION_FILE) > 0
    if detected:
        logs.append({"time": time_now(), "msg": "אנטי וירוס זיהה תהליך חשוד"})
    else:
        logs.append({"time": time_now(), "msg": "לא זוהה התהליך החשוד"})

    blocked = False
    if detected:
        if os.path.exists(BLOCK_FLAG):
            blocked = True
            logs.append({"time": time_now(), "msg": "התהליך הזדוני נחסם"})
        elif ret == 2:
            blocked = True
            logs.append({"time": time_now(), "msg": "התהליך הזדוני נחסם"})
        else:
            logs.append({"time": time_now(), "msg": "חסימה נכשלה"})
    else:
        logs.append({"time": time_now(), "msg": "חסימה לא בוצעה"})

    _update_stats(task, detected, blocked)

    # Single summary log entry for this simulation's result
    if detected and blocked:
        log_summary(f"[RESULT] סימולציית {task} הצליחה (זוהה ונחסם)", "success")
        logs.append({"time": time_now(), "msg": "הסימולציה זוהתה ונחסמה"})
    elif detected and not blocked:
        log_summary(f"[RESULT] סימולציית {task} זוהתה אך לא נחסמה", "fail")
        logs.append({"time": time_now(), "msg": "זוהה אך לא נחסם"})
    else:
        log_summary(f"[RESULT] סימולציית {task} לא זוהתה", "fail")
        logs.append({"time": time_now(), "msg": "לא זוהתה"})

    return {
        "detected": detected,
        "blocked": blocked,
        "stdout": stdout,
        "stderr": stderr,
        "returncode": ret,
        "logs": logs,
    }
