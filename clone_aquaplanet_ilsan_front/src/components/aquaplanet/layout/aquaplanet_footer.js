import React, { useEffect, useRef, useState } from "react";
import "../../../css/aquaplanet/aquaplanet_footer.css";

const Footer = () => {
  const [selectedFamilyLink, setSelectedFamilyLink] = useState("패밀리사이트");
  const [familyLinkListOpen, setFamilyLinkListOpen] = useState(false);
  const familyLinks = ["한화그룹", "한화호텔&리조트㈜", "Lmembers", "분양사이트", "플라자CC", "골든베이 GR", "제이드팰리스 GC", "사이판월드리조트", "THE PLAZA", "아쿠아플라넷", "푸디스트", "63스퀘어", "63레스토랑"];
  const familyBtnRef = useRef(null);

  useEffect(() => {
    const clickOutside = (e) => {
        if(familyBtnRef.current && !familyBtnRef.current.contains(e.target)){
            setFamilyLinkListOpen(false);
        }
    }

    window.addEventListener("mousedown", clickOutside);
    return () => {
        window.removeEventListener("mousedown", clickOutside);
    }
  },[])

  const handleFamilyLinkList = () => {
    setFamilyLinkListOpen(!familyLinkListOpen);
  };

  const familyLinkSelection = (link) => {
    setSelectedFamilyLink(link);
    setFamilyLinkListOpen(false);
  };

  return (
    <footer className="aquaplanet-footer">
      <div className="footer-column">
        <ul className="footer-crumbs">
          <li>
            <a href="/aquaplanet/mall">회사소개</a>
          </li>
          <li>
            <a href="/aquaplanet/mall">
              <strong>개인정보처리방침</strong>
            </a>
          </li>
          <li>
            <a href="/aquaplanet/mall">이용약관</a>
          </li>
          <li>
            <a href="/aquaplanet/mall">영상정보처리기기운영·관리방침</a>
          </li>
        </ul>
        <div className="footer-company-info">
          <p>서울특별시 영등포구 63로 36, 리버타워</p>
          <p>대표이사 | 김시훈</p>
          <p>
            <span>사업자등록번호 | 624-81-02142</span>
            <span>통신판매번호 2021-서울영등포-1465</span>
          </p>
          <p className="copyright">
            Copyright ⓒ Aquaplanet Co.,Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
      <div className="footer-column">
        <div className="footer-cs-info">
          <div className="cs-phone-number">
            <span>고객센터</span>
            <span>1833-7001</span>
          </div>
          <ul className="cs-time">
            <li>평일상담시간 : 09:00 ~ 18:00 (점심시간 : 12:00 ~13:00)</li>
            <li>
              ※코로나19 이슈에 따른 축소운영으로 주말 및 공휴일은 당분간
              운영하지 않습니다
            </li>
            <li>※간단한 문의는 "자주묻는 질문" 참고</li>
          </ul>
        </div>
        <div className="aquaplaent-family-site-btn">
          <span
            className={`family-link-display ${familyLinkListOpen ? "on" : ""}`}
            onClick={handleFamilyLinkList}
          >
            {selectedFamilyLink}
          </span>
          <ul
            className={`family-link-selector ${familyLinkListOpen ? "on" : ""}`}
            ref={familyBtnRef}
          >
            <li disabled className="family-link-item">패밀리사이트</li>
            {familyLinks.map((link, index) => (
                <li key={index}
                className={`family-link-item ${selectedFamilyLink === link ? "selected" : ""}`}
                onClick={() => familyLinkSelection(link)}
                >
                    <span>{link}</span>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
