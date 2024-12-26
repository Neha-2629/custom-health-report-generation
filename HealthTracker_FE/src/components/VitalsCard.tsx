import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface VitalsCardProps {
  title: string;
  value: string | number;
  unit: string;
  status: string; // e.g., "Normal", "High"
  chartData: { date: string; value: number }[];
  color: string; // Chart and theme color
}

const VitalsCard: React.FC<VitalsCardProps> = ({
  title,
  value,
  unit,
  status,
  chartData,
  color,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start text-xl">
      <h3 className="text-[#4e253a] font-semibold mb-1 text-2xl">{title}</h3>
      <div className="flex items-center mb-2">
        <span className="text-5xl font-bold mr-1" style={{ color }}>
          {value}
        </span>
        <span className="text-lg text-gray-500 mt-2">{unit}</span>
      </div>
      <span
        className="text-sm font-semibold px-2 py-1 rounded-full mb-2"
        style={{ backgroundColor: `${color}10`, color }}
      >
        {status}
      </span>
      {/* Mini Line Chart */}
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VitalsCard;
