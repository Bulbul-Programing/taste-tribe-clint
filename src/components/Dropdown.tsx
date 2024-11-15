"use client";
import { useState } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex text-lg justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white  font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        Options
        <svg
          aria-hidden="true"
          className="-mr-1 ml-2 h-8 w-8"
          fill="currentColor"
          viewBox="0 0 15 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            fillRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-2 space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                className="block z-[900] w-full text-left px-4 py-2 rounded-sm text-sm bg-slate-50 border text-gray-700 hover:bg-[#1BEEA2] transition-all ease-in duration-100"
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
