interface AIExplanationProps {
  explanation: string;
}

export default function AIExplanation({
  explanation,
}: AIExplanationProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800">

      <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">
        🤖 AI Explanation
      </h2>

      <div className="rounded-xl bg-blue-50 p-5 dark:bg-slate-700">
        <p className="leading-7 text-gray-700 dark:text-slate-200">
          {explanation}
        </p>
      </div>

    </div>
  );
}