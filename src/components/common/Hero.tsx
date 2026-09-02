import { Link } from "react-router-dom";
import { Sparkles, Bot } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-6 py-20 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

      {/* Animated Background */}
      <AnimatedBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-600 dark:bg-blue-950 dark:text-blue-300">

            <Sparkles size={18} />

            <span className="text-sm font-medium">
              AI Powered Job Verification
            </span>

          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight md:text-6xl">

            Your{" "}

            <span className="text-blue-600 dark:text-blue-400">
              AI Assistant
            </span>

            <br />

            For Safe Job Hunting 🚀

          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-300">

            Avoid fake job postings with AI-powered analysis.
            Verify companies, detect scam patterns,
            analyze salaries and get smart recommendations
            before you apply.

          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">

            <Link
              to="/dashboard"
              className="rounded-xl bg-blue-600 px-8 py-4 text-white transition hover:bg-blue-700"
            >
              Analyze Job
            </Link>

            <button
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-slate-900 transition hover:bg-gray-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
            >
              Watch Demo
            </button>

          </div>

        </motion.div>


        {/* Right AI Card */}
        <div className="flex justify-center">

          <div className="relative w-full max-w-md">

            {/* Main AI Card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

              {/* AI Header */}
              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-blue-100 p-4 text-blue-600 dark:bg-blue-950 dark:text-blue-400">

                  <Bot size={40} />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    MyGenie AI Assistant
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Online • Ready to help
                  </p>

                </div>

              </div>


              {/* Chat Messages */}
              <div className="mt-8 space-y-4">

                {/* User / Greeting */}
                <div className="rounded-xl bg-gray-100 p-4 text-slate-800 dark:bg-slate-800 dark:text-slate-100">

                  👋 Hi! I'm MyGenie AI.

                </div>


                {/* AI Response */}
                <div className="ml-8 rounded-xl bg-blue-600 p-4 text-white">

                  I can analyze job postings for risks.

                </div>


                {/* Analysis Result */}
                <div className="rounded-xl bg-gray-100 p-4 text-slate-800 dark:bg-slate-800 dark:text-slate-100">

                  <p>✅ Company verified</p>

                  <p>✅ Salary analyzed</p>

                  <p>✅ Scam detection completed</p>

                </div>

              </div>

            </div>


            {/* Glow Effect */}
            <div className="absolute -right-10 -top-10 -z-10 h-72 w-72 rounded-full bg-blue-400 opacity-30 blur-3xl dark:bg-blue-600">
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}