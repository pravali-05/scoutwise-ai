interface Props {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export default function ATSResult({
  score,
  matchedSkills,
  missingSkills,
}: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

      {/* Heading */}
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        📄 ATS Resume Match
      </h2>

      {/* ATS Score */}
      <div className="mt-5">

        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          ATS Score
        </p>

        <div className="mt-2 h-4 w-full rounded-full bg-gray-200 dark:bg-slate-700">

          <div
            className="h-4 rounded-full bg-green-500 transition-all duration-500"
            style={{
              width: `${Math.min(Math.max(score, 0), 100)}%`,
            }}
          />

        </div>

        <p className="mt-2 font-bold text-green-600 dark:text-green-400">
          {score}%
        </p>

      </div>

      {/* Matched Skills */}
      <div className="mt-6">

        <h3 className="font-bold text-green-700 dark:text-green-400">
          ✅ Matched Skills
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">

          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-green-100 px-4 py-2 font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No matched skills found.
            </p>
          )}

        </div>

      </div>

      {/* Missing Skills */}
      <div className="mt-6">

        <h3 className="font-bold text-red-700 dark:text-red-400">
          ❌ Missing Skills
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">

          {missingSkills.length > 0 ? (
            missingSkills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-red-100 px-4 py-2 font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No missing skills found.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}