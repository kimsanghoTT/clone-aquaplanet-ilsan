import React, { useEffect, useRef } from "react";
import { animateScroll as scroll } from "react-scroll";
import MainVideoSection from "./main_section01_video";
import MainProgramSection from "./main_section02_program";
import MainInfoSection from "./main_section03_information";
import MainEventSection from "./main_section04_event";
import MainGroupSection from "./main_section05_group";
import MainCommunitySection from "./main_section06_community";

const Main = () => {

    const scrolling = useRef(false);

    useEffect(() => {
        const mouseWheeling = (e) => {

            // 사이드바(이벤트 리스트)에서 스크롤 시 본 페이지에서의 스크롤을 막음
            if (e.target.closest(".event-item-box")) {
                    return; 
            }
            // 스크롤이 동작 중(애니메이션 중) 이면 중복 실행 방지
            if(scrolling.current){
                e.preventDefault();
                return;
            }

            e.preventDefault();
            scrolling.current = true;
            
            //e.deltaY = 마우스 휠 방향 객체 : 위->양수, 아래->음수 반환
            const wheelingDirection = e.deltaY > 0 ? 1 : -1
            scroll.scrollMore(wheelingDirection * 920, {duration: 700, smooth: true});

            setTimeout(() => {
                scrolling.current = false;
            }, 900);
        }

        const ArrowMoving = (e) => {
            //방향키일 때만 동작하도록 설정
            if(e.key !== "ArrowUp" && e.key !== "ArrowDown"){
                return;
            }

            if(scrolling.current){
                e.preventDefault();
                return;
            }
            scrolling.current = true;
            
            const keyboardArrowDirection = e.key === "ArrowUp" ? -1 : 1;
            scroll.scrollMore(keyboardArrowDirection * 920, {duration: 700, smooth: true});

            setTimeout(() => {
                scrolling.current = false;
            }, 900);
        }

        //페이지가 로드 될 때 마우스 휠을 이벤트 동작 대상으로 지정
        window.addEventListener("wheel", mouseWheeling, {passive : false});

        //페이지가 로드 될 때 방향키 눌림를 이벤트 동작 대상으로 지정
        window.addEventListener("keydown", ArrowMoving)

        //페이지 로딩이 끝날 때 마우스 휠을 이벤트 동작 대상에서 제거해 메모리 누수 방지
        return (() => {
            window.removeEventListener("wheel", mouseWheeling);
            window.removeEventListener("keydown", ArrowMoving);
        })
        
    },[])
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