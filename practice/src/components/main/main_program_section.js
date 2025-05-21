import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

const MainProgramSection = () => {
  useEffect(() => {
    const sectionTitle = document.querySelectorAll(".section-title01 p");
    const sectionContent = document.querySelectorAll(".program-section-content-box li");

    gsap.fromTo(sectionTitle, { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".section02",
          start: "top 30%",
          markers: true
        },
      }
    );

    gsap.fromTo(sectionContent, { opacity: 0, y: 100 }, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".section02",
          start: "top 30%",
        },
      }
    );

  }, []);

  const itemOpen = (event) => {
    const selectedProgram = event.currentTarget;
    const mainTitle = selectedProgram.querySelector(".item-inner-main-title");
    const subTitle = selectedProgram.querySelector(".item-inner-sub-title");
    const innerText = selectedProgram.querySelector(".item-inner-text");
    const link = selectedProgram.querySelector(".program-link");

    gsap.to(selectedProgram, {
      width: "660px",
      transform: "translateX(-348px)",
      boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.5)",
      zIndex: 10,
      duration: 0.3,
    });
    gsap.to(mainTitle, { opacity: 0, duration: 0 });
    gsap.to([subTitle, innerText, link], { opacity: 1, duration: 0 });
  };

  const itemClose = (event) => {
    const selectedProgram = event.currentTarget;
    const mainTitle = selectedProgram.querySelector(".item-inner-main-title");
    const subTitle = selectedProgram.querySelector(".item-inner-sub-title");
    const innerText = selectedProgram.querySelector(".item-inner-text");
    const link = selectedProgram.querySelector(".program-link");

    gsap.to(selectedProgram, {
      width: "312px",
      transform: "translateX(0)",
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
      zIndex: 1,
      duration: 0.3,
    });
    gsap.to(mainTitle, { opacity: 1, duration: 0 });
    gsap.to([subTitle, innerText, link], { opacity: 0, duration: 0 });
  };

  return (
    <section className="main-section section02">
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
            <li>
              <div
                className="item-inner"
                style={{
                  backgroundImage: "url(/img/2025479122336619802442_7.png)",
                }}
                onMouseEnter={itemOpen}
                onMouseLeave={itemClose}
              >
                <span className="item-inner-bg"></span>
                <span className="item-inner-main-title">생태 설명회</span>
                <span className="item-inner-sub-title">생태 설명회</span>
                <span className="item-inner-text">
                  일산만의 다양한 생태설명회 프로그램을 만나보세요.
                </span>
                <a className="program-link" href="/">
                  자세히 보기
                </a>
              </div>
            </li>
            <li>
              <div
                className="item-inner"
                style={{
                  backgroundImage: "url(/img/202511010235112511337987_12.png)",
                }}
                onMouseEnter={itemOpen}
                onMouseLeave={itemClose}
              >
                <span className="item-inner-bg"></span>
                <span className="item-inner-main-title">공연 프로그램</span>
                <span className="item-inner-sub-title">공연 프로그램</span>
                <span className="item-inner-text">
                  일산만의 다양한 공연 프로그램을 만나보세요.
                </span>
                <a className="program-link" href="/">
                  자세히 보기
                </a>
              </div>
            </li>
            <li>
              <div
                className="item-inner"
                style={{
                  backgroundImage: "url(/img/20202284422323312240548_11.jpg)",
                }}
                onMouseEnter={itemOpen}
                onMouseLeave={itemClose}
              >
                <span className="item-inner-bg"></span>
                <span className="item-inner-main-title">피딩 프로그램</span>
                <span className="item-inner-sub-title">피딩 프로그램</span>
                <span className="item-inner-text">
                  일산만의 피딩 프로그램을 만나보세요.
                </span>
                <a className="program-link" href="/">
                  자세히 보기
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default MainProgramSection;
