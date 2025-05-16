import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from modules.utils import log_action

SIGNATURE = b"BME1"
CHUNK_SIZE = 10 * 1024
key = bytes.fromhex("3031323334353637383961626364656630313233343536373839616263646566")

def decrypt_files(key: bytes, folder: str = "./target"):
    for root, _, files in os.walk(folder):
        for name in files:
            path = os.path.join(root, name)
            try:
                with open(path, "rb") as f:
                    data = f.read()

                if not data.startswith(SIGNATURE):
                    continue

                iv = data[4:20]
                encrypted_header = data[20:20 + ((CHUNK_SIZE + AES.block_size - 1) // AES.block_size) * AES.block_size]
                tail = data[20 + len(encrypted_header):]

                cipher = AES.new(key, AES.MODE_CBC, iv)
                header = unpad(cipher.decrypt(encrypted_header), AES.block_size)

                with open(path, "wb") as f:
                    f.write(header + tail)

                log_action(f"פוענח: {path}")
            except Exception as e:
                log_action(f"שגיאה בפיענוח {path}: {str(e)}")
