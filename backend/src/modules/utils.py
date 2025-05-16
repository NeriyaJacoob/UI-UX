import os
from datetime import datetime

LOG_PATH = os.path.join("modules", "summary", "log.txt")

def log_action(message: str):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {message}\n")
