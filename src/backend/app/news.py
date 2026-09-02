def get_company_news(company: str):
    
    news = {
        "OpenAI Technologies Pvt Ltd": [
            "OpenAI announced new AI products.",
            "OpenAI continues hiring AI Engineers.",
            "OpenAI expands enterprise partnerships."
        ],

        "Microsoft": [
            "Microsoft invests in AI infrastructure.",
            "Microsoft expands Azure services."
        ],

        "Google": [
            "Google launches new Gemini AI features.",
            "Google announces cloud expansion."
        ]
    }

    return news.get(company, [
        "No recent news available."
    ])