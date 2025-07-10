import React, { useEffect, useRef, useState } from "react";

const CustomDropdown = ({
  options,
  selectedValue,
  displayClassName,
  selectorClassName,
  optionClassName,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const clickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="toggle-btn-wrapper" ref={dropdownRef}>
      <span
        className={`${displayClassName} ${isOpen ? "on" : ""}`}
        onClick={handleOpen}
      >
        {selectedValue}
      </span>
      <ul className={`${selectorClassName} ${isOpen ? "on" : ""}`}>
        {options.map((option) => (
          <li
            key={option}
            value={option}
            className={`${optionClassName} ${selectedValue === option ? "selected" : ""}`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CustomDropdown;
