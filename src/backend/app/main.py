import io
import os

from dotenv import load_dotenv

from fastapi import (
    Depends,
    FastAPI,
    File,
    Form,
    HTTPException,
    UploadFile,
)

from fastapi.middleware.cors import CORSMiddleware

from pypdf import PdfReader

import google.generativeai as genai

from app.database import (
    Base,
    SessionLocal,
    engine,
)

from app.extractor import extract_job_info

from app.news import get_company_news

from app.services.ats_service import calculate_ats_score

from app.auth.models import (
    JobAnalysis,
    User,
)

from app.auth.routes import router as auth_router

from app.auth.dependencies import get_current_user


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()


# =========================================================
# CREATE FASTAPI APP
# =========================================================

app = FastAPI(
    title="ScoutWise AI API",
    description=(
        "AI-powered fake job detection, "
        "job analysis and career assistant API"
    ),
    version="1.0.0",
)


# =========================================================
# GEMINI AI CONFIGURATION
# =========================================================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

ai_model = None

if GEMINI_API_KEY:

    try:

        genai.configure(
            api_key=GEMINI_API_KEY
        )

        ai_model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

        print(
            "Gemini API configured successfully."
        )

    except Exception as gemini_error:

        print(
            "Gemini initialization error:",
            str(gemini_error)
        )

        ai_model = None

else:

    print(
        "WARNING: GEMINI_API_KEY is not configured."
    )


# =========================================================
# CREATE DATABASE TABLES
# =========================================================

Base.metadata.create_all(
    bind=engine
)


# =========================================================
# AUTH ROUTES
# =========================================================

app.include_router(
    auth_router
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://scoutwise-ai-frontend.onrender.com",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message": "ScoutWise AI Backend Running",
        "status": "success",
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy",
        "service": "ScoutWise AI Backend",
    }


# =========================================================
# ASK AI
# =========================================================

@app.post("/ask-ai")
async def ask_ai(
    question: str = Form(...),
):

    try:

        # -------------------------------------------------
        # VALIDATE QUESTION
        # -------------------------------------------------

        if not question.strip():

            return {
                "success": False,
                "answer": "Please enter a question.",
            }


        # -------------------------------------------------
        # CHECK GEMINI
        # -------------------------------------------------

        if ai_model is None:

            return {
                "success": False,
                "answer": (
                    "Gemini API key is not configured. "
                    "Please configure GEMINI_API_KEY "
                    "in the backend .env file."
                ),
            }


        # -------------------------------------------------
        # DEBUG
        # -------------------------------------------------

        print("=" * 60)
        print("ASK AI REQUEST")
        print("Question:", question)
        print("=" * 60)


        # -------------------------------------------------
        # AI PROMPT
        # -------------------------------------------------

        prompt = f"""
You are ScoutWise AI, an intelligent career assistant.

Your job is to help users with:

1. Job searching
2. Resume improvement
3. ATS optimization
4. Interview preparation
5. Technical interview preparation
6. Job descriptions
7. Fake job detection
8. Career guidance
9. Skills required for jobs
10. Professional communication

Give accurate, helpful and easy-to-understand answers.

If the user asks a technical question,
explain it with examples when useful.

If the user asks about resumes,
give practical improvements.

If the user asks about interviews,
provide interview-ready answers.

User Question:

{question}
"""


        # -------------------------------------------------
        # GENERATE AI RESPONSE
        # -------------------------------------------------

        response = ai_model.generate_content(
            prompt
        )


        # -------------------------------------------------
        # GET RESPONSE TEXT
        # -------------------------------------------------

        answer = getattr(
            response,
            "text",
            None
        )


        if not answer:

            return {
                "success": False,
                "answer": (
                    "The AI did not return a response."
                ),
            }


        print(
            "AI response generated successfully."
        )


        return {
            "success": True,
            "answer": answer.strip(),
        }


    except Exception as error:

        print("=" * 60)
        print("ASK AI ERROR:")
        print(str(error))
        print("=" * 60)

        return {
            "success": False,
            "answer": (
                "Sorry, I could not process "
                "your question right now."
            ),
            "error": str(error),
        }


# =========================================================
# ANALYZE JOB
# =========================================================

@app.post("/analyze-job")
async def analyze_job(

    description: str = Form(...),

    file: UploadFile | None = File(default=None),

    resume: UploadFile | None = File(default=None),

    current_user: User = Depends(
        get_current_user
    ),
):

    db = SessionLocal()

    try:

        # =================================================
        # AUTHENTICATED USER
        # =================================================

        print("=" * 60)
        print("ANALYZE JOB REQUEST")

        print(
            "Authenticated user ID:",
            current_user.id
        )

        print(
            "Authenticated user:",
            current_user.email
        )

        print("=" * 60)


        # =================================================
        # READ JOB DESCRIPTION
        # =================================================

        text = description or ""


        # =================================================
        # READ JOB FILE
        # =================================================

        if file is not None and file.filename:

            print(
                "Job file:",
                file.filename
            )

            file_content = await file.read()


            # -------------------------------------------------
            # PDF FILE
            # -------------------------------------------------

            if file.filename.lower().endswith(
                ".pdf"
            ):

                pdf = PdfReader(
                    io.BytesIO(
                        file_content
                    )
                )

                extracted_text = ""

                for page in pdf.pages:

                    page_text = page.extract_text()

                    if page_text:

                        extracted_text += page_text

                text = extracted_text


            # -------------------------------------------------
            # TEXT FILE
            # -------------------------------------------------

            else:

                text = file_content.decode(
                    "utf-8",
                    errors="ignore",
                )


        # =================================================
        # VALIDATE JOB DESCRIPTION
        # =================================================

        if not text.strip():

            return {
                "success": False,
                "error": "Empty job description",
                "message": (
                    "Please enter a job description "
                    "or upload a job description file."
                ),
            }


        print(
            "Job description received."
        )

        print(
            "Job description length:",
            len(text)
        )


        # =================================================
        # READ RESUME
        # =================================================

        resume_text = ""


        if resume is not None and resume.filename:

            print(
                "Resume:",
                resume.filename
            )

            resume_content = await resume.read()


            # -------------------------------------------------
            # RESUME PDF
            # -------------------------------------------------

            if resume.filename.lower().endswith(
                ".pdf"
            ):

                pdf = PdfReader(
                    io.BytesIO(
                        resume_content
                    )
                )

                for page in pdf.pages:

                    page_text = page.extract_text()

                    if page_text:

                        resume_text += page_text


            # -------------------------------------------------
            # RESUME TEXT
            # -------------------------------------------------

            else:

                resume_text = resume_content.decode(
                    "utf-8",
                    errors="ignore",
                )


        print(
            "Resume length:",
            len(resume_text)
        )


        # =================================================
        # EXTRACT JOB INFORMATION
        # =================================================

        try:

            job_info = extract_job_info(
                text
            )

            if not isinstance(
                job_info,
                dict
            ):

                job_info = {}

        except Exception as extractor_error:

            print(
                "Job extraction error:",
                str(extractor_error)
            )

            job_info = {}


        print(
            "Extracted job information:"
        )

        print(
            job_info
        )


        # =================================================
        # SAFE JOB INFORMATION
        # =================================================

        job_title = job_info.get(
            "job_title",
            "Not Found",
        )

        company_name = job_info.get(
            "company_name",
            "Not Found",
        )

        location = job_info.get(
            "location",
            "Not Found",
        )

        experience = job_info.get(
            "experience",
            "Not Found",
        )

        salary = job_info.get(
            "salary",
            "Not Found",
        )

        employment_type = job_info.get(
            "employment_type",
            "Not Found",
        )

        skills = job_info.get(
            "skills",
            [],
        )

        email = job_info.get(
            "email",
            "",
        )

        website = job_info.get(
            "website",
            "",
        )


        # =================================================
        # COMPANY NEWS
        # =================================================

        try:

            company_news = get_company_news(
                company_name
            )

        except Exception as news_error:

            print(
                "Company news error:",
                str(news_error)
            )

            company_news = []


        # =================================================
        # LOWERCASE JOB DESCRIPTION
        # =================================================

        lower = text.lower()


        # =================================================
        # DEFAULT RISK
        # =================================================

        risk = "15%"

        status = "Genuine"

        company = "Verified"


        # =================================================
        # FAKE JOB DETECTION
        # =================================================

        scam_phrases = [

            "pay registration fee",

            "registration fee",

            "send money",

            "pay money",

            "processing fee",

            "security deposit",

            "urgent hiring",

            "pay to apply",

            "pay for interview",

            "guaranteed job",

        ]


        detected_scam_phrases = []


        for phrase in scam_phrases:

            if phrase in lower:

                detected_scam_phrases.append(
                    phrase
                )


        if detected_scam_phrases:

            risk = "92%"

            status = "Fake"

            company = "Not Verified"


        # =================================================
        # SCAM INDICATORS
        # =================================================

        indicators = []


        if "urgent hiring" in lower:

            indicators.append(
                "⚠️ Urgent hiring phrase detected"
            )


        if "pay registration fee" in lower:

            indicators.append(
                "⚠️ Registration fee requested"
            )


        if "registration fee" in lower:

            indicators.append(
                "⚠️ Registration/payment requirement detected"
            )


        if "send money" in lower:

            indicators.append(
                "⚠️ Asking candidate to send money"
            )


        if "processing fee" in lower:

            indicators.append(
                "⚠️ Processing fee detected"
            )


        if "security deposit" in lower:

            indicators.append(
                "⚠️ Security deposit requested"
            )


        if "gmail.com" in lower:

            indicators.append(
                "⚠️ Personal Gmail address detected"
            )


        if "yahoo.com" in lower:

            indicators.append(
                "⚠️ Personal Yahoo email detected"
            )


        if "career" in lower:

            indicators.append(
                "✅ Career-related content detected"
            )


        if "python" in lower:

            indicators.append(
                "✅ Python requirement found"
            )


        if "fastapi" in lower:

            indicators.append(
                "✅ FastAPI/backend technology identified"
            )


        if "docker" in lower:

            indicators.append(
                "✅ Docker technology mentioned"
            )


        if "postgresql" in lower:

            indicators.append(
                "✅ PostgreSQL/database technology mentioned"
            )


        if "git" in lower:

            indicators.append(
                "✅ Git/version control mentioned"
            )


        if not indicators:

            indicators.append(
                "✅ No major scam indicators detected"
            )


        # =================================================
        # AI EXPLANATION
        # =================================================

        if status == "Fake":

            ai_explanation = (
                "This job appears suspicious because "
                "one or more scam indicators were detected. "
                "These may include payment requests, urgent "
                "hiring language, unofficial contact details, "
                "or requests for money."
            )

        else:

            ai_explanation = (
                "This job appears genuine because no major "
                "scam indicators were detected. The job "
                "description contains standard employment "
                "information and technical requirements."
            )


        # =================================================
        # OPTIONAL GEMINI EXPLANATION
        # =================================================

        if ai_model is not None:

            try:

                ai_prompt = f"""
Analyze this job posting for possible scam indicators.

Job Description:
{text}

Current automated result:
Status: {status}
Risk Score: {risk}

Detected indicators:
{indicators}

Give a short, easy-to-understand explanation for the user.
Do not claim that a job is definitely genuine or definitely
fraudulent. Explain that the result is an assessment.
"""

                ai_response = ai_model.generate_content(
                    ai_prompt
                )

                generated_text = getattr(
                    ai_response,
                    "text",
                    None
                )

                if generated_text:

                    ai_explanation = generated_text.strip()

            except Exception as ai_error:

                print(
                    "Gemini analysis error:",
                    str(ai_error)
                )


        # =================================================
        # ATS SCORE
        # =================================================

        ats_score = 0

        matched_skills = []

        missing_skills = []


        if resume_text.strip():

            try:

                ats_result = calculate_ats_score(
                    text,
                    resume_text,
                )


                # ---------------------------------------------
                # ATS SERVICE RETURNS DICTIONARY
                # ---------------------------------------------

                if isinstance(
                    ats_result,
                    dict
                ):

                    ats_score = ats_result.get(
                        "ats_score",
                        0,
                    )

                    matched_skills = ats_result.get(
                        "matched_skills",
                        [],
                    )

                    missing_skills = ats_result.get(
                        "missing_skills",
                        [],
                    )


                # ---------------------------------------------
                # ATS SERVICE RETURNS NUMBER
                # ---------------------------------------------

                elif isinstance(
                    ats_result,
                    (int, float)
                ):

                    ats_score = ats_result


            except Exception as ats_error:

                print(
                    "ATS error:",
                    str(ats_error)
                )

                ats_score = 0

                matched_skills = []

                missing_skills = []


        # =================================================
        # SAVE ANALYSIS TO DATABASE
        # =================================================

        analysis = JobAnalysis(

            user_id=current_user.id,

            job_title=job_title,

            company_name=company_name,

            location=location,

            risk_score=risk,

            status=status,

            ats_score=ats_score,

            job_description=text,

        )


        db.add(
            analysis
        )


        db.commit()


        db.refresh(
            analysis
        )


        print(
            "Analysis saved successfully."
        )

        print(
            "Analysis ID:",
            analysis.id
        )

        print(
            "Saved user ID:",
            current_user.id
        )


        # =================================================
        # RETURN RESULT
        # =================================================

        return {

            "success": True,

            "message": (
                "Job analyzed successfully"
            ),

            "analysis_id": analysis.id,

            "user_id": current_user.id,

            "risk_score": risk,

            "status": status,

            "company": company,

            "job_title": job_title,

            "company_name": company_name,

            "location": location,

            "experience": experience,

            "salary": salary,

            "employment_type": employment_type,

            "skills": skills,

            "email": email,

            "website": website,

            "news": company_news,

            "ats_score": ats_score,

            "matched_skills": matched_skills,

            "missing_skills": missing_skills,

            "indicators": indicators,

            "ai_explanation": ai_explanation,

        }


    except Exception as error:

        db.rollback()

        print("=" * 60)

        print(
            "ANALYZE JOB ERROR:"
        )

        print(
            str(error)
        )

        print("=" * 60)


        return {

            "success": False,

            "error": "Job analysis failed",

            "message": str(error),

        }


    finally:

        db.close()