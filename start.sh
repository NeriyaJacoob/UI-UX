#!/bin/bash

# פתיחת Flask API
gnome-terminal -- bash -c "cd backend && source venv/bin/activate && cd src && python api.py; exec bash"

# פתיחת React
gnome-terminal -- bash -c "cd frontend && npm start; exec bash"
