interface AIRecommendationsProps {
  status: string;
  riskScore: string;
}

export default function AIRecommendations({
  status,
  riskScore,
}: AIRecommendationsProps) {
  const recommendations: string[] = [];

  if (status === "Genuine") {
    recommendations.push("Company looks legitimate.");
    recommendations.push("No scam keywords detected.");
    recommendations.push("Salary appears reasonable.");
    recommendations.push("Verify the recruiter email before applying.");
    recommendations.push("Apply only through the official company website.");
  } else {
    recommendations.push("Suspicious keywords detected.");
    recommendations.push("Never pay registration or interview fees.");
    recommendations.push("Verify the company website.");
    recommendations.push("Avoid sharing Aadhaar, PAN or bank details.");
    recommendations.push("Report suspicious job postings.");
  }

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

      {/* Heading */}
      <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
        🤖 AI Recommendations
      </h2>

      {/* Risk Score */}
      <p className="mb-5 text-gray-600 dark:text-slate-400">
        Risk Score:{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          {riskScore}
        </span>
      </p>

      {/* Recommendations */}
      <div className="space-y-3">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="rounded-lg bg-blue-50 p-3 text-slate-700 transition-colors dark:bg-blue-900/30 dark:text-blue-200"
          >
            ✅ {item}
          </div>
        ))}
      </div>

    </div>
  );
}