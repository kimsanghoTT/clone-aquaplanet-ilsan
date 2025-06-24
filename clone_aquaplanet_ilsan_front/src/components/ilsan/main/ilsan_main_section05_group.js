import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const MainGroupSection = () => {
  const sectionRef = useRef(null);
  const groups = [
    {
      title: "학습단체·일반단체",
      text: "어린이집 및 유치원·/초·중·고등학생에 한하여/관람하시는 학습단체",
    },
    {
      title: "인바운드단체",
      text: "외국인을 유치하는 인바운드 여행사/및 유관기관 등을 통해/방문하는 단체",
    },
    {
      title: "기업단체",
      text: "일반기업체·관공서·/지역커뮤니티 맘카페 등을 통해/방문하는 단체",
    }
  ]
  useEffect(() => {
    const sectionTitle = sectionRef.current.querySelectorAll(
      ".section-title-reverse02 p"
    );
    const sectionContent = sectionRef.current.querySelectorAll(".group-item");

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

  const toggleGroupTap = (event, isActive) => {
    const selectedTap = event.currentTarget;
    const ico = selectedTap.querySelectorAll(".group-item .ico");
    const title = selectedTap.querySelectorAll(".group-card-title");
    const text = selectedTap.querySelectorAll(".group-card-text");
    const link = selectedTap.querySelectorAll(".group-item a");

    gsap.to(selectedTap, { background: isActive? "#3366FF" : "rgba(255, 255, 255, 0.15)", duration: 0.6 });
    gsap.to(ico, { opacity: isActive ? 1 : 0.5, y: isActive ? -30 : 0, duration: 0.6 });
    gsap.to(title, { y: isActive ? -55 : 0, duration: 0.6 });
    gsap.to(text, { y: isActive ? -55 : 0, duration: 0.6 });
    gsap.to(link, { opacity: isActive ? 1 : 0, y: isActive ? -20 : 0, duration: 0 });
  };
  
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
        <div className="group-section-content-box">
          {groups.map((item, index) => (
            <div key={index} className="group-item"
            onMouseEnter={(e) => toggleGroupTap(e, true)} onMouseLeave={(e) => toggleGroupTap(e, false)}>
              <span className="ico"></span>
              <span className="group-card-title">{item.title}</span>
              <span className="group-card-text">
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
export default MainGroupSection;
