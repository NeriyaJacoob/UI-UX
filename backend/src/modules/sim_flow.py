import os
import subprocess
import sys

from modules.utils import log_summary

DETECTION_FILE = "/tmp/detection_result.txt"
BLOCK_FLAG = "/tmp/block_ransom"

MODULE_DIR = os.path.dirname(__file__)

SIMULATION_SCRIPTS = {
    "infection": os.path.join(MODULE_DIR, "infector.py"),
    "ransom": os.path.join(MODULE_DIR, "simulation", "trigger_ransom.py"),
}


def run_student_antivirus():
    path = os.path.abspath(os.path.join(MODULE_DIR, "..", "tmp", "student_antivirus.py"))

    print("🧪 אנטי־וירוס: מחפש קובץ בנתיב:", path)

    if not os.path.exists(path):
        print("❌ קובץ student_antivirus.py לא נמצא!")
        return  # או: raise FileNotFoundError

    subprocess.run([sys.executable, path])



def run_simulation(task: str):
    """Run a simulation with detection+blocking logic."""
    # Clear detection file
    if os.path.exists(DETECTION_FILE):
        os.remove(DETECTION_FILE)

    # Run student AV before the simulation
    run_student_antivirus()

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
        log_summary(f"{task} זוהה", "success")
    else:
        log_summary(f"{task} לא זוהה", "fail")

    blocked = False
    if detected:
        if os.path.exists(BLOCK_FLAG) or ret == 2:
            blocked = True
            log_summary(f"{task} נחסם", "success")
        else:
            log_summary(f"{task} לא נחסם", "fail")

    return {
        "detected": detected,
        "blocked": blocked,
        "stdout": stdout,
        "stderr": stderr,
        "returncode": ret,
    }
