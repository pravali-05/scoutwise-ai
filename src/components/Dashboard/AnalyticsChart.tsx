import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Props {
  riskScore: string;
  atsScore: number;
}

export default function AnalyticsChart({
  riskScore,
  atsScore,
}: Props) {
  const data = [
    {
      name: "Risk Score",
      value: Number(riskScore.replace("%", "")),
    },
    {
      name: "ATS Score",
      value: atsScore,
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800">
      
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        📊 Analytics Dashboard
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#64748b"
            opacity={0.3}
          />

          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            tick={{ fill: "currentColor" }}
          />

          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "currentColor" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "10px",
              color: "#ffffff",
            }}
            labelStyle={{
              color: "#ffffff",
            }}
            itemStyle={{
              color: "#ffffff",
            }}
          />

          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}