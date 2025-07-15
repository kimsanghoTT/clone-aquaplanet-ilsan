import React, { useRef } from "react";
import { sections } from "../../data/data.js";
import useMainPagination from "../../hooks/useMainPagination.js";

const MainPagination = () => {
    const paginationRef = useRef(null);

    const {scrollToSection, navigateSection} = useMainPagination(sections, paginationRef);

  return (
    <div className="main-pagination" ref={paginationRef}>
      <ul>
        {sections && sections.map(section =>(
            <li key={section.id} className={navigateSection === section.id ? "active" : ""} onClick={() => scrollToSection(section.id)}>
                <span>{section.label}</span>
            </li>
        ))}
      </ul>
    </div>
  );
};
export default MainPagination;
