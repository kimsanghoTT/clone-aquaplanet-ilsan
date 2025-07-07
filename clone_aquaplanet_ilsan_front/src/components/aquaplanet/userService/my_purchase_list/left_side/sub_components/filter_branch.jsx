import React from "react";

const BranchFilter = ({
    branchFilterRef,
    branchFilterOpen,
    handleFilterBtns,
    branchFilterLabel,
    branchFilterIndex,
    branches,
    selectFilterOption
}) => {

    return (
        <div className="ticket-branch-filter" ref={branchFilterRef}>
            <span
            className={`branch-select-display ${branchFilterOpen ? "on" : ""}`}
            onClick={() => handleFilterBtns("filter_branch")}
            >
                <span>{branchFilterLabel}</span>
            </span>
            <ul className={`branch-option-list ${branchFilterOpen ? "on" : ""}`}>
                <li className={`branch-option ${branchFilterIndex === null ? "selected" : ""}`} 
                onClick={() => handleFilterBtns("reset_branch")}>
                    전체지역
                </li>
                {branches.map((branch, index) => (
                <li
                className={`branch-option ${branchFilterIndex === index ? "selected" : ""}`}
                key={index}
                onClick={() => selectFilterOption("branch", index)}
                >
                {branch}
                </li>
                ))}
            </ul>
        </div>
    )
}
export default BranchFilter;