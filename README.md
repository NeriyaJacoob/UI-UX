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
2. Copy `.env.example` to `.env` and edit the address if your backend runs on a
   different host or port:
   ```bash
   cp frontend/.env.example frontend/.env
   # edit frontend/.env if needed
   ```
3. Start the React development server which automatically loads the variable:
   ```bash
   npm start --prefix frontend
   ```

## Running
1. Start the Flask backend (from the repository root):
   ```bash
   source venv/bin/activate
   cd backend/src
   python3 api.py
   ```
2. In another terminal, start the React frontend as shown above.

