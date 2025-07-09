import React, { useEffect, useRef } from "react";

const ItemOptionSelector = ({
    options,
    selectedCount,
    setOpenOptionList,
    openOptionList,
    handleOpenOptionList,
    handleOption
}) => {
  const optionRef = useRef(null);

  useEffect(() => {
    const clickOutside = (e) => {
      if (optionRef.current && !optionRef.current.contains(e.target)) {
        setOpenOptionList(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [setOpenOptionList]);

  return (
    <div className="item-detail-option-selector" ref={optionRef}>
      <span
        className={`selected-option-display ${openOptionList ? "on" : ""}`}
        onClick={handleOpenOptionList}
      >
        <span>
          {selectedCount > 0
            ? `${selectedCount}개 옵션 선택됨`
            : "권종 선택"}
        </span>
      </span>
      <ul className={`option-list ${openOptionList ? "on" : ""}`}>
        {options.map((data, index) => (
          <li
            key={index}
            onClick={() => handleOption(data)}
            className="item-option"
          >
            {data.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ItemOptionSelector;
