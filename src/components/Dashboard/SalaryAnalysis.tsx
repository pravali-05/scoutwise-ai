interface SalaryAnalysisProps {
  salary: string;
}

export default function SalaryAnalysis({
  salary,
}: SalaryAnalysisProps) {
  const available = salary !== "Not Mentioned";

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

      {/* Heading */}
      <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">
        💰 Salary Analysis
      </h2>

      <div className="space-y-5">

        {/* Offered Salary */}
        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Offered Salary
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {salary}
          </h3>
        </div>

        {/* Market Analysis */}
        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Market Analysis
          </p>

          <span
            className={
              available
                ? "font-semibold text-green-600 dark:text-green-400"
                : "font-semibold text-red-600 dark:text-red-400"
            }
          >
            {available
              ? "✓ Looks reasonable"
              : "✕ Salary not mentioned"}
          </span>
        </div>

        {/* Recommendation */}
        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Recommendation
          </p>

          <p className="text-slate-700 dark:text-slate-300">
            {available
              ? "Compare this salary with similar roles before accepting the offer."
              : "Ask the recruiter for salary details before proceeding."}
          </p>
        </div>

      </div>

    </div>
  );
}