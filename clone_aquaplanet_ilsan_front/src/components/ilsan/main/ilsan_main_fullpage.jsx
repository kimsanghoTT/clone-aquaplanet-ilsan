import React, { useRef } from "react";
import MainVideoSection from "./sub_components/section01/ilsan_main_section01_video.jsx";
import MainProgramSection from "./sub_components/section02/ilsan_main_section02_program.jsx";
import MainInfoSection from "./sub_components/section03/ilsan_main_section03_information.jsx";
import MainEventSection from "./sub_components/section04/ilsan_main_section04_event.jsx";
import MainGroupSection from "./sub_components/section05/ilsan_main_section05_group.jsx";
import MainCommunitySection from "./sub_components/section06/ilsan_main_section06_community.jsx";
import "../../../css/ilsan/ilsan_main.css";
import useMainPageScroll from "./hooks/useMainPageScroll.js";
import ScrollGuide from "./sub_components/scroll_guide/ilsan_main_scroll_guide.jsx";
import MainPagination from "./sub_components/pagination/ilsan_main_pagination.jsx";

const Main = ({eventListOpen}) => {

    //새로 고침 시 페이지 회복기능 제거
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }
    
    const mainPageRef = useRef();
    useMainPageScroll(mainPageRef, eventListOpen)
    return(
        <div className="main-wrapper"ref={mainPageRef}>
            <MainVideoSection/>
            <MainProgramSection/>
            <MainInfoSection/>
            <MainEventSection/>
            <MainGroupSection/>
            <MainCommunitySection/>
            <ScrollGuide/>
            <MainPagination/>
        </div>
    )
}
export default Main;