import { useState } from "react";

export interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: SortOption[];
  defaultValue?: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({
  options,
  defaultValue,
  onChange,
}: SortDropdownProps) => {
  const initialSelected =
    options.find(option => option.value === defaultValue) ?? options[0];

  const [selected, setSelected] = useState<SortOption>(initialSelected);

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    onChange(option.value);
  };

  return (
    <div className="d-flex justify-content-end p-3 sort-dropdown">
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selected.label}
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                className={`dropdown-item ${
                  selected.value === option.value ? "active" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortDropdown;
