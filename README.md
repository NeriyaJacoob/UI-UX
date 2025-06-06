# Project Setup
Run `./setup_env.sh` after cloning to install all dependencies.


This repository contains a Flask backend and a React frontend.

## Prerequisites
Alternatively run `./setup_env.sh` to install everything automatically.

- **Python 3.8+**
- **Node.js 18+** and **npm**

## Python Environment
1. Create a virtual environment in the repository root:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Frontend
1. Install Node dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. When running the React app, specify the backend URL using `REACT_APP_API_BASE`:
   ```bash
   REACT_APP_API_BASE=http://localhost:5000 npm start
   ```
   Adjust the URL if your backend runs on a different host or port.

## Running
1. Start the Flask backend (from the repository root):
   ```bash
   source venv/bin/activate
   cd backend/src
   python3 api.py
   ```
2. In another terminal, start the React frontend as shown above.

