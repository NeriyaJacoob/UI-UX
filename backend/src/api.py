import sys
import os
import subprocess
import io

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

@app.route("/content/theory", methods=["GET"])
def get_theory_text():
    try:
        path = os.path.join("modules", "theory", "intro.txt")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        return jsonify({ "text": content })
    except Exception as e:
        return jsonify({ "text": f"שגיאה בקריאה: {str(e)}" }), 500

@app.route("/generate-key", methods=["GET"])
def generate_key():
    import os
    key = os.urandom(32).hex()
    return jsonify({"key": key})

@app.route("/summary/logs", methods=["GET"])
def get_logs():
    path = os.path.join("modules", "summary", "log.txt")
    if not os.path.exists(path):
        return jsonify({"logs": "אין פעולות מתועדות עדיין."})
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    return jsonify({"logs": content})

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

