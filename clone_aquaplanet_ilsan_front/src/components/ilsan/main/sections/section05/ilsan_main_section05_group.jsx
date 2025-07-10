import React, { useRef } from "react";
import groups from "../../data/groups";
import useSectionScrollAnimation from "../../hooks/useSectionScrollAnimation";
import GroupItems from "./ilsan_main_section05_group_toggle_item.jsx";

const MainGroupSection = () => {
  const sectionRef = useRef(null);

  useSectionScrollAnimation(sectionRef, ".section-title-reverse02 p", ".group-item");
  
  return (
    <section className="main-section section05" ref={sectionRef}>
      <div className="group-sub-bg"></div>
      <div className="section-container-inner">
        <div className="section-title-box-reverse section-title-reverse02">
          <p>Group</p>
          <p>
            아쿠아플라넷 일산의 <strong>다양한 혜택</strong>을 알아보세요
          </p>
        </div>
        <div className="group-section-content-box section-content-box">
          {groups.map((item, index) => (
            <GroupItems key={index} item={item}/>
          ))}
        </div>
      </div>
    </section>
  );
};
export default MainGroupSection;
