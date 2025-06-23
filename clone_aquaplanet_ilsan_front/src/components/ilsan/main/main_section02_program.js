import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const MainProgramSection = () => {
  const sectionRef = useRef(null);
  const programs = [
    {
      title: "생태 설명회",
      subtitle: "생태 설명회",
      description: "일산만의 다양한 생태설명회 프로그램을 만나보세요.",
      image: "/img/ilsan/2025479122336619802442_7.png",
    },
    {
      title: "공연 프로그램",
      subtitle: "공연 프로그램",
      description: "일산만의 다양한 공연 프로그램을 만나보세요.",
      image: "/img/ilsan/202511010235112511337987_12.png",
    },
    {
      title: "피딩 프로그램",
      subtitle: "피딩 프로그램",
      description: "일산만의 피딩 프로그램을 만나보세요.",
      image: "/img/ilsan/20202284422323312240548_11.jpg",
    },
  ];
  useEffect(() => {
    const sectionTitle = sectionRef.current.querySelectorAll(".section-title01 p");
    const sectionContent = sectionRef.current.querySelectorAll(".program-section-content-box li");

    gsap.fromTo(
      sectionTitle,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: { trigger: ".section02", start: "top 30%" },
      }
    );

    gsap.fromTo(
      sectionContent,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: { trigger: ".section02", start: "top 30%" },
      }
    );
  }, []);

  const toggleItem = (event, toggle) => {
    const selectedProgram = event.currentTarget;
    const mainTitle = selectedProgram.querySelector(".item-inner-main-title");
    const subTitle = selectedProgram.querySelector(".item-inner-sub-title");
    const innerText = selectedProgram.querySelector(".item-inner-text");
    const link = selectedProgram.querySelector(".program-link");

    if (!mainTitle || !subTitle || !innerText || !link) return;

    gsap.to(selectedProgram, {
      width: toggle ? "660px" : "312px",
      transform: toggle ? "translateX(-348px)" : "translateX(0)",
      boxShadow: toggle ? "0 0 30px 0 rgba(0, 0, 0, 0.5)" : "0 0 0 0",
      zIndex: toggle ? 10 : 1,
      duration: 0.5,
    });
    gsap.to(mainTitle, { opacity: toggle ?  0 : 1, duration: 0 });
    gsap.to([subTitle, innerText, link], { opacity: toggle ?  1 : 0, duration: 0 });
  };

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
        <div className="program-section-content-box">
          <ul>
            {programs.map((program, index) => (
              <li key={index}>
                <div className="item-inner" style={{backgroundImage: `url(${program.image})`}} 
                onMouseEnter={(e) => toggleItem(e, true)} onMouseLeave={(e) => toggleItem(e, false)}>
                  <span className="item-inner-bg"></span>
                  <span className="item-inner-main-title">{program.title}</span>
                  <span className="item-inner-sub-title">{program.subtitle}</span>
                  <span className="item-inner-text">{program.description}</span>
                  <a className="program-link" href="/">
                    자세히 보기
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default MainProgramSection;
