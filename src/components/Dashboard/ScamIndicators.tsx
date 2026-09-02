interface Props {
  indicators: string[];
}

export default function ScamIndicators({ indicators }: Props) {
  return (
    <div className="mt-8 rounded-2xl border bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">
        🚨 Scam Indicators
      </h2>

      {indicators.length > 0 ? (
        <div className="space-y-3">
          {indicators.map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-red-50 p-4 text-red-700 dark:bg-red-950/40 dark:text-red-300"
            >
              ⚠️ {item}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-green-50 p-4 text-green-700 dark:bg-green-950/40 dark:text-green-300">
          ✅ No major scam indicators detected.
        </div>
      )}
    </div>
  );
}