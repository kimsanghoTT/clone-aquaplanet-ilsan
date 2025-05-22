import React, { useState } from "react";
import "../../css/aside.css";

const AsideBar = () => {
  const [eventList, setEventList] = useState(false);

  const EventList = () => {
    setEventList(!eventList);
  };

  return (
    <>
      <div className={`overlay-film01 ${eventList ? "filter" : ""}`}></div>
      <aside className={`${eventList ? "active" : ""}`}>
        <div className="event-btn">
          <button onClick={EventList}>
            <span className="event-btn-text-box">
              <span
                className="ico"
                style={eventList ? { transform: "rotate(180deg)" } : {}}
              ></span>
              <span>이벤트</span>
            </span>
          </button>
        </div>
        <div className={`event-list-box ${eventList ? "active" : ""}`}>
          <div className="event-box-title">
            <span className="ico"></span>
            <span>이벤트</span>
          </div>
          <div className="event-item-box">
            <ul className="event-list">
              <li className="item">
                <span className="event-img-area">
                  <img
                    className="event-img"
                    src="/img/20254308102320918318934_3337.png"
                    alt="event1"
                  />
                  <div className="overlay-film02"></div>
                  <button className="more">자세히 보기</button>
                </span>
                <span className="event-text-area">
                  <span>
                    <span className="event-title">특별이벤트</span>
                    <span className="highlight-line"></span>
                  </span>
                  <span className="event-intro">
                    25년 5월 가정의 달 특별 프로모션
                  </span>
                </span>
              </li>
              <li className="item">
                <span className="event-img-area">
                  <img
                    className="event-img"
                    src="/img/2025430834495013673874_3335.png"
                    alt="event2"
                  />
                  <div className="overlay-film02"></div>
                  <button className="more">자세히 보기</button>
                </span>
                <span className="event-text-area">
                  <span>
                    <span className="event-title">제휴할인</span>
                    <span className="highlight-line"></span>
                  </span>
                  <span className="event-intro">
                    25년 5월 LG 유플러스 특별 제휴 프로모션
                  </span>
                </span>
              </li>
              <li className="item">
                <span className="event-img-area">
                  <img
                    className="event-img"
                    src="/img/20253119523156411967199_3298.jpg"
                    alt="event3"
                  />
                  <div className="overlay-film02"></div>
                  <button className="more">자세히 보기</button>
                </span>
                <span className="event-text-area">
                  <span>
                    <span className="event-title">제휴할인</span>
                    <span className="highlight-line"></span>
                  </span>
                  <span className="event-intro">쿠팡와우회원 특별 프로모션</span>
                </span>
              </li>
              <li className="item">
                <span className="event-img-area">
                  <img
                    className="event-img"
                    src="/img/2025110363571119452245_3257.png"
                    alt="event4"
                  />
                  <div className="overlay-film02"></div>
                  <button className="more">자세히 보기</button>
                </span>
                <span className="event-text-area">
                  <span>
                    <span className="event-title">특별이벤트</span>
                    <span className="highlight-line"></span>
                  </span>
                  <span className="event-intro">25년 연간이용권 안내</span>
                </span>
              </li>
            </ul>
            <div className="btn-more">
              <a href="/">
                <span className="ico"></span>
                <span>전체 이벤트 보기</span>
              </a>
            </div>
          </div>
        </div>
        <ul className="social-icons">
          <li className="location">
            <a href="/">
              <span className="ico"></span>
            </a>
          </li>
          <li className="youtube">
            <a href="/">
              <span className="ico"></span>
            </a>
          </li>
          <li className="program">
            <a href="/">
              <span className="ico"></span>
            </a>
          </li>
          <li className="instagram">
            <a href="/">
              <span className="ico"></span>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};
export default AsideBar;