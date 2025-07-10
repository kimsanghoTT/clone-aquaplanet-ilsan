import React from "react";

const HeaderBranchSelector = ({openBranchSelector, selectorRef, branchSelectorOpen, branches, branchSelectionState, handleFilter, applyFilter}) => {
  return (
    <div className="aquaplanet-branch-selector">
      <button type="button" onClick={openBranchSelector}>
        <span>지역</span>
      </button>
      <div
        ref={selectorRef}
        className={`aquaplanet-location-list ${branchSelectorOpen ? "on" : ""}`}
      >
        <ul>
          {branches.map((branch, index) => (
            <li
              key={index}
              className={branchSelectionState[branch] ? "selected" : ""}
              onClick={() => handleFilter(branch)}
            >
              {branch}
            </li>
          ))}
        </ul>
        <button type="button" onClick={applyFilter}>
          적용
        </button>
      </div>
    </div>
  );
};
export default HeaderBranchSelector;
