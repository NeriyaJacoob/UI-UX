import psutil
import time

TRIGGER_NAME = "trigger_ransom.py"
DETECTION_FILE = "/tmp/detection_result.txt"

time.sleep(0.5)  # תן לתהליך הדבקה לעלות

for proc in psutil.process_iter(['pid', 'ppid', 'name', 'cmdline']):
    try:
        cmd = proc.info.get("cmdline", [])
        if not cmd:
            continue

        if any(TRIGGER_NAME in arg for arg in cmd):
            parent_pid = proc.info['ppid']
            parent = psutil.Process(parent_pid)
            parent_cmd = " ".join(parent.cmdline())

            # כתוב תיעוד מלא לקובץ זיהוי
            with open(DETECTION_FILE, "w") as f:
                f.write(
                    f"זוהה תהליך הדבקה!\n"
                    f"PID: {proc.pid}\n"
                    f"PPID: {parent_pid}\n"
                    f"מקור: {parent_cmd}\n"
                )
                f.flush()  # ←⬅️ חשוב! מוודא שהשורות נכתבו פיזית לקובץ

            print("✅ trigger_ransom.py זוהה מתוך תהליך אחר")
            break
    except (psutil.NoSuchProcess, psutil.AccessDenied):
        continue
