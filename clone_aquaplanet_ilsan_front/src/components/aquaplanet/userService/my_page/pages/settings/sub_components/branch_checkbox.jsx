import React from "react";

const BranchCheckbox = ({ options, selectedValues, onChange }) => {
  return (
    <>
      {options.map((option) => (
        <React.Fragment key={option}>
          <label
            className={selectedValues[option] ? "on" : ""}
            htmlFor={option}
          >
            {option}
          </label>
          <input
            type="checkbox"
            id={option}
            value={option}
            onChange={onChange}
          />
        </React.Fragment>
      ))}
    </>
  );
};
export default BranchCheckbox;
