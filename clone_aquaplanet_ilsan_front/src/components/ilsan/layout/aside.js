import React, { useEffect, useState } from "react";
import "../../../css/ilsan/aside.css";
import gsap from "gsap";

const AsideBar = () => {
  const [eventList, setEventList] = useState(false);

  const backToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const eventListOpen = () => {
    setEventList(!eventList);
  };

  const closeTooltipBox = () => {
    gsap.to(".aside-tooltip", {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.2,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      gsap.to(".aside-tooltip", {
        opacity: 1,
        pointerEvents: "all",
        duration: 0.2,
      });
    }, 2000);
  }, []);

  useEffect(() => {
    const topBtnScrollEvent = () => {
      const scrollOnTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollOnTop === 0) {
        gsap.to(".top-btn", { opacity: 0, duration: 0.6 });
      } else if (scrollOnTop !== 0) {
        gsap.to(".top-btn", { opacity: 1, duration: 0.6 });
      }
    };
    window.addEventListener("scroll", topBtnScrollEvent);

    return () => {
      window.removeEventListener("scroll", topBtnScrollEvent);
    };
  }, []);

  return (
    <>
      <div className={`overlay-film01 ${eventList ? "filter" : ""}`}></div>
      <aside className={`${eventList ? "active" : ""}`}>
        <div className="event-btn">
          <button onClick={eventListOpen} type="button">
            <span className="event-btn-text-box">
              <span
                className="ico"
                style={eventList ? { transform: "rotate(180deg)" } : {}}
              ></span>
              <span>이벤트</span>
            </span>
          </button>
        </div>
        <ul className="social-icons">
          <li className="location">
            <a href="/">
              <span className="ico" title="가이드맵"></span>
            </a>
          </li>
          <li className="youtube">
            <a href="/" title="유튜브">
              <span className="ico"></span>
            </a>
          </li>
          <li className="program" title="프로그램">
            <a href="/">
              <span className="ico"></span>
            </a>
          </li>
          <li className="instagram" title="인스타그램">
            <a href="/">
              <span className="ico"></span>
            </a>
          </li>
        </ul>
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
                  src="/img/ilsan/20254308102320918318934_3337.png"
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
                  src="/img/ilsan/2025430834495013673874_3335.png"
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
                  src="/img/ilsan/20253119523156411967199_3298.jpg"
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
                <span className="event-intro">
                  쿠팡와우회원 특별 프로모션
                </span>
              </span>
            </li>
            <li className="item">
              <span className="event-img-area">
                <img
                  className="event-img"
                  src="/img/ilsan/2025110363571119452245_3257.png"
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
    </>
  );
};
export default AsideBar;
