import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">

        <div className="rounded-3xl bg-blue-600 p-10 text-center text-white shadow-xl transition duration-300 md:p-16 dark:bg-blue-700">

          {/* Icon */}
          <div className="mb-5 flex justify-center">
            <div className="rounded-full bg-white/20 p-4">
              <Sparkles size={32} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold md:text-5xl">
            Ready to Find Safe Job Opportunities?
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Let MyGenie AI analyze job postings,
            detect scams, and guide you toward
            trusted career opportunities.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-5 md:flex-row">

            {/* Get Started */}
            <button
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 transition hover:bg-gray-100 dark:hover:bg-gray-200"
            >
              Get Started
              <ArrowRight size={18} />
            </button>

            {/* Login */}
            <button
              className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Login
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}