import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});


export const fetchPatients = async () => {
  const response = await api.get("/patients");
  return response.data;
};

export const fetchPatientVitals = async (patient_id: string) => {
  const response = await api.get(`/patients/${patient_id}`);
  return response.data;
};

export const fetchVitalsThreshold = async () => {
  const response = await api.get("/vitalsthreshold");
  return response.data;
};