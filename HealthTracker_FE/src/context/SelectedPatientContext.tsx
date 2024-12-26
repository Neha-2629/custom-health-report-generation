import React, { createContext, useState, useContext, ReactNode } from "react";

interface Patient {
  patient_id: string;
  patient_name: string;
  email: string;
  height_cm: number;
}

interface SelectedPatientContextType {
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
}

const SelectedPatientContext = createContext<SelectedPatientContextType | undefined>(undefined);

export const SelectedPatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <SelectedPatientContext.Provider value={{ selectedPatient, setSelectedPatient }}>
      {children}
    </SelectedPatientContext.Provider>
  );
};

export const useSelectedPatient = () => {
  const context = useContext(SelectedPatientContext);
  if (!context) {
    throw new Error("useSelectedPatient must be used within a SelectedPatientProvider");
  }
  return context;
};
