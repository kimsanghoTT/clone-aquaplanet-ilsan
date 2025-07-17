import React, { useRef } from "react";
import { sections } from "../data/data.js";
import usePlanetPagination from "../hooks/usePlanetPagination.js";

const PlanetPagination = () => {
    const paginationRef = useRef(null);

    const {scrollToSection, navigateSection} = usePlanetPagination(sections, paginationRef);

  return (
    <div className="planet-pagination" ref={paginationRef}>
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
export default PlanetPagination;
