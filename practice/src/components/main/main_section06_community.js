import gsap from "gsap";
import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const MainCommunitySection = () => {
  useEffect(() => {
    const sectionTitle = document.querySelectorAll(".section-title03 p");
    const sectionContent = document.querySelectorAll(".notice-item");

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
    <section className="main-section section06">
      <div className="section-container-inner">
        <div className="section-title-box section-title03">
          <p>Community</p>
          <p>
            아쿠아플라넷 일산의 <strong>최신 소식</strong>을 알려드립니다
          </p>
        </div>
        <div className="community-section-content-box">
          <ul>
            <li className="notice-item">
              <a href="/">
                <div>
                  <span className="notice-type">공지</span>
                  <span className="notice-title">'25년 이용요금 변경 안내</span>
                  <span className="notice-date">2025.04.25</span>
                </div>
              </a>
            </li>
            <li className="notice-item">
              <a href="/">
                <div>
                  <span className="notice-type">공지</span>
                  <span className="notice-title">
                    특별 전시 '다흑 곤충 파충류 기획전' 기간 연장 안내
                  </span>
                  <span className="notice-date">2025.03.10</span>
                </div>
              </a>
            </li>
            <li className="notice-item">
              <a href="/">
                <div>
                  <span className="notice-type">공지</span>
                  <span className="notice-title">반입 제한 물품 안내</span>
                  <span className="notice-date">2023.08.03</span>
                </div>
              </a>
            </li>
            <li className="notice-item">
              <a href="/">
                <div>
                  <span className="notice-type">공지</span>
                  <span className="notice-title">
                    관람동선 모바일 전자 리플렛
                  </span>
                  <span className="notice-date">2023.02.09</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default MainCommunitySection;
