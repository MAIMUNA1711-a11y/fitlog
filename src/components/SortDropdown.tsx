"use client";

import { FaChevronDown } from "react-icons/fa";
import { SortKey } from "@/lib/types";

interface Props {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

const options: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <div className="relative inline-flex items-center">
      <span className="mr-2 text-sm font-semibold text-white/60">Sort By</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="appearance-none rounded-lg border border-white/15 bg-[#141414] py-2 pl-4 pr-9 text-sm font-semibold text-white outline-none focus:border-accent"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <FaChevronDown className="pointer-events-none absolute right-3 text-xs text-white/60" />
    </div>
  );
}