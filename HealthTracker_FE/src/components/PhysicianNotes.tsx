import React from "react";

interface Props {
  notes: string[];
}

const PhysicianNotes: React.FC<Props> = ({ notes }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
    <h3 className="text-[#4e253a] font-semibold mb-4 text-2xl">Latest Physician Notes</h3>
    <p className="text-gray-600 text-lg">{notes[0]}</p>
    {/* <ul>
      {notes.map((note, index) => (
        <li key={index} className="mb-2">{notes}</li>
      ))}
    </ul> */}
  </div>
  )
};

export default PhysicianNotes;
