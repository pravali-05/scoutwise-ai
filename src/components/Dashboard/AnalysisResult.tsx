import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  riskScore: string;
  status: string;
  company: string;
}

export default function AnalysisResult({
  riskScore,
  status,
  company,
}: Props) {
  const score = Number(riskScore.replace("%", ""));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

      {/* Heading */}
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        AI Analysis Result
      </h2>

      <div className="grid items-center gap-8 md:grid-cols-3">

        {/* Circular Risk Meter */}
        <div className="mx-auto h-40 w-40">
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              textSize: "16px",

              pathColor:
                score > 70
                  ? "#ef4444"
                  : score > 40
                  ? "#f59e0b"
                  : "#22c55e",

              textColor: "#64748b",

              trailColor: "#475569",
            })}
          />
        </div>

        {/* Status */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
            Status
          </h3>

          <p
            className={`mt-2 text-2xl font-bold ${
              status === "Fake"
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            {status}
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
            Company Verification
          </h3>

          <p className="mt-2 text-xl font-bold text-blue-600 dark:text-blue-400">
            {company}
          </p>
        </div>

      </div>
    </div>
  );
}