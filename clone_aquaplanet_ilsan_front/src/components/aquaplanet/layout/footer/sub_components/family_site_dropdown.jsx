import React, { useEffect, useRef, useState } from "react";
import { familyLinks } from "../../data/constants";

const FamilySiteDropdown = () => {

  const [selectedFamilyLink, setSelectedFamilyLink] = useState("패밀리사이트");
  const [familyLinkListOpen, setFamilyLinkListOpen] = useState(false);
  const familyBtnRef = useRef(null);

    useEffect(() => {
        const clickOutside = (e) => {
            if(familyBtnRef.current && !familyBtnRef.current.contains(e.target)){
                setFamilyLinkListOpen(false);
            }
        }

        window.addEventListener("mousedown", clickOutside);
        return () => {
            window.removeEventListener("mousedown", clickOutside);
        }
    },[])

    const handleFamilyLinkList = () => {
        setFamilyLinkListOpen(!familyLinkListOpen);
    };

    const familyLinkSelection = (link) => {
        setSelectedFamilyLink(link);
        setFamilyLinkListOpen(false);
    };

    return(
        <div className="aquaplaent-family-site-btn">
          <span
            className={`family-link-display ${familyLinkListOpen ? "on" : ""}`}
            onClick={handleFamilyLinkList}
          >
            {selectedFamilyLink}
          </span>
          <ul
            className={`family-link-selector ${familyLinkListOpen ? "on" : ""}`}
            ref={familyBtnRef}
          >
            <li disabled className="family-link-item">패밀리사이트</li>
            {familyLinks.map((link, index) => (
                <li key={index}
                className={`family-link-item ${selectedFamilyLink === link ? "selected" : ""}`}
                onClick={() => familyLinkSelection(link)}
                >
                    <span>{link}</span>
                </li>
            ))}
          </ul>
        </div>
    )
}
export default FamilySiteDropdown;