import { useState } from "react";
import { Bot, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // =========================
  // STATE
  // =========================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await 
      fetch("https://scoutwise-ai.onrender.com/auth/login", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      // =========================
      // BACKEND ERROR
      // =========================

      if (!response.ok) {
        alert(
          data.detail ||
            "Invalid email or password."
        );
        return;
      }

      // =========================
      // SAVE USER
      // =========================

      const loggedInUser = {
        id: data.user_id,
        name: data.name,
        email: data.email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      console.log(
        "Saved user:",
        localStorage.getItem("user")
      );

      console.log(
        "Access token saved:",
        !!localStorage.getItem("access_token")
      );

      // =========================
      // SUCCESS
      // =========================

      alert("Login successful! 🎉");

      navigate("/dashboard");

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      alert(
        "Cannot connect to FastAPI backend."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 transition-colors duration-300 dark:bg-slate-950">

      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

        {/* =========================
            LOGO
        ========================== */}

        <div className="flex justify-center">

          <div className="rounded-2xl bg-blue-100 p-4 text-blue-600 dark:bg-blue-950 dark:text-blue-400">

            <Bot size={40} />

          </div>

        </div>

        {/* =========================
            HEADING
        ========================== */}

        <h1 className="mt-6 text-center text-3xl font-bold text-slate-900 dark:text-white">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-center text-gray-600 dark:text-slate-300">
          Login to your MyGenie AI Assistant
        </p>

        {/* =========================
            FORM
        ========================== */}

        <div className="mt-8 space-y-5">

          {/* =========================
              EMAIL
          ========================== */}

          <div>

            <label className="text-sm font-medium text-slate-900 dark:text-slate-200">
              Email
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-gray-300 bg-white px-4 dark:border-slate-600 dark:bg-slate-800">

              <Mail
                size={20}
                className="text-gray-400 dark:text-slate-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                disabled={loading}
                className="w-full bg-transparent p-3 text-slate-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60 dark:text-white dark:placeholder:text-slate-500"
              />

            </div>

          </div>

          {/* =========================
              PASSWORD
          ========================== */}

          <div>

            <label className="text-sm font-medium text-slate-900 dark:text-slate-200">
              Password
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-gray-300 bg-white px-4 dark:border-slate-600 dark:bg-slate-800">

              <Lock
                size={20}
                className="text-gray-400 dark:text-slate-400"
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !loading
                  ) {
                    handleLogin();
                  }
                }}
                placeholder="Enter your password"
                disabled={loading}
                className="w-full bg-transparent p-3 text-slate-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60 dark:text-white dark:placeholder:text-slate-500"
              />

            </div>

          </div>

          {/* =========================
              LOGIN BUTTON
          ========================== */}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

          {/* =========================
              OR
          ========================== */}

          <div className="flex items-center gap-3">

            <div className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />

            <span className="text-sm text-gray-400 dark:text-slate-500">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />

          </div>

          {/* =========================
              GOOGLE
          ========================== */}

          <button
            type="button"
            className="w-full rounded-xl border border-gray-300 bg-white py-3 font-semibold text-slate-900 transition hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            Continue with Google
          </button>

        </div>

        {/* =========================
            REGISTER
        ========================== */}

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-slate-300">

          Don't have an account?

          <span
            onClick={() =>
              !loading &&
              navigate("/register")
            }
            className="ml-1 cursor-pointer font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Register
          </span>

        </p>

      </div>

    </div>
  );
}