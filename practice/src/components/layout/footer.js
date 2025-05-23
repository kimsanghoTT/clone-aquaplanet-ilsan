import React from "react";
import "../../css/footer.css";

const Footer = () => {

    return(
        <footer>
            <div className="footer-inner">
                <div className="footer-menu-list">
                    <div className="footer-menu-item">
                        <p>이용안내</p>
                        <a href="/"><span>이용시간·요금안내</span></a>
                        <a href="/"><span>가이드맵</span></a>
                        <a href="/"><span>온라인 기프트샵</span></a>
                    </div>
                    <div className="footer-menu-item">
                        <p>프로그램</p>
                        <a href="/"><span>프로그램 일정</span></a>
                        <a href="/"><span>전체 프로그램</span></a>
                    </div>
                    <div className="footer-menu-item">
                        <p>혜택안내</p>
                        <a href="/"><span>이벤트</span></a>
                        <a href="/"><span>제휴할인</span></a>
                    </div>
                    <div className="footer-menu-item">
                        <p>단체안내</p>
                        <a href="/"><span>학습·일반단체</span></a>
                        <a href="/"><span>인바운드단체</span></a>
                        <a href="/"><span>기업단체</span></a>
                        <a href="/"><span>제휴·대관 문의</span></a>
                        <a href="/"><span>단체식사</span></a>
                        <a href="/"><span>단체예약</span></a>
                    </div>
                    <div className="footer-menu-item">
                        <p>아쿠아플라넷</p>
                        <a href="/"><span>아쿠아플라넷 일산</span></a>
                        <a href="/"><span>아쿠아플라넷 친구들</span></a>
                        <a href="/"><span>아쿠아지움</span></a>
                        <a href="/"><span>아쿠아리스트</span></a>
                        <a href="/"><span>오시는 길</span></a>
                    </div>
                    <div className="footer-menu-item">
                        <p>해양생물연구소</p>
                        <a href="/"><span>연구센터소개</span></a>
                        <a href="/"><span>구조/치료실적</span></a>
                        <a href="/"><span>보전활동</span></a>
                        <a href="/"><span>연구분야</span></a>
                        <a href="/"><span>보호대상 학습</span></a>
                    </div>
                    <div className="footer-menu-item">
                        <p>고객의 소리</p>
                        <a href="/"><span>공지사항</span></a>
                        <a href="/"><span>자주 묻는 질문</span></a>
                        <a href="/"><span>고객소리함</span></a>
                    </div>
                </div>
                <div className="address-info">
                    <div className="policies">
                        <a href="/"><span>이메일무단수집거부</span></a>
                        <a href="/"><span>개인정보처리방침</span></a>
                        <a href="/"><span>영상정보처리기기운영·처리방침</span></a>
                        <a href="/"><span>이용약관</span></a>
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
                        <dt><a href="/"> 고객소리함 </a></dt>
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
                    <button type="button">
                        <span>패밀리 사이트</span>
                        <span className="ico"></span>
                    </button>
                    <ul className="family-list">
                        <li className="family-item"><a href="/"><span>아쿠아플라넷</span></a></li>
                        <li className="family-item"><a href="/"><span>아쿠아플라넷 티켓몰</span></a></li>
                        <li className="family-item"><a href="/"><span>해양생물연구센터</span></a></li>
                        <li className="family-item"><a href="/"><span>한화그룹</span></a></li>
                        <li className="family-item"><a href="/"><span>한화호텔&리조트㈜</span></a></li>
                        <li className="family-item"><a href="/"><span>한화리조트</span></a></li>
                        <li className="family-item"><a href="/"><span>플라자CC</span></a></li>
                        <li className="family-item"><a href="/"><span>63레스토랑</span></a></li>
                        <li className="family-item"><a href="/"><span>플라자호텔</span></a></li>
                    </ul>
                    <div className="family-navigate-btn">
                        <a href="/"><span>이동</span></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;