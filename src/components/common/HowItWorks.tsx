import {
  Upload,
  Brain,
  CheckCircle,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      number: "01",
      title: "Upload Job Details",
      description:
        "Paste the job description or upload your job posting details.",
    },
    {
      icon: Brain,
      number: "02",
      title: "AI Analyzes Risk",
      description:
        "MyGenie AI checks company reputation, salary patterns and scam indicators.",
    },
    {
      icon: CheckCircle,
      number: "03",
      title: "Get Smart Decision",
      description:
        "Receive a risk score and recommendation before applying.",
    },
  ];

  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            How MyGenie Works
          </h2>

          <p className="mt-4 text-gray-600 dark:text-slate-300">
            Three simple steps to verify jobs using AI.
          </p>

        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-10 md:grid-cols-3">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-gray-200 bg-white p-8 text-center transition duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
              >

                {/* Step Number */}
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Icon size={32} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-gray-600 dark:text-slate-300">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}