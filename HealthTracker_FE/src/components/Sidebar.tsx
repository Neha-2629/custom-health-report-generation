import React from "react";
import { FiHome, FiCalendar, FiSettings, FiUser, FiDownload, FiMail} from "react-icons/fi";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useSelectedPatient } from "../context/SelectedPatientContext";

const Sidebar: React.FC = () => {
  const { selectedPatient } = useSelectedPatient();
   // Download Dashboard as PDF
  const downloadPDF = () => {
    const dashboardElement = document.getElementById("root");
    if (!dashboardElement) return;
  
    html2canvas(dashboardElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const scaleFactor = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
  
      const imgWidth = canvasWidth * scaleFactor;
      const imgHeight = canvasHeight * scaleFactor;
  
      pdf.addImage(imgData, "PNG", (pdfWidth - imgWidth) / 2, 0, imgWidth, imgHeight);
      pdf.save("dashboard.pdf");
    });
  };

  return (
    <aside className="fixed left-0 top-0 w-auto bg-[#4e253a] text-white flex flex-col p-4">
      {/* <h2 className="text-4xl font-bold pb-2">Dashboard</h2> */}
      <div className="min-h-screen grid grid-cols-1 gap-4 content-between">
        <div className="flex flex-col gap-4">
          {/* Home Icon */}
          <button className="text-5xl text-[#ea5d3c] cursor-pointer hover:text-[#f7eef4] py-2 mx-auto">
            <FiHome />
          </button>
          {/* Calendar Icon */}
          <button className="text-5xl text-[#ea5d3c] cursor-pointer hover:text-[#f7eef4] py-2 mx-auto">
            <FiCalendar />
          </button>
          {/* Share Report via Email */}
          <a
            href={selectedPatient?.email ? `mailto:${selectedPatient?.email}?subject=Health Report&body=Here is the latest health report attached.` : undefined}
            className="text-5xl text-[#ea5d3c] cursor-pointer hover:text-[#f7eef4] py-2 mx-auto"
            title="Share Report via Email"
          >
            <FiMail />
          </a>
          {/* Download Report as PDF */}
          <button
            onClick={downloadPDF}
            className="text-5xl text-[#ea5d3c] cursor-pointer hover:text-[#f7eef4] py-2 mx-auto"
            title="Download Report as PDF"
          >
            <FiDownload/>
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          {/* Settings Icon */}
          <button className="text-5xl text-[#ea5d3c] cursor-pointer hover:text-[#f7eef4] py-2 mx-auto">
            <FiSettings />
          </button>
          {/* User Profile Icon */}
          <button className="text-5xl text-[#ea5d3c] cursor-pointer hover:text-[#f7eef4] p-2 mx-auto bg-white bg-opacity-20 rounded-full">
            <FiUser />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
