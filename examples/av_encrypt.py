#!/usr/bin/env python3
"""Standalone antivirus example for detecting ransomware encryption."""
import os

DETECTION_FILE = "/tmp/detection_result.txt"
BLOCK_FLAG = "/tmp/block_ransom"
DATA_DIR = os.path.join("/tmp", "data")
SIGNATURE = b"BME1"


def scan_and_block():
    for root, _, files in os.walk(DATA_DIR):
        for name in files:
            path = os.path.join(root, name)
            try:
                with open(path, "rb") as f:
                    if f.read(4) == SIGNATURE:
                        with open(DETECTION_FILE, "w") as d:
                            d.write("ENCRYPTED")
                        with open(BLOCK_FLAG, "w") as b:
                            b.write("BLOCKED")
                        print(f"Blocked encryption for {path}")
                        return
            except Exception:
                continue
    print("No encrypted files found.")


if __name__ == "__main__":
    scan_and_block()
