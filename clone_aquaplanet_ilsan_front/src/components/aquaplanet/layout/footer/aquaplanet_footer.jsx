import React from "react";
import "../../../../css/aquaplanet/aquaplanet_footer.css";
import FamilySiteDropdown from "./sub_components/family_site_dropdown";

const Footer = () => {

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
        <FamilySiteDropdown/>
      </div>
    </footer>
  );
};
export default Footer;
