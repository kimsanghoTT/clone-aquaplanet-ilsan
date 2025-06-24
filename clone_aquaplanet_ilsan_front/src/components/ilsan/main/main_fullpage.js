import React, { useEffect, useRef, useCallback } from "react"; // useCallback 추가
import { animateScroll as scroll } from "react-scroll";
// gsap와 ScrollTrigger는 여기서는 사용되지 않으므로 제거합니다.
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
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

    useEffect(() => {
        headerRef.current = document.querySelector("header");
    }, []); 

    const handleWheel = useCallback((e) => {
        if (e.target.closest(".event-item-box")) {
            return;
        }

        if (scrolling.current) {
            e.preventDefault();
            return;
        }

        e.preventDefault(); 

        scrolling.current = true;

        const scrollOnTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollOnBottom = document.documentElement.scrollHeight - scrollOnTop - window.innerHeight;
        const wheelingDirection = e.deltaY > 0 ? 1 : -1; 

        let scrollAmount = window.innerHeight; 
        let duration = 700;

        if (scrollOnBottom <= 0) {
            scrollAmount = 500;
        }

        scroll.scrollMore(wheelingDirection * scrollAmount, { duration: duration, smooth: true });

        setTimeout(() => {
            scrolling.current = false;
        }, duration + 200); 
    }, []); 

    const handleArrowMoving = useCallback((e) => {
        if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
            return;
        }

        if (scrolling.current) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        scrolling.current = true;

        const keyboardArrowDirection = e.key === "ArrowUp" ? -1 : 1;
        scroll.scrollMore(keyboardArrowDirection * window.innerHeight, { duration: 700, smooth: true }); 

        setTimeout(() => {
            scrolling.current = false;
        }, 900);
    }, []); 

    const handleHeaderVisibility = useCallback(() => {
        if (!headerRef.current) return; 

        const scrollOnTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollOnBottom = document.documentElement.scrollHeight - scrollOnTop - window.innerHeight;

        if (scrollOnBottom <= 0) {
            headerRef.current.style.display = "none";
        } else {
            headerRef.current.style.display = "block";
        }
    }, []); 

    useEffect(() => {
        window.addEventListener("wheel", handleWheel, { passive: false }); 
        window.addEventListener("keydown", handleArrowMoving);
        window.addEventListener("scroll", handleHeaderVisibility);

        return () => {
            window.removeEventListener("wheel", handleWheel, { passive: false });
            window.removeEventListener("keydown", handleArrowMoving);
            window.removeEventListener("scroll", handleHeaderVisibility);
        };
    }, [handleWheel, handleArrowMoving, handleHeaderVisibility]); 

    return (
        <div className="main-wrapper">
            <MainVideoSection />
            <MainProgramSection />
            <MainInfoSection />
            <MainEventSection />
            <MainGroupSection />
            <MainCommunitySection />
        </div>
    );
};

export default Main;