import React from "react";
import Dashboard from "./pages/Dashboard";
import { PatientsProvider } from "./context/PatientsContext";
import { SelectedPatientProvider } from "./context/SelectedPatientContext";

const App: React.FC = () => {
    return(
        <PatientsProvider>
            <SelectedPatientProvider>
                <Dashboard />;
            </SelectedPatientProvider>
        </PatientsProvider>
    )
}

export default App;