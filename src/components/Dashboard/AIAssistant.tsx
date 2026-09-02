import { useState } from "react";
import { Bot, Send } from "lucide-react";

export default function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAskAI = () => {
    if (!question.trim()) {
      setAnswer("Please enter a question first.");
      return;
    }

    const q = question.toLowerCase();

    if (
      q.includes("fake") ||
      q.includes("scam") ||
      q.includes("safe")
    ) {
      setAnswer(
        "I recommend checking the company website, recruiter email, salary details, and payment requests before applying. Never pay registration or interview fees."
      );
    } else if (
      q.includes("resume") ||
      q.includes("ats")
    ) {
      setAnswer(
        "To improve your ATS score, include relevant technical skills from the job description, use clear headings, and avoid unnecessary graphics or tables."
      );
    } else if (
      q.includes("salary") ||
      q.includes("package")
    ) {
      setAnswer(
        "Compare the offered salary with similar roles and locations. If the salary is unusually high compared with the job requirements, verify the employer carefully."
      );
    } else if (
      q.includes("company")
    ) {
      setAnswer(
        "You can verify a company by checking its official website, LinkedIn presence, employee reviews, domain email, and recent company news."
      );
    } else if (
      q.includes("interview")
    ) {
      setAnswer(
        "For technical interviews, prepare Python, SQL, DBMS, OOP, operating systems, projects, and problem-solving questions."
      );
    } else if (
      q.includes("skill") ||
      q.includes("learn")
    ) {
      setAnswer(
        "For a data and AI career, focus on Python, SQL, Pandas, NumPy, Machine Learning, FastAPI, Git, Docker, and cloud fundamentals."
      );
    } else if (
      q.includes("hello") ||
      q.includes("hi")
    ) {
      setAnswer(
        "Hello! 👋 I'm MyGenie AI. How can I help you with your job search today?"
      );
    } else {
      setAnswer(
        "I'm MyGenie AI. You can ask me about fake jobs, company verification, salary, resumes, ATS scores, interviews, or technical skills."
      );
    }

    setQuestion("");
  };

  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition-colors dark:border-slate-700 dark:bg-slate-800">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-blue-100 p-4 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
          <Bot size={32} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            MyGenie AI Assistant
          </h2>

          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Ask questions about jobs, companies, resumes and career safety.
          </p>
        </div>

      </div>

      {/* Assistant Message */}
      <div className="mt-6 rounded-2xl bg-slate-100 p-5 text-slate-700 dark:bg-slate-700 dark:text-gray-200">
        👋 Hi! I'm MyGenie AI.

        <br />

        <span className="text-sm">
          I can help you make safer and smarter career decisions.
        </span>
      </div>

      {/* Input */}
      <div className="mt-6 flex flex-col gap-3 md:flex-row">

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask MyGenie anything..."
          rows={3}
          className="flex-1 resize-none rounded-xl border border-slate-300 bg-white p-4 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />

        <button
          onClick={handleAskAI}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Send size={18} />
          Ask AI
        </button>

      </div>

      {/* AI Response */}
      {answer && (
        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-900/30">

          <div className="flex items-center gap-2">

            <Bot size={20} className="text-blue-600 dark:text-blue-400" />

            <h3 className="font-bold text-blue-700 dark:text-blue-400">
              MyGenie AI
            </h3>

          </div>

          <p className="mt-3 leading-relaxed text-slate-700 dark:text-gray-200">
            {answer}
          </p>

        </div>
      )}

    </section>
  );
}