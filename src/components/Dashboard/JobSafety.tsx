interface JobSafetyProps {
  riskScore: string;
}

export default function JobSafety({
  riskScore,
}: JobSafetyProps) {
  const score = Number(riskScore.replace("%", ""));

  const isSafe = score < 40;
  const isMedium = score >= 40 && score <= 70;

  const safety = isSafe
    ? {
        title: "Safe to Apply",
        message:
          "The job appears relatively safe based on the current analysis. However, always verify the recruiter and company before applying.",
        icon: "✅",
      }
    : isMedium
    ? {
        title: "Apply with Caution",
        message:
          "Some risk indicators were detected. Verify the company, recruiter email, salary and job details before applying.",
        icon: "⚠️",
      }
    : {
        title: "High Risk Job",
        message:
          "Several suspicious indicators were detected. We recommend carefully verifying this job before sharing personal information or applying.",
        icon: "🚨",
      };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800">

      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        🛡️ Job Safety
      </h2>

      <div
        className={`rounded-2xl p-6 ${
          isSafe
            ? "bg-green-50 dark:bg-green-900/30"
            : isMedium
            ? "bg-yellow-50 dark:bg-yellow-900/30"
            : "bg-red-50 dark:bg-red-900/30"
        }`}
      >

        <div className="flex items-center gap-4">

          <div className="text-4xl">
            {safety.icon}
          </div>

          <div>
            <h3
              className={`text-2xl font-bold ${
                isSafe
                  ? "text-green-700 dark:text-green-400"
                  : isMedium
                  ? "text-yellow-700 dark:text-yellow-400"
                  : "text-red-700 dark:text-red-400"
              }`}
            >
              {safety.title}
            </h3>

            <p className="mt-2 text-gray-700 dark:text-slate-200">
              {safety.message}
            </p>
          </div>

        </div>

        <div className="mt-6">

          <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
            Risk Score
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {score}%
          </p>

        </div>

      </div>

    </div>
  );
}