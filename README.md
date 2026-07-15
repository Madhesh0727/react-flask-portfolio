<div align="center">
  <img src="https://img.shields.io/badge/REACT-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/FLASK-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />

  <h1 align="center">MADHESH.EXE // PORTFOLIO</h1>

  <p align="center">
    A cyberpunk-themed, headless personal portfolio and auto-resume generator. Built for AI/ML engineers and cybersecurity researchers.
  </p>
</div>

---

## ⚡ Overview

**portfolio.exe** is a high-performance, cyberpunk-inspired personal portfolio. Unlike static portfolios, this project features a fully decoupled **Headless Architecture**. 

It consists of a sleek, animated **React (Vite) Frontend** that consumes data from a secure, custom-built **Flask Admin API**. Through the protected backend dashboard, you can dynamically update your bio, manage projects, write blog posts, review contact messages, and customize the site's theme colors. 

The system also includes an **Auto-Resume Engine** that instantly compiles your database entries into a downloadable, print-ready CV.

## 🚀 Features

*   **Cyberpunk Aesthetics:** Neon accents, glassmorphism, scanline overlays, and custom custom cursors powered by Tailwind CSS and Framer Motion.
*   **Secure Admin Dashboard:** A protected `/admin` route in Flask to manage projects, skills, timeline, and site settings natively.
*   **Auto-Generating Resume:** No need to format PDFs manually. Update your skills and experience in the admin dashboard, and the `/resume` route automatically generates a styled, printable resume.
*   **Headless API:** The Flask backend serves purely as a JSON REST API and Admin UI, allowing the React frontend to be hosted completely separately.
*   **Responsive Grid:** Fluid scaling from mobile up to ultra-wide (1600px) PC monitors.

## 🛠️ Tech Stack

### Frontend (Client)
*   **Framework:** React 18 (Vite)
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion
*   **Icons:** Custom SVG + FontAwesome

### Backend (Admin & API)
*   **Framework:** Flask (Python)
*   **Database:** SQLite (SQLAlchemy ORM)
*   **Forms:** Flask-WTF

---

## 💻 Running Locally

Because of the headless architecture, you need to run both the backend server and the frontend development server.

### 1. Start the Flask Backend (API & Admin)

Open a terminal and navigate to the project root:

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the backend (runs on http://localhost:5000)
python run.py
```

### 2. Start the React Frontend

Open a second terminal window in the project root:

```bash
# Install dependencies
npm install

# Run the frontend (runs on http://localhost:3000)
npm run dev
```

---

## 📂 Project Structure

```text
portfolio/
├── app.py                  # Flask application factory
├── run.py                  # Backend entry point
├── config.py               # Database and security configurations
├── routes/
│   ├── admin.py            # Protected dashboard routes
│   └── api.py              # Public JSON endpoints for React
├── models/                 # SQLAlchemy database models (Project, Skill, Settings, etc.)
├── templates/admin/        # Jinja2 templates for the Admin Dashboard
├── src/                    # React Frontend Source
│   ├── components/         # Reusable UI (Navbar, Footer, Animations)
│   ├── pages/              # Home, Projects, Skills, Resume, etc.
│   ├── App.jsx             # React Router and global layout wrapper
│   └── index.css           # Global Tailwind and custom Cyberpunk CSS classes
```

## 🔒 Security

*   The Admin panel is protected by session-based authentication.
*   Default SQLite database is used for rapid deployment, but the app natively supports Postgres via the `DATABASE_URL` environment variable.
