import gsap from "gsap";
import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const MainGroupSection = () => {
  useEffect(() => {
    const sectionTitle = document.querySelectorAll(
      ".section-title-reverse02 p"
    );
    const sectionContent = document.querySelectorAll(".group-item");

    gsap.fromTo(
      sectionTitle,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: { trigger: ".section05", start: "top 30%" },
      }
    );

    gsap.fromTo(
      sectionContent,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: { trigger: ".section05", start: "top 80%" },
      }
    );
  }, []);

  const groupTapActive = (event) => {
    const selectedTap = event.currentTarget;
    const ico = selectedTap.querySelectorAll(".group-item .ico");
    const title = selectedTap.querySelectorAll(".group-card-title");
    const text = selectedTap.querySelectorAll(".group-card-text");
    const link = selectedTap.querySelectorAll(".group-item a");

    gsap.to(selectedTap, { background: "#3366FF", duration: 0.6 });
    gsap.to(ico, { opacity: 1, y: -30, duration: 0.6 });
    gsap.to(title, { y: -55, duration: 0.6 });
    gsap.to(text, { y: -55, duration: 0.6 });
    gsap.to(link, { opacity: 1, y: -20, duration: 0 });
  };

  const groupTapInactive = (event) => {
    const selectedTap = event.currentTarget;
    const ico = selectedTap.querySelectorAll(".group-item .ico");
    const title = selectedTap.querySelectorAll(".group-card-title");
    const text = selectedTap.querySelectorAll(".group-card-text");
    const link = selectedTap.querySelectorAll(".group-item a");

    gsap.to(selectedTap, {
      background: "rgba(255, 255, 255, 0.15)",
      duration: 0.6,
    });
    gsap.to(ico, { opacity: 0.5, y: 0, duration: 0.6 });
    gsap.to(title, { y: 0, duration: 0.6 });
    gsap.to(text, { y: 0, duration: 0.6 });
    gsap.to(link, { opacity: 0, y: 0, duration: 0 });
  };
  
  return (
    <section className="main-section section05">
      <div className="group-sub-bg"></div>
      <div className="section-container-inner">
        <div className="section-title-box-reverse section-title-reverse02">
          <p>Group</p>
          <p>
            아쿠아플라넷 일산의 <strong>다양한 혜택</strong>을 알아보세요
          </p>
        </div>
        <div className="group-section-content-box">
          <div
            className="group-item"
            onMouseEnter={groupTapActive}
            onMouseLeave={groupTapInactive}
          >
            <span className="ico"></span>
            <span className="group-card-title">학습단체·일반단체</span>
            <span className="group-card-text">
              어린이집 및 유치원· <br />
              초·중·고등학생에 한하여 <br />
              관람하시는 학습단체
            </span>
            <a href="/">자세히 보기</a>
          </div>
          <div
            className="group-item"
            onMouseEnter={groupTapActive}
            onMouseLeave={groupTapInactive}
          >
            <span className="ico"></span>
            <span className="group-card-title">인바운드단체</span>
            <span className="group-card-text">
              외국인을 유치하는 인바운드 여행사 <br />
              및 유관기관 등을 통해 <br />
              방문하는 단체
            </span>
            <a href="/">자세히 보기</a>
          </div>
          <div
            className="group-item"
            onMouseEnter={groupTapActive}
            onMouseLeave={groupTapInactive}
          >
            <span className="ico"></span>
            <span className="group-card-title">기업단체</span>
            <span className="group-card-text">
              일반기업체·관공서· <br />
              지역커뮤니티 맘카페 등을 통해 <br />
              방문하는 단체
            </span>
            <a href="/">자세히 보기</a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MainGroupSection;
