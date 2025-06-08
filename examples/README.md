# Example Antivirus Scripts

These standalone Python scripts demonstrate simple antivirus behaviors for the practice tasks. They are **not** integrated with the main project and can be run separately.

- `av_infection.py` – scans the sample `TestInfected` directory for injected code and blocks the threat if found.
- `av_encrypt.py` – checks the `data` directory for encrypted files and blocks encryption attempts.
- `av_decrypt.py` – decrypts files that were previously encrypted with the provided key.

Each script writes detection to `/tmp/detection_result.txt` and blocks using `/tmp/block_ransom` similar to the project conventions.
