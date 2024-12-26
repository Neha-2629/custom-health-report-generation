import React from "react";
import { usePatients } from "../context/PatientsContext"
import { useSelectedPatient } from "../context/SelectedPatientContext";


interface PatientDropdownProps {
  //patients: {paient_id: string; patient_name: string; email: string}[];
  onPatientSelect: (id: string) => void;
}

const PatientDropdown: React.FC<PatientDropdownProps> = ({ onPatientSelect }) => {

    const { patients, loading, error } = usePatients();
    const { setSelectedPatient } = useSelectedPatient();

    const handlePatientSelect = (patientId: string) => {
      const selectedPatient = patients.find((p) => p.patient_id === patientId) || null;
      setSelectedPatient(selectedPatient);
    };

    if (loading) return <p>Loading patients...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

  return (
     <div>
      <label htmlFor="patient-select" className="block mb-2 text-[#4e253a] font-semibold text-[27px]">
        Select a Patient:
      </label>
      <select
        id="patient-select"
        className="p-2 border rounded-md w-full text-xl"
        onChange={(e) => {
            onPatientSelect(e.target.value);
            handlePatientSelect(e.target.value);
          }
        }
      >
        <option value="">-- Select a Patient --</option>
        {patients.map((patient, index) => (
          <option key={index} value={patient.patient_id}>
            {patient.patient_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PatientDropdown;
