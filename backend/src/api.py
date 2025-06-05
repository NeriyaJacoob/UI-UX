import sys
import os
import subprocess
import io
import json

from contextlib import redirect_stdout

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
sys.path.append(BASE_DIR)
from modules.decrypt import decrypt_files
from modules.utils import decrypt_key_rsa, log_summary
from modules.encrypt import encrypt_files
from modules.decrypt import decrypt_files

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/progress/quiz", methods=["POST"])
def update_quiz_score():
    data = request.get_json()
    score = data.get("score")
    total = data.get("total")

    path = os.path.join("modules", "summary", "stats.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            stats = json.load(f)
    else:
        stats = {}

    stats["quiz_score"] = int((score / total) * 100)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(stats, f)

    return jsonify({ "status": "ok" })


@app.route("/encrypt", methods=["POST"])
def encrypt_endpoint():
    folder = request.json.get("folder")
    if not folder:
        return jsonify({"error": "Missing folder"}), 400

    encrypt_files(folder)
    return jsonify({"status": "encrypted", "folder": folder})

@app.route("/decrypt", methods=["POST"])
def decrypt_simulation():
    try:
        folder = os.path.expanduser("~/Desktop/TestEncrypt")
        decrypt_files(folder=folder)
        return jsonify({"status": "ok", "message": "🔓 הקבצים פוענחו בהצלחה"})
    except Exception as e:
        return jsonify({"status": "fail", "message": f"שגיאה בפענוח: {str(e)}"})

@app.route("/progress/theory", methods=["POST"])
def update_theory_progress():
    data = request.get_json()
    page = str(data.get("page"))

    path = os.path.join("modules", "summary", "progress.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            progress = json.load(f)
    else:
        progress = { "theory_pages": [] }

    if page not in progress["theory_pages"]:
        progress["theory_pages"].append(page)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(progress, f)

    return jsonify({"status": "ok"})


@app.route("/generate-key", methods=["GET"])
def generate_key():
    import os
    key = os.urandom(32).hex()
    return jsonify({"key": key})


@app.route("/summary/logs", methods=["GET"])
def get_logs():
    log_path = os.path.join("modules", "summary", "log.txt")
    progress_path = os.path.join("modules", "summary", "progress.json")
    stats_path = os.path.join("modules", "summary", "stats.json")

    # טען לוגים
    if os.path.exists(log_path):
        with open(log_path, "r", encoding="utf-8") as f:
            content = f.read()
    else:
        content = "אין פעולות מתועדות עדיין."

    # התחלה חדשה לסטטיסטיקות
    stats = {}

    # טען stats.json אם קיים (כדי לשלוף quiz_score וכו')
    if os.path.exists(stats_path):
        with open(stats_path, "r", encoding="utf-8") as f:
            stats.update(json.load(f))

    # חישוב אחוז התקדמות תיאוריה
    if os.path.exists(progress_path):
        with open(progress_path, "r", encoding="utf-8") as f:
            progress = json.load(f)
        pages_read = len(set(progress.get("theory_pages", [])))
    else:
        pages_read = 0

    total_pages = 10
    theory_percent = int((pages_read / total_pages) * 100)
    stats["theory_progress_percent"] = theory_percent

    return jsonify({ "logs": content, "stats": stats })

@app.route("/test-ransom", methods=["POST"])
def test_ransom():
    try:
        script = os.path.join(os.path.dirname(__file__), "modules", "simulation", "trigger_ransom.py")
        src_path = os.path.join(os.path.dirname(__file__))  # backend/src

        result = subprocess.run(
            ["python3", script],
            cwd=os.path.dirname(script),
            env={**os.environ, "PYTHONPATH": src_path},
            capture_output=True,
            text=True
        )

        if result.returncode == 2:
            return jsonify({
                "status": "blocked",
                "message": "❌ הכופר נחסם על ידי אנטי וירוס",
                "stdout": result.stdout,
                "stderr": result.stderr
            })

        if result.returncode != 0:
            return jsonify({
                "status": "fail",
                "message": "⚠️ שגיאה בהרצה",
                "stdout": result.stdout,
                "stderr": result.stderr
            })

        return jsonify({
            "status": "ok",
            "message": "💣 הכופר הורץ בהצלחה",
            "stdout": result.stdout,
            "stderr": result.stderr
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@app.route("/infection", methods=["POST"])
def run_infection():
    try:
        script = os.path.join(BASE_DIR, "modules", "infector.py")
        subprocess.Popen(["python3", script])
        return jsonify({"status": "✅ הדבקה הופעלה"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/antivirus/code", methods=["GET"])
def read_student_code():
    path = os.path.join(BASE_DIR, "tmp", "student_antivirus.py")
    default_code = '''with open("/tmp/block_ransom", "w") as f:
    f.write("BLOCKED")

    print("✅ אנטי וירוס הופעל בהצלחה!")'''
    try:
        if not os.path.exists(path) or os.path.getsize(path) == 0:
            with open(path, "w") as f:
                f.write(default_code)
            return default_code

        with open(path) as f:
            return f.read()
    except Exception as e:
        return f"# שגיאה בטעינת הקובץ: {e}"

@app.route("/run-antivirus", methods=["POST"])
def run_antivirus():
    try:
        code_path = os.path.join(BASE_DIR, "tmp", "student_antivirus.py")
        with open(code_path) as f:
            code = f.read()

        with open("/tmp/antivirus_exec.py", "w") as f:
            f.write(code)

        result = subprocess.run(
            ["python3", "/tmp/antivirus_exec.py"],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
        )

        return jsonify({"result": result.stdout, "error": result.stderr})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/antivirus/clear", methods=["POST"])
def clear_antivirus_block():
    path = "/tmp/block_ransom"  # מחק רק את סימן החסימה
    try:
        if os.path.exists(path):
            os.remove(path)
            return jsonify({"status": "ok", "message": "האנטי וירוס הוסר"})
        return jsonify({"status": "ok", "message": "לא היה אנטי וירוס פעיל"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/save-antivirus", methods=["POST"])
def save_antivirus():
    data = request.get_json()
    code = data.get("code", "")
    path = os.path.join(BASE_DIR, "tmp", "student_antivirus.py")
    with open(path, "w") as f:
        f.write(code)
    return jsonify({"status": "ok"})


@app.route("/summary/clear", methods=["POST"])
def clear_summary_logs():
    path = os.path.join("modules", "summary", "log.txt")
    try:
        open(path, "w").close()
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500





if __name__ == "__main__":
    app.run(port=5000, debug=True)

