interface CompanyNewsProps {
  news: string[];
}

export default function CompanyNews({
  news,
}: CompanyNewsProps) {
  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

      {/* Heading */}
      <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">
        📰 Latest Company News
      </h2>

      <div className="space-y-3">
        {news.length > 0 ? (
          news.map((item, index) => (
            <div
              key={index}
              className="rounded-lg bg-gray-100 p-4 text-slate-700 transition-colors duration-300 dark:bg-slate-800 dark:text-slate-200"
            >
              📰 {item}
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-gray-100 p-4 text-gray-500 dark:bg-slate-800 dark:text-slate-400">
            No company news available.
          </div>
        )}
      </div>

    </div>
  );
}