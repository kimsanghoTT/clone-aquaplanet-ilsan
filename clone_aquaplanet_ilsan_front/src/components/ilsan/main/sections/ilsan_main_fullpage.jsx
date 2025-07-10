import React from "react";
import MainVideoSection from "./section01/ilsan_main_section01_video.jsx";
import MainProgramSection from "./section02/ilsan_main_section02_program.jsx";
import MainInfoSection from "./section03/ilsan_main_section03_information.jsx";
import MainEventSection from "./section04/ilsan_main_section04_event.jsx";
import MainGroupSection from "./section05/ilsan_main_section05_group.jsx";
import MainCommunitySection from "./section06/ilsan_main_section06_community.jsx";
import "../../../../css/ilsan/ilsan_main.css";
import useMainPageScroll from "../hooks/useMainPageScroll";

const Main = () => {
    useMainPageScroll();
    
    return(
        <div className="main-wrapper">
            <MainVideoSection/>
            <MainProgramSection/>
            <MainInfoSection/>
            <MainEventSection/>
            <MainGroupSection/>
            <MainCommunitySection/>
        </div>
    )
}
export default Main;