interface CompanyVerificationProps {
  company: string;
  website: string;
}

export default function CompanyVerification({
  company,
  website,
}: CompanyVerificationProps) {
  const verified = website !== "Not Mentioned";

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

      {/* Heading */}
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        🏢 Company Verification
      </h2>

      <div className="space-y-5">

        {/* Company */}
        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Company
          </p>

          <h3 className="font-semibold text-slate-900 dark:text-white">
            {company}
          </h3>
        </div>

        {/* Website */}
        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Official Website
          </p>

          {verified ? (
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="break-all text-blue-600 underline dark:text-blue-400"
            >
              {website}
            </a>
          ) : (
            <span className="font-medium text-red-600 dark:text-red-400">
              Website Not Found
            </span>
          )}
        </div>

        {/* Verification Status */}
        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Verification Status
          </p>

          <span
            className={
              verified
                ? "font-semibold text-green-600 dark:text-green-400"
                : "font-semibold text-red-600 dark:text-red-400"
            }
          >
            {verified ? "✓ Verified" : "✕ Not Verified"}
          </span>
        </div>

        {/* Trust Score */}
        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Trust Score
          </p>

          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {verified ? "94 / 100" : "25 / 100"}
          </h3>
        </div>

      </div>

    </div>
  );
}