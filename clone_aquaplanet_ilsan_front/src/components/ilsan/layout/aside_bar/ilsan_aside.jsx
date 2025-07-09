import React, { useRef, useState } from "react";
import "../../../../css/ilsan/ilsan_aside.css"
import useTooltipVisibility from "./hooks/useTooltipVisibility";
import useScrollToTop from "./hooks/useScrollToTop";
import asideEvents from "./data/asides_events";
import useMainPageScroll from "../../main/hooks/useMainPageScroll";
import EventListItem from "./sub_components/event_item_list"
import SocialIcons from "./sub_components/social_icons";

const AsideBar = () => {
  const [eventListOpen, setEventListOpen] = useState(false);
  const eventItemBoxRef = useRef(null); 
  const { closeTooltipBox } = useTooltipVisibility();
  const { backToTop } = useScrollToTop();

  const handleEventListOpen = () => {
    setEventListOpen(!eventListOpen);
  };

  useMainPageScroll(eventItemBoxRef, eventListOpen);

  return (
    <>
      <div className={`overlay-film01 ${eventListOpen ? "filter" : ""}`}></div>
      <aside className={`${eventListOpen ? "active" : ""}`}>
        <div className="event-btn">
          <button onClick={handleEventListOpen} type="button">
            <span className="event-btn-text-box">
              <span
                className="ico"
                style={eventListOpen ? { transform: "rotate(180deg)" } : {}}
              ></span>
              <span>이벤트</span>
            </span>
          </button>
        </div>
        <SocialIcons/>
        <div className="top-btn">
          <button type="button" onClick={backToTop}>
            <span className="ico"></span>
          </button>
        </div>
        <div className="aside-tooltip" onMouseEnter={closeTooltipBox}>
          <span className="ico"></span>
          <span className="tooltip-text">
            SeeSeaTV 유튜브 채널을 만나보세요!
          </span>
        </div>
      </aside>
      <div className={`event-list-box ${eventListOpen ? "active" : ""}`}>
        <div className="event-box-title">
          <span className="ico"></span>
          <span>이벤트</span>
        </div>
        <div className="event-item-box" ref={eventItemBoxRef}>
          <ul className="event-list">
            {asideEvents.map((item) => (
              <EventListItem key={item.id} item={item} />
            ))}
          </ul>
          <div className="btn-more">
            <a href="/">
              <span className="ico"></span>
              <span>전체 이벤트 보기</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default AsideBar;
