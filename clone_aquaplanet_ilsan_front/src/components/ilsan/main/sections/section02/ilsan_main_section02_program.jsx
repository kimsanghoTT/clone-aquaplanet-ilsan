
import React, { useRef } from "react";
import programs from "../../data/programs";
import useSectionScrollAnimation from "../../hooks/useSectionScrollAnimation";
import ProgramItems from "./ilsan_main_section02_program_toggle_item.jsx";

const MainProgramSection = () => {
  const sectionRef = useRef(null);

  useSectionScrollAnimation(sectionRef, ".section-title01 p", ".section-content-box li");

  return (
    <section className="main-section section02" ref={sectionRef}>
      <div className="program-sub-bg"></div>
      <div className="section-container-inner">
        <div className="section-title-box section-title01">
          <p>Program</p>
          <p>
            일산의 바다와 아쿠아플라넷 <strong>해양 생물의 만남</strong>
          </p>
        </div>
        <div className="program-section-content-box section-content-box">
          <ul>
            {programs.map((program, index) => (
              <ProgramItems program={program} key={index}/>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default MainProgramSection;
