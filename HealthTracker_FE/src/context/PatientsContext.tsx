import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { fetchPatients } from "../services/apiService";

interface Patient {
  patient_id: string;
  patient_name: string;
  email: string;
  height_cm: number;
}

interface PatientsContextType {
  patients: Patient[];
  loading: boolean;
  error: string | null;
}

const PatientsContext = createContext<PatientsContextType | undefined>(undefined);

export const PatientsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err) {
        console.error("Failed to fetch patients", err);
        setError("Failed To Fetch Patients Info");
      } finally {
        setLoading(false);
      }
    };
    loadPatients();
  }, []);

  return (
    <PatientsContext.Provider value={{ patients, loading, error }}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientsContext);
  if (!context) {
    throw new Error("usePatients must be used within a PatientsProvider");
  }
  return context;
};
