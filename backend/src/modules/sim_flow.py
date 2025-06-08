import os
import subprocess
import sys

from modules.utils import log_summary
from modules.constants import DETECTION_FILE, BLOCK_FLAG

MODULE_DIR = os.path.dirname(__file__)

SIMULATION_SCRIPTS = {
    "infection": os.path.join(MODULE_DIR, "infector.py"),
    "ransom": os.path.join(MODULE_DIR, "simulation", "trigger_ransom.py"),
}

def run_simulation(task: str):
    """Run a simulation with detection+blocking logic."""
    # Clear detection file from previous runs
    if os.path.exists(DETECTION_FILE):
        os.remove(DETECTION_FILE)

    log_summary(f"[SYSTEM] סימולציית {task} הופעלה", "system")



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
        log_summary(f"[OK] זיהוי הצליח בסימולציית {task}", "success")
    else:
        log_summary(f"[FAIL] לא זוהתה הדבקה בזמן בסימולציית {task}", "fail")

    blocked = False
    if detected:
        if os.path.exists(BLOCK_FLAG):
            blocked = True
            log_summary("[BLOCK] נחסם באמצעות /tmp/block_ransom", "success")
        elif ret == 2:
            blocked = True
            log_summary("[BLOCK] הסקריפט חזר עם קוד 2 – זוהתה חסימה", "success")
        else:
            log_summary("[FAIL] תהליך סימולציה לא נחסם בפועל", "fail")
    else:
        log_summary("לא בוצעה חסימה מאחר והאיום לא זוהה", "system")

    return {
        "detected": detected,
        "blocked": blocked,
        "stdout": stdout,
        "stderr": stderr,
        "returncode": ret,
    }
