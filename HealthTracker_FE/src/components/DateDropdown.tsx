import React from "react";

interface DateDropdownProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
}

const DateDropdown: React.FC<DateDropdownProps> = ({
  label,
  value,
  onChange,
  minDate,
  maxDate,
}) => {
  return (
    <div className="flex flex-col text-xl">
      <label className="block font-semibold text-[#4e253a] text-[27px] mb-1 py-2">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={minDate}
        max={maxDate}
        className="p-2 border rounded-md"
      />
    </div>
  );
};

export default DateDropdown;
