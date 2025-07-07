import React from "react";

const StatusFilter = ({
    statusFilterRef,
    statusFilterOpen,
    handleFilterBtns,
    statusFilterLabel,
    statusFilterIndex,
    statuses,
    selectFilterOption
}) => {

    return(
        <div className="ticket-status-filter" ref={statusFilterRef}>
            <span
            className={`status-select-display ${statusFilterOpen ? "on" : ""}`}
            onClick={() => handleFilterBtns("filter_status")}
            >
                <span>{statusFilterLabel}</span>
            </span>
            <ul className={`status-option-list ${statusFilterOpen ? "on" : ""}`}>
                <li className={`status-option ${statusFilterIndex === null ? "selected" : ""}`} 
                onClick={() => handleFilterBtns("reset_status")}>
                    전체
                </li>
                {statuses.map((status, index) => (
                <li
                className={`status-option ${statusFilterIndex === index ? "selected" : ""}`}
                key={index}
                onClick={() => selectFilterOption("status", index)}
                >
                {status}
                </li>
                ))}
            </ul>
        </div>
    )
}
export default StatusFilter;