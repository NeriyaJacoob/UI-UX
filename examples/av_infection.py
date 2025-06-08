#!/usr/bin/env python3
"""Simple standalone antivirus example for infection detection."""
import os

DETECTION_FILE = "/tmp/detection_result.txt"
BLOCK_FLAG = "/tmp/block_ransom"
TARGET_DIR = os.path.join("/tmp", "TestInfected")
INFECTION_MARKER = "#infected"


def scan_and_block():
    detected = False
    for root, _, files in os.walk(TARGET_DIR):
        for name in files:
            path = os.path.join(root, name)
            try:
                with open(path, "r", encoding="utf-8", errors="ignore") as f:
                    if INFECTION_MARKER in f.read():
                        print(f"Suspicious code found in {path}")
                        detected = True
                        break
            except Exception:
                continue
        if detected:
            break

    if detected:
        with open(DETECTION_FILE, "w") as f:
            f.write("INFECTED")
        with open(BLOCK_FLAG, "w") as f:
            f.write("BLOCKED")
        print("Threat blocked.")
    else:
        print("No infection detected.")


if __name__ == "__main__":
    scan_and_block()
