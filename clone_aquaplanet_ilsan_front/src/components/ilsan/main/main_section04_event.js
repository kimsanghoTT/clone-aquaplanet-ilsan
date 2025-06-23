import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const MainEventSection = () => {
  const sectionRef = useRef(null);
    const events = [
    {
      title: "이벤트",
      text: "특별 이벤트와/통합 이벤트를 만나보세요",
    },
    {
      title: "제휴할인",
      text: "제휴카드, 멤버십 할인 등/우대 혜택을 알아보세요.",
    },
    {
      title: "연간회원",
      text: "365일 매일매일/아쿠아플라넷과 함께해요!",
    },
  ];

  useEffect(() => {
    const sectionTitle = sectionRef.current.querySelectorAll(".section-title02 p");
    const sectionContent = sectionRef.current.querySelectorAll(".event-item");

    gsap.fromTo(
      sectionTitle,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: { trigger: ".section04", start: "top 30%" },
      }
    );

    gsap.fromTo(
      sectionContent,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: { trigger: ".section04", start: "top 80%" },
      }
    );
  }, []);

  const toggleEventTap = (event, isActive) => {
    const selectedTap = event.currentTarget;
    const ico = selectedTap.querySelector(".ico");
    const title = selectedTap.querySelector(".event-card-title");
    const text = selectedTap.querySelector(".event-card-text");
    const link = selectedTap.querySelector("a");

    if (!ico || !title || !text || !link) return;

    gsap.to(selectedTap, {
      background: isActive ? "#3366FF" : "rgba(255, 255, 255, 0.15)",
      duration: 0.6,
    });
      
    gsap.to(ico, { opacity: isActive ? 1 : 0.5, y: isActive ? -50 : 0, duration: 0.6 });
    gsap.to(title, { y: isActive ? -80 : 0, duration: 0.6 });
    gsap.to(text, { y: isActive ? -80 : 0, duration: 0.6 });
    gsap.to(link, { opacity: isActive ? 1 : 0, y: isActive ? -20 : 0, duration: 0 });
  };

  return (
    <section className="main-section section04" ref={sectionRef}>
      <div className="section-container-inner">
        <div className="section-title-box section-title02">
          <p>Event</p>
          <p>
            아쿠아플라넷 일산의 <strong>다양한 이벤트</strong>를 경험해 보세요
          </p>
        </div>
        <div className="event-section-content-box">
          {events.map((item, index) => (
            <div
              key={index}
              className="event-item"
              onMouseEnter={(e) => toggleEventTap(e, true)}
              onMouseLeave={(e) => toggleEventTap(e, false)}
            >
              <span className="ico"></span>
              <span className="event-card-title">{item.title}</span>
              <span className="event-card-text">
                {item.text.split("/").map((text, index) => (
                  <React.Fragment key={index}>
                    {text}
                    <br/>
                  </React.Fragment>
                ))}
              </span>
              <a href='/'>자세히 보기</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default MainEventSection;
