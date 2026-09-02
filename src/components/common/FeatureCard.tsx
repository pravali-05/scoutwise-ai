import { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 text-blue-600">{icon}</div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-3 text-gray-600">
        {description}
      </p>
    </div>
  );
}