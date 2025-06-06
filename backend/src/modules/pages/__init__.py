import tkinter as tk
from tkinter import Toplevel, Label

def _open_window(title, message, master):
    win = Toplevel(master)
    win.title(title)
    win.geometry("600x400")
    Label(win, text=message, font=("Arial", 14)).pack(pady=40)

def open_theory(master):
    _open_window("תיאוריה", "כאן יוצג תוכן תיאורטי", master)

def open_simulation(master):
    _open_window("סימולציות", "כאן תתבצע הסימולציה", master)

def open_practice(master):
    _open_window("תרגול מעשי", "כאן יתבצע תרגול מעשי", master)

def open_tools(master):
    _open_window("כלים נוספים", "כאן יהיו כלים נוספים", master)

def open_summary(master):
    _open_window("סיכום וסטטיסטיקות", "כאן יוצגו סיכום וסטטיסטיקות", master)
