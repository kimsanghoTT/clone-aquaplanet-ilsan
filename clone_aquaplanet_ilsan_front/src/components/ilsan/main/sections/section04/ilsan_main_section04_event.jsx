import React, { useRef } from "react";
import events from "../../data/events";
import useSectionScrollAnimation from "../../hooks/useSectionScrollAnimation";
import EventItems from "./ilsan_main_section04_event_toggle_item.jsx";

const MainEventSection = () => {
  const sectionRef = useRef(null);

  useSectionScrollAnimation(sectionRef, ".section-title02 p", ".event-item")

  return (
    <section className="main-section section04" ref={sectionRef}>
      <div className="section-container-inner">
        <div className="section-title-box section-title02">
          <p>Event</p>
          <p>
            아쿠아플라넷 일산의 <strong>다양한 이벤트</strong>를 경험해 보세요
          </p>
        </div>
        <div className="event-section-content-box section-content-box">
          {events.map((item, index) => (
            <EventItems key={index} item={item}/>
          ))}
        </div>
      </div>
    </section>
  );
};
export default MainEventSection;
