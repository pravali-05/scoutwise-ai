import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  Upload,
  Search,
  Building2,
  BarChart3,
  LogOut,
  User,
} from "lucide-react";

import JobAnalyzer from "../components/Dashboard/JobAnalyzer";

interface LoggedInUser {
  id: number;
  name: string;
  email: string;
}

export default function Dashboard() {
  const navigate = useNavigate();

  // =========================
  // STATE
  // =========================

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // =========================
  // CHECK LOGIN
  // =========================

  const storedUser = localStorage.getItem("user");

  let user: LoggedInUser | null = null;

  if (storedUser) {
    try {
      user = JSON.parse(storedUser) as LoggedInUser;
    } catch (error) {
      console.error("Invalid user data:", error);
      localStorage.removeItem("user");
    }
  }
  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // =========================
  // AI ASSISTANT
  // =========================

  const handleSend = () => {
    if (!question.trim()) {
      setAnswer("Please ask a question.");
      return;
    }

    const q = question.toLowerCase();

    if (
      q.includes("skill") ||
      q.includes("learn") ||
      q.includes("improve")
    ) {
      setAnswer(
        "Recommended skills: Python, SQL, FastAPI, Docker, Kubernetes, Git and AWS."
      );
    } else if (
      q.includes("salary") ||
      q.includes("package") ||
      q.includes("pay")
    ) {
      setAnswer(
        "The offered salary appears competitive for this role based on current market standards."
      );
    } else if (
      q.includes("fake") ||
      q.includes("scam") ||
      q.includes("safe")
    ) {
      setAnswer(
        "Use the Job Analyzer below to check scam indicators, risk score and company information before applying."
      );
    } else if (q.includes("company")) {
      setAnswer(
        "The company information can be checked using the Company Verification section in the Job Analyzer."
      );
    } else if (
      q.includes("resume") ||
      q.includes("ats")
    ) {
      setAnswer(
        "Upload your resume and job description in the Job Analyzer to calculate the ATS score and identify matched and missing skills."
      );
    } else if (q.includes("interview")) {
      setAnswer(
        "Prepare Python, SQL, DBMS, Operating Systems, OOPs and FastAPI interview questions."
      );
    } else if (q.includes("experience")) {
      setAnswer(
        "Highlight your internships, projects, technical skills and practical experience in your resume."
      );
    } else if (q.includes("job")) {
      setAnswer(
        "Use the Job Analyzer below to check the job's risk score, scam indicators, company information and ATS match."
      );
    } else if (
      q.includes("hello") ||
      q.includes("hi")
    ) {
      setAnswer(
        "Hello! 👋 I'm MyGenie AI. How can I help you with your career today?"
      );
    } else {
      setAnswer(
        "I'm MyGenie AI. Ask me about jobs, companies, resumes, ATS scores, interview preparation, salaries or technical skills."
      );
    }

    setQuestion("");
  };

  // =========================
  // DASHBOARD TOOLS
  // =========================

  const tools = [
    {
      icon: Search,
      title: "Analyze Job",
      description:
        "Check job description for fake job signals.",
    },
    {
      icon: Upload,
      title: "Upload Resume",
      description:
        "Match your resume with job requirements.",
    },
    {
      icon: Building2,
      title: "Company Verification",
      description:
        "Check company reputation and trust score.",
    },
    {
      icon: BarChart3,
      title: "Risk Report",
      description:
        "View AI generated safety report.",
    },
  ];

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-8 flex items-center justify-between">

          {/* Logo + Welcome */}

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Bot size={32} />
            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome
                {user?.name ? `, ${user.name}` : ""}! 🚀
              </h1>

              <p className="mt-1 text-gray-600 dark:text-slate-300">
                Your AI assistant for safe job hunting
              </p>

            </div>

          </div>

          {/* User + Logout */}

          <div className="flex items-center gap-3">

            {user && (
              <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-900 md:flex">

                <User
                  size={18}
                  className="text-blue-600 dark:text-blue-400"
                />

                <div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user.name}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {user.email}
                  </p>

                </div>

              </div>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

        {/* =========================
            AI ASSISTANT
        ========================== */}

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            MyGenie AI Assistant
          </h2>

          <p className="mt-2 text-gray-600 dark:text-slate-300">
            Ask anything about jobs, companies and career safety.
          </p>

          {/* Welcome Message */}

          <div className="mt-6 rounded-xl bg-slate-100 p-5 text-slate-800 dark:bg-slate-800 dark:text-slate-200">

            👋 Hi{user?.name ? ` ${user.name}` : ""}!

            <br />

            I am MyGenie. I can help you analyze job opportunities.

          </div>

          {/* Question Input */}

          <div className="mt-5 flex gap-3">

            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Ask MyGenie..."
              className="flex-1 rounded-xl border border-gray-300 bg-white p-3 text-slate-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />

            <button
              onClick={handleSend}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Send
            </button>

          </div>

          {/* AI Answer */}

          {answer && (
            <div className="mt-5 rounded-xl bg-blue-50 p-5 dark:bg-blue-950/50">

              <h3 className="font-bold text-blue-700 dark:text-blue-400">
                🤖 MyGenie
              </h3>

              <p className="mt-2 text-slate-700 dark:text-slate-200">
                {answer}
              </p>

            </div>
          )}

        </div>

        {/* =========================
            JOB ANALYZER
        ========================== */}

        <div className="mt-8">
          <JobAnalyzer />
        </div>

        {/* =========================
            TOOLS
        ========================== */}

        <div className="mt-10 grid gap-6 md:grid-cols-4">

          {tools.map((tool) => {

            const Icon = tool.icon;

            return (
              <div
                key={tool.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
              >

                <div className="w-fit rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                  {tool.title}
                </h3>

                <p className="mt-2 text-gray-600 dark:text-slate-300">
                  {tool.description}
                </p>

              </div>
            );

          })}

        </div>

      </div>
    </div>
  );
}