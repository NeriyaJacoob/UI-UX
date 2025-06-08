import psutil
import time
import os

TRIGGER_NAME = "trigger_ransom.py"
DETECTION_FILE = "/tmp/detection_result.txt"

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

            print("✅ זיהוי: trigger_ransom.py הופעל מתוך תהליך נגוע")
            break

    except (psutil.NoSuchProcess, psutil.AccessDenied):
        continue
