import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const MainCommunitySection = () => {
  const sectionRef = useRef(null);
  const notice = [
    {
      type:"공지",
      title:"'25년 이용요금 변경 안내",
      date:"2025.04.25"
    },
    {
      type:"공지",
      title:"특별 전시 '다흑 곤충 파충류 기획전' 기간 연장 안내",
      date:"2025.03.10"
    },
    {
      type:"공지",
      title:"반입 제한 물품 안내",
      date:"2023.08.03"
    },
    {
      type:"공지",
      title:"관람동선 모바일 전자 리플렛",
      date:"2023.02.09"
    },
  ]

  useEffect(() => {
    const sectionTitle = sectionRef.current.querySelectorAll(".section-title03 p");
    const sectionContent = sectionRef.current.querySelectorAll(".notice-item");

    gsap.fromTo(
      sectionTitle,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: { trigger: ".section06", start: "top 30%" },
      }
    );
    gsap.fromTo(
      sectionContent,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: { trigger: ".section06", start: "top 30%" },
      }
    );
  }, []);

  return (
    <section className="main-section section06" ref={sectionRef}>
      <div className="section-container-inner">
        <div className="section-title-box section-title03">
          <p>Community</p>
          <p>
            아쿠아플라넷 일산의 <strong>최신 소식</strong>을 알려드립니다
          </p>
        </div>
        <div className="community-section-content-box">
          <ul>
            {notice.map((item, index) => (
              <li key={index} className="notice-item">
                <a href="/">
                  <div>
                    <span className="notice-type">{item.type}</span>
                    <span className="notice-title">{item.title}</span>
                    <span className="notice-date">{item.date}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default MainCommunitySection;
