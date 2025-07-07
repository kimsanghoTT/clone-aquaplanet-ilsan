import React, { useState } from 'react';

const FamilySite = ({ familyLinks }) => {
  const [listOpen, setListOpen] = useState(false);
  const [selectedLinkIndex, setSelectedLinkIndex] = useState(null); 

  const toggleList = () => setListOpen(!listOpen);

  const handleLinkSelect = (index) => {
    setSelectedLinkIndex(index);
    setListOpen(false);
  };

  const currentSelectedLink = familyLinks[selectedLinkIndex];

  return (
    <div className="family-site-btn">
      <button type="button" onClick={toggleList}>
        <span className="navigate-target">
          {currentSelectedLink ? currentSelectedLink.text : "패밀리 사이트"}
        </span>
        <span className="ico" style={{ transform: listOpen ? "rotate(180deg)" : "none" }}></span>
      </button>
      <ul className={`family-list ${listOpen ? "active" : ""}`}>
        {familyLinks.map((item, index) => (
          <li
            key={index}
            className={`family-item ${selectedLinkIndex === index ? "on" : ""}`}
            onClick={() => handleLinkSelect(index)}
          >
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <div className="family-navigate-btn">
        <a 
          href={currentSelectedLink?.link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <span>이동</span>
        </a>
      </div>
    </div>
  );
};

export default FamilySite;