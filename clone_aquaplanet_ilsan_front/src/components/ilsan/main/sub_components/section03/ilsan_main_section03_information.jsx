import React, { useRef } from "react";
import useSectionScrollAnimation from "../../hooks/useSectionScrollAnimation";

const MainInfoSection = () => {
  const sectionRef = useRef(null);

  useSectionScrollAnimation(sectionRef, ".section-title-reverse01 p", ".info-item");

  return (
    <section id="section03" className="main-section section03" ref={sectionRef}>
      <div className="section-container-inner">
        <div className="section-title-box-reverse section-title-reverse01">
          <p>Information</p>
          <p>
            아쿠아플라넷 일산을 <strong>제대로 즐기는 방법!</strong>
          </p>
        </div>
        <div className="info-section-content-box section-content-box">
          <div className="info-item operating-info">
            <span className="operating-title">운영시간</span>
            <dl>
              <dt>연중무휴</dt>
              <dd>10 : 00 - 18 : 00</dd>
            </dl>
            <dl>
              <dt>매표마감</dt>
              <dd>17 : 00</dd>
            </dl>
            <span>
              · 관람 총 소요시간은 2시간 내외입니다. 관람 소요시간은 개인적인
              차이가 있을 수 있습니다.
            </span>
            <div className="operating-link">
              <a className="operating-detail-link" href="/">
                자세히 보기
              </a>
            </div>
          </div>
          <div className="info-item pay-info">
            <span className="pay-title">이용요금</span>
            <dl>
              <dt>아쿠아플라넷</dt>
              <dd>39,000원</dd>
            </dl>
            <div className="pay-link">
              <a className="pay-detail-link" href="/">
                자세히 보기
              </a>
              <a className="ticket-link" href="/aquaplanet/mall">
                티켓 구매
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MainInfoSection;
