import sys
import os
import subprocess

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

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
def decrypt_endpoint():
    folder = request.json.get("folder")
    if not folder:
        return jsonify({"error": "Missing folder"}), 400

    decrypt_files(folder)
    return jsonify({"status": "decrypted", "folder": folder})

    data = request.get_json()
    folder = data.get("folder")
    key = bytes.fromhex(data.get("key", ""))

    if not folder or not key:
        return jsonify({"error": "Missing folder or key"}), 400

    decrypt_files(key, folder)
    return jsonify({"status": "decrypted", "folder": folder})

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
        result = subprocess.run(
            ["python3", script],
            cwd=os.path.dirname(script),
            capture_output=True,
            text=True
        )

        if "אנטי וירוס חסם" in result.stdout:
            return jsonify({"status": "🛡️ הווירוס נחסם!"}), 200
        return jsonify({"status": "💣 הווירוס הורץ בהצלחה"}), 200

    except subprocess.CalledProcessError as e:
        return jsonify({"error": str(e)}), 500

@app.route("/run-antivirus", methods=["POST"])
def run_antivirus():
    try:
        data = request.get_json()
        code = data.get("code", "")
        temp_path = "/tmp/student_antivirus.py"
        with open(temp_path, "w") as f:
            f.write(code)

        result = subprocess.run(["python3", temp_path], capture_output=True, text=True, timeout=3)
        return jsonify({"result": result.stdout or "✔️ הופעל בהצלחה"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/infection", methods=["POST"])
def run_infection():
    try:
        subprocess.Popen(["python3", "/home/neriyajacobsen/ByteMeProject/backend/src/modules/infector.py"])
        return jsonify({"status": "✅ הדבקה הופעלה"})
    except Exception as e:
        return jsonify({"error": str(e)})






if __name__ == "__main__":
    app.run(port=5000, debug=True)

