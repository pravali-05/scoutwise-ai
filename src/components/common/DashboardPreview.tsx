import { ShieldCheck, Building2, DollarSign, AlertTriangle } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            AI Analysis Dashboard
          </h2>

          <p className="mt-4 text-gray-600">
            Instantly analyze every job posting before applying.
          </p>
        </div>

        <div className="mt-16 rounded-3xl border bg-slate-50 p-8 shadow-xl">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white p-6 shadow">
              <ShieldCheck className="text-green-600" size={40} />

              <h3 className="mt-4 font-semibold">
                Risk Score
              </h3>

              <p className="mt-2 text-4xl font-bold text-green-600">
                12%
              </p>

              <p className="text-gray-500">
                Low Risk
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <Building2 className="text-blue-600" size={40} />

              <h3 className="mt-4 font-semibold">
                Company
              </h3>

              <p className="mt-2 font-bold">
                Verified
              </p>

              <p className="text-gray-500">
                Trusted Organization
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <DollarSign className="text-yellow-500" size={40} />

              <h3 className="mt-4 font-semibold">
                Salary
              </h3>

              <p className="mt-2 font-bold">
                Within Market Range
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <AlertTriangle className="text-red-500" size={40} />

              <h3 className="mt-4 font-semibold">
                Scam Indicators
              </h3>

              <p className="mt-2 font-bold">
                1 Warning
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}