import React, { useState } from "react";
import { sponsors } from "../data/data";

const PlanetContent04 = () => {
    const [activeTab, setActiveTab] = useState("organization");

    const sponsorTabHandler = (tab) => {
        setActiveTab(tab);
    }

    return(
        <div id="planet04" className="planet-content-box content-04">
            <div className="center-content">
                <div className="content-title">
                    <h2>Sponsors & Partnerships</h2>
                </div>
                <div className="tab-btn-box">
                    <span 
                    className={activeTab === "organization" ? "active" : ""} 
                    onClick={() => sponsorTabHandler("organization")}>
                        Organization
                    </span>
                    <span 
                    className={activeTab === "company" ? "active" : ""} 
                    onClick={() => sponsorTabHandler("company")}>
                        Company
                    </span>
                </div>
                <div className="tab-content-box">
                    {activeTab === "organization" && (
                    <ul className="content-list organization">
                        {sponsors.organization.map(item => (
                        <li key={item.id}>
                            <div className="sponsor-img-box">
                                <img src={item.logo} alt={item.logo} />
                            </div>
                            <p className="sponsor-name">{item.name}</p>
                        </li>
                        ))}
                    </ul>
                    )}
                    {activeTab === "company" && (
                    <ul className="content-list company">
                        {sponsors.company.map(item => (
                        <li key={item.id}>
                            <div className="sponsor-img-box">
                                <img src={item.logo} alt={item.logo} />
                            </div>
                            <p className="sponsor-name">{item.name}</p>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>
        </div>
    )
}
export default PlanetContent04;