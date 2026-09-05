# ScoutWise AI

**AI-Powered Fake Job Detection & Career Assistant**

ScoutWise AI is a full-stack web application designed to help users evaluate job postings, identify potential scam indicators, and improve their job-search readiness. It combines automated job analysis, AI-powered explanations, company information, and resume-to-job ATS matching in one platform.

## 🚀 Live Application

**Frontend:**
https://scoutwise-ai-frontend.onrender.com

**Backend API:**
https://scoutwise-ai.onrender.com

**API Documentation:**
https://scoutwise-ai.onrender.com/docs

---

## ✨ Features

### 🔍 Fake Job Detection

Analyze job descriptions and identify potential scam indicators such as:

* Registration or processing fees
* Requests to send money
* Security deposits
* Urgent hiring language
* Guaranteed job claims
* Suspicious contact information

The application provides a risk score and an assessment of whether the posting appears suspicious.

### 📄 Job Description Analysis

Users can:

* Paste a job description
* Upload a job description file
* Extract important job information
* Identify required skills
* View salary and experience information when available
* View company-related information

### 📑 Resume & ATS Matching

Users can upload their resume and compare it against a job description.

The application provides:

* ATS score
* Matched skills
* Missing skills
* Resume-to-job compatibility insights

### 🤖 AI Career Assistant

ScoutWise AI includes an AI-powered career assistant that can help with:

* Resume improvement
* ATS optimization
* Interview preparation
* Technical interview preparation
* Job-search guidance
* Career guidance
* Job description understanding

### 🔐 Authentication

The application includes:

* User registration
* Secure login
* Password hashing using bcrypt
* JWT-based authentication
* Protected job-analysis endpoints

### 🗄️ Persistent Data

Job analyses are stored in PostgreSQL and associated with authenticated users.

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* JavaScript/TypeScript ecosystem

### Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* PostgreSQL

### AI & Machine Learning

* Google Gemini
* Google Generative AI
* scikit-learn
* NumPy
* Pandas
* Joblib

### Authentication & Security

* JWT
* PyJWT
* Passlib
* bcrypt

### Document Processing

* pypdf

### Deployment

* Render
* GitHub

---

## 🏗️ Project Architecture

```text
ScoutWise AI
│
├── Frontend
│   ├── React
│   ├── TypeScript
│   ├── Vite
│   └── UI Components
│
├── Backend
│   ├── FastAPI
│   ├── Authentication
│   ├── Job Analysis
│   ├── ATS Analysis
│   ├── Company Verification
│   ├── Company News
│   └── AI Career Assistant
│
├── AI / ML
│   ├── Gemini
│   ├── NLP Processing
│   └── Machine Learning
│
└── Database
    └── PostgreSQL
```

---

## 🔄 Application Workflow

```text
User
  │
  ▼
React Frontend
  │
  ▼
FastAPI Backend
  │
  ├── Authentication
  │
  ├── Job Description Extraction
  │
  ├── Scam Indicator Detection
  │
  ├── Company Information
  │
  ├── Gemini AI Analysis
  │
  ├── Resume / ATS Matching
  │
  ▼
PostgreSQL Database
  │
  ▼
Analysis Result
  │
  ▼
React Dashboard
```

---

## 📁 Project Structure

```text
scoutwise-ai/
│
├── public/
│
├── src/
│   ├── backend/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   ├── models/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   ├── services_old/
│   │   │   ├── database.py
│   │   │   ├── extractor.py
│   │   │   ├── main.py
│   │   │   └── news.py
│   │   │
│   │   ├── requirements.txt
│   │   └── runtime.txt
│   │
│   └── frontend components...
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/pravali-05/scoutwise-ai.git
cd scoutwise-ai
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure backend

Create a `.env` file for local development.

```env
DATABASE_URL=your_postgresql_database_url
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET_KEY=your_jwt_secret
```

**Never commit `.env` to GitHub.**

### 4. Install Python dependencies

```bash
cd src/backend
pip install -r requirements.txt
```

### 5. Start the backend

From the backend directory:

```bash
uvicorn app.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

### 6. Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

The application uses environment variables for sensitive configuration.

```env
DATABASE_URL=
GEMINI_API_KEY=
JWT_SECRET_KEY=
```

Sensitive values should be configured through the deployment platform's environment-variable settings rather than committed to source control.

---

## ☁️ Deployment

The application is deployed using **Render**.

### Frontend

```text
Build Command:
npm install && npm run build

Publish Directory:
dist
```

### Backend

```text
Build Command:
pip install -r requirements.txt

Start Command:
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

The backend uses PostgreSQL through the `DATABASE_URL` environment variable.

---

## 🔒 Security

ScoutWise AI follows several basic security practices:

* Passwords are hashed using bcrypt.
* JWT tokens are used for authentication.
* Protected endpoints require authentication.
* Database credentials are stored using environment variables.
* Gemini API credentials are stored using environment variables.
* `.env` files are excluded from Git.
* Sensitive configuration is not committed to the repository.

---

## 📌 Important Note

ScoutWise AI provides an automated assessment of job postings. A result should not be treated as definitive proof that a job is genuine or fraudulent. Users should independently verify employers and job opportunities before sharing personal information or making payments.

---

## 🚧 Future Enhancements

Potential future improvements include:

* More advanced machine-learning-based scam detection
* Improved company verification
* More detailed resume recommendations
* Job recommendation features
* Advanced analytics dashboard
* Email/domain verification
* Improved explainability for risk scores
* More comprehensive interview preparation

---

## 👩‍💻 Author

**Kummetha Pravallika**

Computer Science & Engineering Student

GitHub:
https://github.com/pravali-05

---

## ⭐ Project

If you find ScoutWise AI useful, consider giving the repository a star.

**ScoutWise AI — Making Job Searching Safer and Smarter.**
