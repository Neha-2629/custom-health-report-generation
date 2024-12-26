import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface VitalsData {
    date: string;
    respiration_rate: number;
    oxygen_saturation: number;
  }

interface VitalsAreaChartProps {
  data: VitalsData[];
  
}

const VitalsAreaChart: React.FC<VitalsAreaChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-lg">
      <h3 className="text-[#4e253a] font-semibold mb-4 text-2xl">
        Respiration Rate & Oxygen Saturation
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRespiration" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOxygen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="respiration_rate"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorRespiration)"
          />
          <Area
            type="monotone"
            dataKey="oxygen_saturation"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorOxygen)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VitalsAreaChart;
