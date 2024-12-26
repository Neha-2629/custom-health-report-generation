import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface VitalsData {
  date: string;
  systolic_bp: number;
  diastolic_bp: number;
}

interface VitalsBarChartProps {
  data: VitalsData[];
}

const VitalsBarChart: React.FC<VitalsBarChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-[#4e253a] font-semibold mb-4 text-2xl">
        Systolic vs. Diastolic Blood Pressure
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="systolic_bp" fill="#d17786" name="Systolic BP" />
          <Bar dataKey="diastolic_bp" fill="#f14c00" name="Diastolic BP" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VitalsBarChart;
