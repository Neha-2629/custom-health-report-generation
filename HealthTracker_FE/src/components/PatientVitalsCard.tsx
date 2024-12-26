import { VitalsData } from "../types/PatientData";

// interface PatientVitals  {
//     date: string;
//     heart_rate: number;
//     pulse_rate: number;
//     blood_pressure: number;
//     body_temperature: number;
//     cholesterol_level: number;
// }

interface PatientVitalsCardProps {
    vitals: VitalsData[];
}

  const PatientVitalsCard: React.FC<PatientVitalsCardProps> = ({ vitals }) => {
    if (!vitals.length) return <p>No vitals data available</p>;
  
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-4">Patient Health Vitals</h3>
        <ul className="space-y-2">
          {vitals.map((vital, index) => (
            <li key={index} className="border-b pb-2">
              <p>
                <strong>Date:</strong> {vital.date}
              </p>
              <p>
                <strong>Heart Rate:</strong> {vital.heart_rate} bpm
              </p>
              <p>
                <strong>Pulse Rate:</strong> {vital.pulse_rate} bpm
              </p>
              <p>
                <strong>Blood Pressure:</strong> {vital.systolic_bp} mmHg
              </p>
              <p>
                <strong>Blood Pressure:</strong> {vital.diastolic_bp} mmHg
              </p>
              <p>
                <strong>Body Temperature:</strong> {vital.body_temperature} °F
              </p>
              <p>
                <strong>Cholesterol Level:</strong> {vital.cholesterol_level} mg/dL
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default PatientVitalsCard;