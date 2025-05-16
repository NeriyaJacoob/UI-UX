import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from modules.encrypt import encrypt_files
from modules.decrypt import decrypt_files

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/encrypt", methods=["POST"])
def encrypt_endpoint():
    data = request.get_json()
    folder = data.get("folder")
    if not folder:
        return jsonify({"error": "Missing folder path"}), 400

    encrypt_files(folder)
    return jsonify({"status": "encrypted", "folder": folder})

@app.route("/decrypt", methods=["POST"])
def decrypt_endpoint():
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

if __name__ == "__main__":
    app.run(port=5000, debug=True)

