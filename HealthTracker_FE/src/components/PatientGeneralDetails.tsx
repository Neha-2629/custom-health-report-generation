import React from "react";
import { motion } from "framer-motion";
import { useSelectedPatient } from "../context/SelectedPatientContext";
import { GiBodyHeight, GiSleepingBag } from "react-icons/gi";
import { FaWeightScale } from "react-icons/fa6";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { IoFootsteps } from "react-icons/io5";

interface PatientGeneralDetailsProps {
  weight: number;
  stepsCount: number;
  sleepDuration: number;
  temperature: number;
}

const PatientGeneralDetails: React.FC<PatientGeneralDetailsProps> = ({
  weight,
  stepsCount,
  sleepDuration,
  temperature,
}) => {
  const { selectedPatient } = useSelectedPatient();
  const height = selectedPatient?.height_cm ?? 0;
  const bmi = weight / ((height / 100) * (height / 100));
  const bmiCategory =
    bmi < 18.5
      ? <div className="text-2xl p-3 my-3 rounded-md bg-yellow-400 bg-opacity-50 text-black">Underweight</div>
      : bmi >= 18.5 && bmi <= 24.9
      ? <div className="text-2xl p-3 my-3 rounded-md bg-green-400 bg-opacity-50 text-black">You're Healthy</div>
      : bmi >= 25 && bmi <= 29.9
      ? <div className="text-2xl p-3 my-3 rounded-md bg-red-400 bg-opacity-50 text-black">Overweight</div>
      : <div className="text-2xl p-3 my-3 rounded-md bg-red-800 bg-opacity-50 text-black">Obese</div>

  return (
    <div className="px-10 py-6 shadow-md rounded-lg bg-black bg-opacity-5">
      <h2 className="text-3xl text-[#4e253a] font-semibold mb-4">Patient General Details</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          {/* Height Card */}
          <div className="flex p-4 items-center bg-white text-black rounded-lg shadow-md relative">
            <div className="grow flex flex-col items-baseline">
              <p className="text-[#44353d] font-semibold mb-1 text-2xl">Height</p>
              <div className="flex items-center">
                <span className="text-4xl font-semibold text-[#aa346f]">{height}</span>
                <span className="text-xl ml-1 text-gray-500 mt-2">cm</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#f3dcd6] to-[#dad5e3] p-2 rounded-full">
              <div className="bg-[#4e253a] rounded-full p-4">
                <GiBodyHeight className="text-white text-5xl"/>
              </div>
            </div>
          </div>

          {/* Weight Card */}
          <div className="flex p-4 items-center bg-white text-black rounded-lg shadow-md relative">
            <div className="grow flex flex-col items-baseline">
              <p className="text-[#44353d] font-semibold mb-1 text-2xl">Weight</p>
              <div className="flex items-center">
                <span className="text-4xl font-semibold text-[#aa346f]">{weight}</span>
                <span className="text-xl ml-1 text-gray-500 mt-2">kg</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#f3dcd6] to-[#dad5e3] p-2 rounded-full">
              <div className="bg-[#4e253a] rounded-full p-4">
                <FaWeightScale className="text-white text-5xl"/>
              </div>
            </div>
          </div>
        </div>

        {/* BMI Card */}
        <div className="flex flex-col items-center py-6 px-3 bg-white rounded-lg shadow-md">
          <p className="text-[#4e253a] font-semibold mb-1 text-2xl">Body Mass Index (BMI)</p>
          <div className="text-6xl font-semibold my-2 text-[#aa346f]">{bmi.toFixed(1)}</div>
            {bmiCategory}
          <div className="relative my-2 w-full h-2 rounded-full">
            <div
              className="absolute top-3 h-2 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"
              style={{ width: "100%" }}
            ></div>
            <motion.div
              className="absolute top-2 left-0 h-4 w-4 bg-red-600 rounded-full"
              style={{ left: `${(bmi / 40) * 100}%` }}
              layout
            ></motion.div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-10">
        <div className="grid grid-cols-1 gap-8 pt-5">
          {/* Sleep Duration Card */}
          <div className="col-span-1 flex p-4 items-center max-h-[128px] bg-white text-black rounded-lg shadow-md relative">
            <div className="grow flex flex-col items-baseline">
              <p className="text-[#44353d] font-semibold mb-1 text-2xl">Sleep</p>
              <div className="flex items-center">
                <span className="text-4xl font-semibold text-[#aa346f]">{sleepDuration}</span>
                <span className="text-xl ml-1 text-gray-500 mt-2">hours</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#f3dcd6] to-[#dad5e3] p-2 rounded-full">
              <div className="bg-[#4e253a] rounded-full p-4">
                <GiSleepingBag className="text-white text-5xl"/>
              </div>
            </div>
          </div>

          <div className="col-span-1"></div>

          {/* Temperature Card */}
          <div className="col-span-1 flex p-4 items-center max-h-[128px] bg-white text-black rounded-lg shadow-md relative">
            <div className="grow flex flex-col items-baseline">
              <p className="text-[#44353d] font-semibold mb-1 text-2xl">Temperature</p>
              <div className="flex items-center">
                <span className="text-4xl font-semibold text-[#aa346f]">{temperature}</span>
                <span className="text-xl ml-1 text-gray-500 mt-2">&deg;F</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#f3dcd6] to-[#dad5e3] p-2 rounded-full">
              <div className="bg-[#4e253a] rounded-full p-4">
                <LiaTemperatureHighSolid className="text-white text-5xl"/>
              </div>
            </div>
          </div>

          <div className="col-span-1"></div>
          <div className="col-span-1"></div>

          {/* Steps Count Card */}
          <div className="col-span-1 flex p-4 items-center max-h-[128px] bg-white text-black rounded-lg shadow-md relative">
            <div className="grow flex flex-col items-baseline">
              <p className="text-[#44353d] font-semibold mb-1 text-2xl">Steps Count</p>
              <div className="flex items-center">
                <span className="text-4xl font-semibold text-[#aa346f]">{stepsCount}</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#f3dcd6] to-[#dad5e3] p-2 rounded-full">
              <div className="bg-[#4e253a] rounded-full p-4">
                <IoFootsteps className="text-white text-5xl"/>
              </div>
            </div>
          </div>
        </div>
        <img src="/human-body.png" alt="human body" />
      </div>
    </div>
  );
};

export default PatientGeneralDetails;


// color code: #ffeff6