import React, { useState, useEffect } from "react";
import DateDropdown from "../components/DateDropdown";
import Sidebar from "../components/Sidebar";
import PatientDropdown from "../components/PatientDropdown";
import VitalsCard from "../components/VitalsCard";
import LineChartVitals from "../components/LineChartVitals";
//import RadialBarVitals from "../components/RadialBarVitals";
import PhysicianNotes from "../components/PhysicianNotes";
import { fetchPatientVitals, fetchVitalsThreshold } from "../services/apiService";
import { VitalsData } from "../types/PatientData";
import { Threshold } from "../types/Threshold";
import PatientGeneralDetails from "../components/PatientGeneralDetails";
import VitalsAreaChart from "../components/VitalsAreaChart";
import VitalsBarChart from "../components/VitalsBarChart";

const Dashboard: React.FC = () => {
  const [patientData, setPatientData] = useState<VitalsData[]>([]);
  const [filteredData, setFilteredData] = useState<VitalsData[]>([]);
  //const [notes, setNotes] = useState<string[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [thresholds, setThresholds] = useState<Threshold[]>([]);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  
  // Fetch threshold data
  useEffect(() => {
    const loadThresholds = async () => {
      try {
        const data: Threshold[] = await fetchVitalsThreshold();
        setThresholds(data);
      } catch (error) {
        console.error("Failed to fetch vitals threshold:", error);
      }
    };
    loadThresholds();
  }, []);

  // Load Patient Vitals Data
  const loadPatientVitals = async (patient_id: string) => {
    try {
      const data: VitalsData[] = await fetchPatientVitals(patient_id);
      setPatientData(data);
      console.log(patientData);
      setFilteredData(data);
      //setNotes(data.map((item) => item.physician_notes || "Specific Notes Not Given"));
      setSelectedPatient(patient_id);
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Failed to fetch patient vitals:", error);
      setPatientData([]);
      setFilteredData([]);
      //setNotes([]);
    }
  };

  // Filter Data Based on Start and End Dates
  useEffect(() => {
    if (startDate || endDate) {
      const filtered = patientData.filter((item) => {
        const itemDate = item.date;
        return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(patientData);
    }
  }, [startDate, endDate, patientData]);

  // Calculate status based on thresholds
  const calculateStatus = (vitalName: string, value: number) => {
    const threshold = thresholds.find((t) => t.vital_name === vitalName);
    if (!threshold) return "Unknown";
    if (value < threshold.lower_threshold) return "Lower";
    if (value > threshold.high_threshold) return "Higher";
    return "Normal";
  };

  // Prepare chart data for VitalsCard
  const prepareChartData = (key: keyof VitalsData) =>
    patientData.map((item) => ({
      date: item.date,
      value: item[key] as number,
    }));

  // Prepare data for the AreaChart
  const prepareVitalsAreaData = () =>
    filteredData.map((item) => ({
      date: item.date,
      respiration_rate: item.respiration_rate || 0,
      oxygen_saturation: item.oxygen_saturation || 0,
  }));

  const prepareBarChartData = () =>
    filteredData.map((item) => ({
      date: item.date,
      systolic_bp: item.systolic_bp || 0,
      diastolic_bp: item.diastolic_bp || 0,
    }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen flex flex-col md:flex-row flex-grow ml-[88px] bg-gradient-to-r from-[#f3dcd6] to-[#dad5e3]">
        <div className="pt-4 basis-3/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-10">
          {/* Patient Dropdown */}
          <div className="mb-4">
            <PatientDropdown onPatientSelect={loadPatientVitals}/>
          </div>

          {/* Start Date Dropdown */}
          <DateDropdown
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              maxDate={endDate || today} // Prevent dates after End Date and today
            />

            {/* End Date Dropdown */}
            <DateDropdown
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              minDate={startDate} // Prevent dates before Start Date
              maxDate={today} // Prevent dates after today
            />            
          </div>

          {/* Vitals Cards */}
          {selectedPatient && patientData.length > 0 && thresholds.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 my-6 mx-10 gap-10">
              <VitalsCard
                title="Heart Rate"
                value={patientData[patientData.length - 1]?.heart_rate}
                unit="bpm"
                status={calculateStatus("Heart Rate", patientData[patientData.length - 1]?.heart_rate)}
                chartData={prepareChartData("heart_rate")}
                color={
                  calculateStatus("Heart Rate", patientData[patientData.length - 1]?.heart_rate) === "Higher"
                    ? "#FF6B6B"
                    : calculateStatus("Heart Rate", patientData[patientData.length - 1]?.heart_rate) === "Lower"
                    ? "#FFD700"
                    : "#4CAF50"
                }
              />
              <VitalsCard
                title="Pulse Rate"
                value={patientData[patientData.length - 1]?.pulse_rate}
                unit="bpm"
                status={calculateStatus("Pulse Rate", patientData[patientData.length - 1]?.pulse_rate)}
                chartData={prepareChartData("pulse_rate")}
                color={
                  calculateStatus("Pulse Rate", patientData[patientData.length - 1]?.heart_rate) === "Higher"
                    ? "#FF6B6B"
                    : calculateStatus("Pulse Rate", patientData[patientData.length - 1]?.heart_rate) === "Lower"
                    ? "#FFD700"
                    : "#4CAF50"
                }
              />
              <VitalsCard
                title="Systolic Blood Pressure"
                value={patientData[patientData.length - 1]?.systolic_bp}
                unit="mmHg"
                status={calculateStatus("Systolic Blood Pressure", patientData[patientData.length - 1]?.systolic_bp)}
                chartData={prepareChartData("systolic_bp")}
                color={
                  calculateStatus("Systolic Blood Pressure", patientData[patientData.length - 1]?.systolic_bp) === "Higher"
                    ? "#FF6B6B"
                    : calculateStatus("Systolic Blood Pressure", patientData[patientData.length - 1]?.systolic_bp) === "Lower"
                    ? "#FFD700"
                    : "#4CAF50"
                }
              />
              <VitalsCard
                title="Diastolic Blood Pressure"
                value={patientData[patientData.length - 1]?.diastolic_bp}
                unit="mmHg"
                status={calculateStatus("Diastolic Blood Pressure", patientData[patientData.length - 1]?.diastolic_bp)}
                chartData={prepareChartData("diastolic_bp")}
                color={
                  calculateStatus("Diastolic Blood Pressure", patientData[patientData.length - 1]?.diastolic_bp) === "Higher"
                    ? "#FF6B6B"
                    : calculateStatus("Diastolic Blood Pressure", patientData[patientData.length - 1]?.diastolic_bp) === "Lower"
                    ? "#FFD700"
                    : "#4CAF50"
                }
              />
              <VitalsCard
                title="Oxygen Saturation"
                value={patientData[patientData.length - 1]?.oxygen_saturation}
                unit="%"
                status={calculateStatus("Oxygen Saturation", patientData[patientData.length - 1]?.oxygen_saturation)}
                chartData={prepareChartData("oxygen_saturation")}
                color={
                  calculateStatus("Oxygen Saturation", patientData[patientData.length - 1]?.oxygen_saturation) === "Higher"
                    ? "#FF6B6B"
                    : calculateStatus("Oxygen Saturation", patientData[patientData.length - 1]?.oxygen_saturation) ===
                      "Lower"
                    ? "#FFD700"
                    : "#4CAF50"
                }
              />
              <VitalsCard
                title="Cholesterol Level"
                value={patientData[patientData.length - 1]?.cholesterol_level}
                unit="mg/dL"
                status={calculateStatus("Cholesterol Level", patientData[patientData.length - 1]?.cholesterol_level)}
                chartData={prepareChartData("cholesterol_level")}
                color={
                  calculateStatus("Cholesterol Level", patientData[patientData.length - 1]?.cholesterol_level) === "Higher"
                    ? "#FF6B6B"
                    : calculateStatus("Cholesterol Level", patientData[patientData.length - 1]?.cholesterol_level) === "Lower"
                    ? "#FFD700"
                    : "#4CAF50"
                }
              />
            </div>
          )}

          {/* Line and Radial Charts */}
          {/* Render charts and details only if patient data is selected */}
          <div className="flex flex-col gap-10 mx-10 my-12">
            {selectedPatient && (
            <>
              <LineChartVitals data={filteredData} />
              <VitalsAreaChart data={prepareVitalsAreaData()} />
              <VitalsBarChart data={prepareBarChartData()} />
              
              {/* Render only the latest physician note */}
              <div className="">
                <PhysicianNotes notes={[patientData[patientData.length - 1]?.physician_note || "No notes available"]} />
              </div>
            </>
          )}
        </div>
        </div>
          {/* General Details */}
          <div className="basis-2/5 p-6 pl-0 overscroll-none">
          {selectedPatient && patientData.length > 0 && (
              <PatientGeneralDetails
                weight={patientData[patientData.length - 1]?.weight || 0}
                stepsCount={patientData[patientData.length - 1]?.steps_count || 0}
                sleepDuration={patientData[patientData.length - 1]?.sleep_duration || 0}
                temperature={patientData[patientData.length - 1]?.body_temperature || 0}
              />
            )}
          </div>
        </div>
    </div>
  );
};

export default Dashboard;


