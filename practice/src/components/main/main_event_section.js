import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const MainEventSection = () => {
  useEffect(() => {
    const sectionTitle = document.querySelectorAll(".section-title02 p");
    const sectionContent = document.querySelectorAll(".event-item");

    gsap.fromTo(
      sectionTitle,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".section04",
          start: "top 30%",
        },
      }
    );

    gsap.fromTo(
      sectionContent,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionContent,
          start: "top 80%",
        },
      }
    );
  }, []);

  const EventTapActive = (event) => {
    const selectedEvent = event.currentTarget;
    const ico = selectedEvent.querySelectorAll(".event-item .ico");
    const title = selectedEvent.querySelectorAll(".event-card-title");
    const text = selectedEvent.querySelectorAll(".event-card-text");
    const link = selectedEvent.querySelectorAll(".event-item a");

    gsap.to(selectedEvent, {background: "#3366FF", duration:0.6});
    gsap.to(ico, {opacity: 1, y:-50, duration:0.6});
    gsap.to(title, {y: -80, duration:0.6});
    gsap.to(text, {y: -80, duration:0.6});
    gsap.to(link, {opacity:1, y:-20, duration:0});
  }

  const EventTapInactive = (event) => {
    const selectedEvent = event.currentTarget;
    const ico = selectedEvent.querySelectorAll(".event-item .ico");
    const title = selectedEvent.querySelectorAll(".event-card-title");
    const text = selectedEvent.querySelectorAll(".event-card-text");
    const link = selectedEvent.querySelectorAll(".event-item a");

    gsap.to(selectedEvent, {background: "rgba(255, 255, 255, 0.15)", duration:0.6});
    gsap.to(ico, {opacity:0.5, y:0, duration:0.6});
    gsap.to(title, {y: 0, duration:0.6});
    gsap.to(text, {y: 0, duration:0.6});
    gsap.to(link, {opacity:0, y:0, duration:0});
  }
  return (
    <section className="main-section section04">
      <div className="section-container-inner">
        <div className="section-title-box section-title02">
          <p>Event</p>
          <p>
            아쿠아플라넷 일산의 <strong>다양한 이벤트</strong>를 경험해 보세요
          </p>
        </div>
        <div className="event-section-content-box">
          <div className="event-item" onMouseEnter={EventTapActive} onMouseLeave={EventTapInactive}>
            <span className="ico"></span>
            <span className="event-card-title">이벤트</span>
            <span className="event-card-text">
              특별 이벤트와 <br /> 통합 이벤트를 만나보세요
            </span>
            <a href="/">자세히 보기</a>
          </div>
          <div className="event-item" onMouseEnter={EventTapActive} onMouseLeave={EventTapInactive}>
            <span className="ico"></span>
            <span className="event-card-title">제휴할인</span>
            <span className="event-card-text">
              제휴카드, 멤버십 할인 등 <br />
              우대 혜택을 알아보세요.
            </span>
            <a href="/">자세히 보기</a>
          </div>
          <div className="event-item" onMouseEnter={EventTapActive} onMouseLeave={EventTapInactive}>
            <span className="ico"></span>
            <span className="event-card-title">연간회원</span>
            <span className="event-card-text">
              365일 매일매일 <br />
              아쿠아플라넷과 함께해요!
            </span>
            <a href="/">자세히 보기</a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MainEventSection;
