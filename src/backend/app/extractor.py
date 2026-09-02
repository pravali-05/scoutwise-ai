import re


def extract_job_info(text: str):

    data = {
        "job_title": "Not Found",
        "company_name": "Not Found",
        "location": "Not Found",
        "experience": "Not Found",
        "salary": "Not Mentioned",
        "employment_type": "Not Mentioned",
        "email": "Not Mentioned",
        "website": "Not Mentioned",
        "skills": [],
    }

    # Job Title
    match = re.search(r"(?i)(Python Developer|Software Engineer|Data Scientist|AI Engineer|Frontend Developer|Backend Developer|Full Stack Developer)", text)

    if match:
        data["job_title"] = match.group()

    # Company
    match = re.search(r"Company\s*:\s*(.*)", text)

    if match:
        data["company_name"] = match.group(1).strip()

    # Location
    match = re.search(r"Location\s*:\s*(.*)", text)

    if match:
        data["location"] = match.group(1).strip()

    company_websites = {
        "OpenAI Technologies Pvt Ltd": "https://openai.com",
        "Microsoft": "https://microsoft.com",
        "Google": "https://google.com",
        "Amazon": "https://amazon.jobs",
        "Infosys": "https://infosys.com",
        "TCS": "https://tcs.com",
        "Wipro": "https://wipro.com",
    }
    if data["company_name"] in company_websites:
        data["website"] = company_websites[data["company_name"]]

    # Experience
    match = re.search(r"Experience\s*:\s*(.*)", text)

    if match:
        data["experience"] = match.group(1).strip()

    # Salary
    match = re.search(r"Salary\s*:\s*(.*)", text)

    if match:
        data["salary"] = match.group(1).strip()

    # Employment Type
    match = re.search(
        r"(Full Time|Part Time|Internship|Contract)",
        text,
        re.IGNORECASE,
    )

    if match:
        data["employment_type"] = match.group()

    # Email
    match = re.search(
        r"[\w\.-]+@[\w\.-]+\.\w+",
        text,
    )

    if match:
        data["email"] = match.group()

    # Website
    match = re.search(
        r"https?://[^\s]+",
        text,
    )

    if match:
        data["website"] = match.group()

    # Skills
    skills = [
        "Python",
        "SQL",
        "FastAPI",
        "Machine Learning",
        "Docker",
        "Git",
        "Linux",
        "PostgreSQL",
        "React",
        "Java",
        "AWS",
        "REST API",
    ]

    found = []

    for skill in skills:
        if skill.lower() in text.lower():
            found.append(skill)

    data["skills"] = found

    return data