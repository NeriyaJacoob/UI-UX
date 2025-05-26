import tkinter as tk
from tkinter import ttk
from modules.pages import (
    open_theory, open_simulation, open_practice,
    open_tools, open_summary
)

def start_ui():
    root = tk.Tk()
    root.title("ByteMe – לומדת סימולציית Ransomware")
    root.attributes('-fullscreen', True)  # מסך מלא

    # צבעים ועיצוב מודרני
    root.configure(bg="#f0f4f8")
    
    # סגנון כפתורים וכותרות
    style = ttk.Style()
    style.configure('TButton', font=("Arial", 14), padding=10)
    style.configure('Header.TLabel', font=("Arial", 24, "bold"), background="#f0f4f8")

    # כותרת ראשית
    ttk.Label(root, text="🧠 ByteMe – מערכת הדמיית Ransomware", style='Header.TLabel').pack(pady=40)

    # מסגרת למרכז כפתורי ניווט
    nav_frame = ttk.Frame(root, padding=20, style='TFrame')
    nav_frame.pack(expand=True)

    buttons = [
        ("📘 תיאוריה כללית", open_theory),
        ("💣 סימולציות", open_simulation),
        ("🧪 תרגול מעשי", open_practice),
        ("🛠️ כלים נוספים", open_tools),
        ("📊 סיכום וסטטיסטיקות", open_summary),
        ("🚪 יציאה מהלומדה", lambda _: root.destroy())
    ]

    for label, command in buttons:
        btn = ttk.Button(nav_frame, text=label, command=lambda cmd=command: cmd(root))
        btn.pack(pady=10, ipadx=20, fill='x')

    root.mainloop()
