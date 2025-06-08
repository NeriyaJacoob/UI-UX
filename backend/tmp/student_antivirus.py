import psutil
import time
import os

DETECTION_FILE = "/tmp/detection_result.txt"
TARGET_FOLDER = "TestInfected"

time.sleep(0.5)  # תן זמן להרצה של קובץ נגוע

for proc in psutil.process_iter(['pid', 'ppid', 'cmdline']):
    try:
        cmdline = proc.info.get("cmdline", [])
        if not cmdline:
            continue

        # זיהוי תהליך שמריץ קובץ מתוך TestInfected
        if any(TARGET_FOLDER in arg for arg in cmdline):
            with open(DETECTION_FILE, "w") as f:
                f.write(f"זוהה תהליך נגוע: {' '.join(cmdline)}\n")
                f.flush()
            print("✅ זיהוי הדבקה – תהליך נגוע הופעל")
            break

    except (psutil.NoSuchProcess, psutil.AccessDenied):
        continue








