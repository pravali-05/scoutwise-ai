import {
  Bot,
  Building2,
  ShieldAlert,
  DollarSign,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Bot,
      title: "AI Job Analysis",
      description:
        "Analyze job descriptions using AI and identify suspicious patterns.",
    },
    {
      icon: Building2,
      title: "Company Reputation Check",
      description:
        "Verify company information and check trustworthiness.",
    },
    {
      icon: ShieldAlert,
      title: "Scam Detection",
      description:
        "Detect fake job signals, misleading content and fraud patterns.",
    },
    {
      icon: DollarSign,
      title: "Salary Verification",
      description:
        "Compare salary details and identify unrealistic offers.",
    },
    {
      icon: BarChart3,
      title: "Risk Score Prediction",
      description:
        "Get a clear risk percentage before applying.",
    },
    {
      icon: Sparkles,
      title: "MyGenie AI Assistant",
      description:
        "Ask questions and get intelligent career guidance.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Powerful AI Features
          </h2>

          <p className="mt-4 text-gray-600 dark:text-slate-300">
            Everything you need to identify safe and genuine job opportunities.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
              >

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Icon size={30} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-gray-600 dark:text-slate-300">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}