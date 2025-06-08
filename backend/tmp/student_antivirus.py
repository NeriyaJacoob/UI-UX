import psutil
import time
import os
import sys

# אפשר לייבא את מודולי הפרויקט
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))
from modules.constants import DETECTION_FILE, BLOCK_FLAG

TRIGGER_NAME = "trigger_ransom.py"

# תן זמן לתהליך הנגוע לעלות
time.sleep(0.5)

for proc in psutil.process_iter(['pid', 'ppid', 'name', 'cmdline']):
    try:
        cmdline = proc.info.get("cmdline", [])
        if not cmdline:
            continue

        if any(TRIGGER_NAME in arg for arg in cmdline):
            parent_pid = proc.info['ppid']
            parent = psutil.Process(parent_pid)
            parent_cmd = " ".join(parent.cmdline())

            # כתוב קובץ זיהוי עם מידע על התהליך והורהו
            with open(DETECTION_FILE, "w") as f:
                f.write(
                    f"זוהה תהליך הדבקה!\n"
                    f"PID: {proc.pid}\n"
                    f"PPID: {parent_pid}\n"
                    f"הורה: {parent_cmd}\n"
                )
                f.flush()

            # צור דגל חסימה כדי לדמות פעולת אנטי וירוס
            with open(BLOCK_FLAG, "w") as block:
                block.write("BLOCKED")

            print("✅ זיהוי: trigger_ransom.py הופעל מתוך תהליך נגוע")
            break

    except (psutil.NoSuchProcess, psutil.AccessDenied):
        continue
