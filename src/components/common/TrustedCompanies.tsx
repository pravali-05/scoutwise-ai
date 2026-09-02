export default function TrustedCompanies() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Infosys",
    "TCS",
    "Accenture",
  ];

  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Trusted by Job Seekers Worldwide
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-600 dark:text-slate-300">
          MyGenie helps verify companies and detect suspicious job postings
          before you apply.
        </p>

        {/* Companies */}
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-6">

          {companies.map((company) => (
            <div
              key={company}
              className="rounded-xl border border-gray-200 bg-white p-5 font-semibold text-gray-700 shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {company}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}