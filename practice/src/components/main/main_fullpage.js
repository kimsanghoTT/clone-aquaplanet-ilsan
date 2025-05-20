import React, { useEffect, useRef } from "react";
import MainVideoSection from "./main_video_section";
import MainProgramSection from "./main_program_section";
import { animateScroll as scroll } from "react-scroll";
import MainInfoSection from "./main_information_section";
import MainEventSection from "./main_event_section";
import MainGroupSection from "./main_group_section";
import MainCommunitySection from "./main_community_section";

const Main = () => {

    const scrolling = useRef(false);

    useEffect(() => {
        const mouseWheeling = (e) => {

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

        //페이지가 렌더링 될 때 마우스 휠을 이벤트 동작 대상으로 지정
        window.addEventListener("wheel", mouseWheeling, {passive : false});

        //렌더링이 끝날 때 마우스 휠을 이벤트 동작 대상에서 제거해 메모리 누수 방지
        return (() => {
            window.removeEventListener("wheel", mouseWheeling);
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