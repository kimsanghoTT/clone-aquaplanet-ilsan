import React, { useState } from "react";
import "../../css/footer.css";

const Footer = () => {
  const [selected, setSelected] = useState(null);
  const [targetLink, setTargetLink] = useState(null);
  const [listOpen, setListOpen] = useState(false);
  const familyLinks = [
    {text: "아쿠아플라넷", link: "https://www.aquaplanet.co.kr/index.do"},
    {text: "아쿠아플라넷 티켓몰", link: "https://mall.aquaplanet.co.kr/index.do"},
    {text: "해양생물연구센터", link: "/"},
    {text: "한화그룹", link: "https://www.hanwha.co.kr/index.do"},
    {text: "한화호텔&리조트㈜", link: "https://www.hwrc.co.kr/hwrc/index.do"},
    {text: "한화리조트", link: "https://www.hanwharesort.co.kr/irsweb/resort3/index_.do"},
    {text: "플라자CC", link: "https://www.plazacc.co.kr/plzcc/irsweb/golf2/main.do"},
    {text: "63레스토랑", link: "https://www.63restaurant.co.kr/main.r63"},
    {text: "플라자호텔", link: "https://www.hoteltheplaza.com/kr/"},
  ];

  const linkListOpen = () => {
    setListOpen(!listOpen);
  }

  const selectedLink = (index) => {
    setSelected(index);
    setTargetLink(familyLinks[index].link);

    const targetText = document.querySelector(".navigate-target");
    targetText.textContent = familyLinks[index].text;
    
  };

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-menu-list">
          <dl className="footer-menu-item">
            <dt>이용안내</dt>
            <dd>
              <a href="/">
                <span>이용시간·요금안내</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>가이드맵</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>온라인 기프트샵</span>
              </a>
            </dd>
          </dl>
          <dl className="footer-menu-item">
            <dt>프로그램</dt>
            <dd>
              <a href="/">
                <span>프로그램 일정</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>전체 프로그램</span>
              </a>
            </dd>
          </dl>
          <dl className="footer-menu-item">
            <dt>혜택안내</dt>
            <dd>
              <a href="/">
                <span>이벤트</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>제휴할인</span>
              </a>
            </dd>
          </dl>
          <dl className="footer-menu-item">
            <dt>단체안내</dt>
            <dd>
              <a href="/">
                <span>학습·일반단체</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>인바운드단체</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>기업단체</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>제휴·대관 문의</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>단체식사</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>단체예약</span>
              </a>
            </dd>
          </dl>
          <dl className="footer-menu-item">
            <dt>아쿠아플라넷</dt>
            <dd>
              <a href="/">
                <span>아쿠아플라넷 일산</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>아쿠아플라넷 친구들</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>아쿠아지움</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>아쿠아리스트</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>오시는 길</span>
              </a>
            </dd>
          </dl>
          <dl className="footer-menu-item">
            <dt>해양생물연구소</dt>
            <dd>
              <a href="/">
                <span>연구센터소개</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>구조/치료실적</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>보전활동</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>연구분야</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>보호대상 학습</span>
              </a>
            </dd>
          </dl>
          <dl className="footer-menu-item">
            <dt>고객의 소리</dt>
            <dd>
              <a href="/">
                <span>공지사항</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>자주 묻는 질문</span>
              </a>
            </dd>
            <dd>
              <a href="/">
                <span>고객소리함</span>
              </a>
            </dd>
          </dl>
        </div>
        <div className="address-info">
          <div className="policies">
            <a href="/">
              <span>이메일무단수집거부</span>
            </a>
            <a href="/">
              <span>개인정보처리방침</span>
            </a>
            <a href="/">
              <span>영상정보처리기기운영·처리방침</span>
            </a>
            <a href="/">
              <span>이용약관</span>
            </a>
          </div>
          <dl className="company-info">
            <dt>대표이사</dt>
            <dd>김시훈</dd>
            <dt>대표전화</dt>
            <dd>1833-7001</dd>
            <dt>사업자등록번호</dt>
            <dd>624-81-02142</dd>
            <dt>통신판매번호</dt>
            <dd>2021-서울영등포-1465</dd>
            <dt>
              <a href="/"> 고객소리함 </a>
            </dt>
          </dl>
          <div className="company-address">
            <span>경기도 고양시 일산서구 한류월드로 282(대화동 2606-1)</span>
            <span>서울특별시 영등포구 63로 36, 리버타워</span>
          </div>
          <div className="copyright">
            <span>Copyright ⓒ Aquaplanet Co.,Ltd. All Rights Reserved.</span>
          </div>
        </div>
        <div className="family-site-btn">
          <button type="button" onClick={linkListOpen}>
            <span className="navigate-target">패밀리 사이트</span>
            <span className="ico" style={listOpen ? {transform: "rotate(180deg)"} : {}}></span>
          </button>
          <ul className={`family-list ${listOpen ? "active" : ""}`}>
            {familyLinks.map((text, index) => (
              <li
                key={index}
                className={`family-item ${selected === index ? "on" : "off"}`}
                onClick={() => selectedLink(index)}
              >
                <span>{text.text}</span>
              </li>
            ))}
          </ul>
          <div className="family-navigate-btn">
            <a href={targetLink} target="blank">
              <span>이동</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
