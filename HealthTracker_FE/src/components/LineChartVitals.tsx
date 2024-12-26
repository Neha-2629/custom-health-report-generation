import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

interface VitalsData {
    date: string;
    heart_rate: number;
    pulse_rate: number;
  }

  
interface Props {
  data: VitalsData[];
}

const LineChartVitals: React.FC<Props> = ({ data }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow text-sm">
      <h3 className="text-[#4e253a] font-semibold mb-4 text-2xl">Heart Rate & Pulse Rate</h3>
      <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend/>
        <Line type="monotone" dataKey="heart_rate" stroke="#f4b5d4" name="Heart Rate" />
        <Line type="monotone" dataKey="pulse_rate" stroke="#4e253a" name="Pulse Rate" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartVitals;