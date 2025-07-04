import React from "react";
import MainVideoSection from "./section01/ilsan_main_section01_video";
import MainProgramSection from "./section02/ilsan_main_section02_program";
import MainInfoSection from "./section03/ilsan_main_section03_information";
import MainEventSection from "./section04/ilsan_main_section04_event";
import MainGroupSection from "./section05/ilsan_main_section05_group";
import MainCommunitySection from "./section06/ilsan_main_section06_community";
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