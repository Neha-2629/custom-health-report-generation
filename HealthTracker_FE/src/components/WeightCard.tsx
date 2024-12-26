import React from "react";

interface WeightCardProps {
  weight: number;
}

const WeightCard: React.FC<WeightCardProps> = ({ weight }) => {
  return (
    <div className="bg-blue-100 text-gray-800 rounded-lg shadow-md p-4 w-64">
      <p className="text-sm font-medium">Weight</p>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">{weight} kg</p>
        <div className="flex items-center gap-2">
          {/* Scale UI */}
          <div className="h-4 bg-gray-400 w-full relative">
            <div className="absolute top-0 h-4 w-1 bg-red-500 left-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightCard;
