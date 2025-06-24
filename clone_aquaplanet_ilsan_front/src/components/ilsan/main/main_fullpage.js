import React, { useEffect, useRef } from "react";
import { animateScroll as scroll } from "react-scroll";
import MainVideoSection from "./main_section01_video";
import MainProgramSection from "./main_section02_program";
import MainInfoSection from "./main_section03_information";
import MainEventSection from "./main_section04_event";
import MainGroupSection from "./main_section05_group";
import MainCommunitySection from "./main_section06_community";
import "../../../css/ilsan/main.css";

const Main = () => {

    const scrolling = useRef(false);
    const headerRef = useRef(null);

    useEffect(() =>{
      headerRef.current = document.querySelector("header");
    },[])

    const scrollMethod = (e) => {
      if(e.target.closet(".event-item-box")){
        return;
      }

      if(scrolling.current){
        e.preventDefault();
        return;
      }
      e.preventDefault();
      scrolling.current = true;

      const scrollOnTop = window.pageYOffset;
      const scrollOnBottom = document.documentElement.scrollHeight - scrollOnTop - window.innerHeight;
      const wheelingDirection = e.deltaY > 0 ? 1 : -1; //위로 스크롤 : 양수, 아래로 스크롤 : 음수

      if(scrollOnBottom <= 0){
        
      }
      
      scroll.scrollMore(wheelingDirection * window.innerHeight, {duration : 700, smooth:true});
    }

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