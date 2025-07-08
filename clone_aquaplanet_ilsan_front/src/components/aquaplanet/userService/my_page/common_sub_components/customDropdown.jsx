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
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <>
      <span
        className={`${displayClassName} ${isOpen ? "on" : ""}`}
        onClick={handleOpen}
        ref={dropdownRef}
      >
        {selectedValue}
      </span>
      <ul className={`${selectorClassName} ${isOpen ? "on" : ""}`} ref={dropdownRef}>
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
    </>
  );
};
export default CustomDropdown;
