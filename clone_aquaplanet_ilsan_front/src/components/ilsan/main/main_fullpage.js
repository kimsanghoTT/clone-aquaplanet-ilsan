import React, { useCallback, useEffect, useRef } from "react";
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
    //useCallback = 리렌더링 되더라도 함수가 초기화되는걸 막음. 함수용 useRef
    const wheelingScrollMethod = useCallback((e) => {
      if(e.target.closest(".event-item-box")){
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
      const wheelingDirection = e.deltaY > 0 ? 1 : -1; //위로 스크롤 : 음수, 아래로 스크롤 : 양수
      let scrollRange = window.innerHeight;

      if(scrollOnBottom <= 0){
        scrollRange = 500;
      }
      
      scroll.scrollMore(wheelingDirection * scrollRange, {duration : 700, smooth:true});

      setTimeout(() => {
        scrolling.current = false;
      }, 900);
    },[]);

    const keyArrowScrollMethod = useCallback((e) => {
      if(e.key !== "ArrowUp" && e.key !== "ArrowDown"){
        return;
      }

      if(scrolling.current){
        e.preventDefault();
      }

      e.preventDefault();
      scrolling.current = true;

      const scrollOnTop = window.pageYOffset;
      const scrollOnBottom = document.documentElement.scrollHeight - scrollOnTop - window.innerHeight;
      const keyBoardArrowDirection = e.key === "ArrowUp" ? -1 : 1;
      let scrollRange = window.innerHeight;

      if(scrollOnBottom <= 0){
        scrollRange = 500;
      }
      
      scroll.scrollMore(keyBoardArrowDirection * scrollRange, {duration : 700, smooth:true});

      setTimeout(() => {
        scrolling.current = false;
      }, 900);
    },[])

    const headerVisibility = useCallback(() => {
      if(!headerRef.current){
        return;
      }

      const scrollOnTop = window.pageYOffset;
      const scrollOnBottom = document.documentElement.scrollHeight - scrollOnTop - window.innerHeight;

      if(scrollOnBottom <= 0){
        headerRef.current.style.display = "none";
      }
      else{
        headerRef.current.style.display = "block";
      }

    },[])

    useEffect(() => {
      window.addEventListener("wheel", wheelingScrollMethod, {passive:false});
      window.addEventListener("keydown", keyArrowScrollMethod);
      window.addEventListener("scroll", headerVisibility);

      return () => {
        window.removeEventListener("wheel", wheelingScrollMethod);
        window.removeEventListener("keydown", keyArrowScrollMethod);
        window.removeEventListener("scroll", headerVisibility);
      }
    },[wheelingScrollMethod, keyArrowScrollMethod, headerVisibility])

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