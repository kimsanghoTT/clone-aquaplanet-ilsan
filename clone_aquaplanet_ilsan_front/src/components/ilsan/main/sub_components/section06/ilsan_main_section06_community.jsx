import React, { useRef } from "react";
import { notice } from "../../data/data";
import useSectionScrollAnimation from "../../hooks/useSectionScrollAnimation";

const MainCommunitySection = () => {
  const sectionRef = useRef(null);

  useSectionScrollAnimation(sectionRef, ".section-title03 p", ".notice-item");

  return (
    <section id="section06" className="main-section section06" ref={sectionRef}>
      <div className="section-container-inner">
        <div className="section-title-box section-title03">
          <p>Community</p>
          <p>
            아쿠아플라넷 일산의 <strong>최신 소식</strong>을 알려드립니다
          </p>
        </div>
        <div className="community-section-content-box section-content-box">
          <ul>
            {notice && notice.map((item, index) => (
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
