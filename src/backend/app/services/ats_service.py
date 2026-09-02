import re


SKILLS = {
    "python",
    "java",
    "javascript",
    "typescript",
    "c",
    "c++",
    "c#",
    "react",
    "node.js",
    "node",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "fastapi",
    "django",
    "flask",
    "spring boot",
    "rest api",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "git",
    "github",
    "jenkins",
    "terraform",
    "machine learning",
    "deep learning",
    "generative ai",
    "genai",
    "artificial intelligence",
    "pandas",
    "numpy",
    "scikit-learn",
    "tensorflow",
    "pytorch",
    "langchain",
    "openai",
    "html",
    "css",
    "tailwind",
    "power bi",
    "tableau",
}


def extract_skills(text: str) -> list[str]:
    """
    Extract known technical skills from text.
    """

    text = text.lower()

    found_skills = []

    for skill in SKILLS:

        # Escape special regex characters
        pattern = re.escape(skill)

        # Match the skill as a complete phrase
        if re.search(
            rf"(?<![\w+#]){pattern}(?![\w+#])",
            text,
        ):
            found_skills.append(skill)

    return sorted(set(found_skills))


def calculate_ats_score(
    job_description: str,
    resume_text: str,
) -> dict:
    """
    Compare job requirements with resume skills
    and calculate an ATS compatibility score.
    """

    job_skills = extract_skills(job_description)

    resume_skills = extract_skills(resume_text)

    matched_skills = [
        skill
        for skill in job_skills
        if skill in resume_skills
    ]

    missing_skills = [
        skill
        for skill in job_skills
        if skill not in resume_skills
    ]

    if not job_skills:
        score = 0
    else:
        score = round(
            (len(matched_skills) / len(job_skills)) * 100
        )

    return {
        "ats_score": score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
    }