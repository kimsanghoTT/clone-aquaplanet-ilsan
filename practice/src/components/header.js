import React, { useState } from "react";
import "../css/header.css";
import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");

const Header = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [detailMenuOpen, setDetailMenuOpen] = useState(false);

  const today = moment().format("M . DD");
  const weekday = moment().format("dddd");

  const categoryMenu = () => {
    if (categoryOpen) {
      setCategoryOpen(false);
    } else {
      setCategoryOpen(true);
    }
  };
  const joinMenu = () => {
    if (joinOpen) {
      setJoinOpen(false);
    } else {
      setJoinOpen(true);
    }
  };
  return (
    <header>
      <div className="upper-nav">
        <div className="upper-nav-left">
          <div className="item-category">
            <button className="item-category-family-btn" onClick={categoryMenu}>
              <span className="ico"></span>
              <span>
                <strong>아쿠아플라넷 일산</strong>
              </span>
            </button>
            <ul
              className={`item-category-family-list ${
                categoryOpen ? "show" : ""
              }`}
            >
              <li>
                <a href="/">아쿠아플라넷</a>
              </li>
              <li>
                <a href="/">아쿠아플라넷 제주</a>
              </li>
              <li>
                <a href="/">아쿠아플라넷 여수</a>
              </li>
              <li>
                <a href="/">아쿠아플라넷 일산</a>
              </li>
              <li>
                <a href="/">아쿠아플라넷 광교</a>
              </li>
            </ul>
          </div>
          <div className="item-operating">
            <span className="ico"></span>
            <span>
              <strong>AM 10:00-PM 6:00</strong>
            </span>
          </div>
        </div>
        <div className="upper-nav-right">
          <div className="item-info">
            <div className="news-letter">
              <button>
                <span className="ico"></span>
                <span>뉴스레터</span>
              </button>
            </div>
            <div className="tel">
              <span className="ico"></span>
              <span>1833.7001</span>
            </div>
            <div className="language">
              <a href="/" style={{ fontFamily: "MyriadPro-Bold" }}>
                KR
              </a>
            </div>
            <div className="language">
              <a href="/" style={{ fontFamily: "NotoSans-Regular" }}>
                제휴문의
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="main-nav">
        <div className="nav-inner">
          <div className="logo">
            <a href="/">
              <img src="img/logo_ilsan_white.png" />
            </a>
          </div>
          <nav className="gnb">
            <ul className="main-menu">
              <li>
                <button>이용안내</button>
                <ul className="sub-menu">
                  <li>
                    <a href="/">이용시간·요금안내</a>
                  </li>
                  <li>
                    <a href="/">가이드맵</a>
                  </li>
                  <li>
                    <a href="/">온라인 기프트샵</a>
                  </li>
                </ul>
              </li>
              <li>
                <button>프로그램</button>
                <ul className="sub-menu">
                  <li>
                    <a href="/">프로그램 일정</a>
                  </li>
                  <li>
                    <a href="/">프로그램 소개</a>
                  </li>
                </ul>
              </li>
              <li>
                <button>혜택안내</button>
                <ul className="sub-menu">
                  <li>
                    <a href="/">이벤트</a>
                  </li>
                  <li>
                    <a href="/">제휴할인</a>
                  </li>
                </ul>
              </li>
              <li>
                <button>제휴/단체 안내</button>
                <ul className="sub-menu">
                  <li>
                    <a href="/">학습·일반단체</a>
                  </li>
                  <li>
                    <a href="/">인바운드단체</a>
                  </li>
                  <li>
                    <a href="/">기업단체</a>
                  </li>
                  <li>
                    <a href="/">제휴·대관 문의</a>
                  </li>
                  <li>
                    <a href="/">단체식사</a>
                  </li>
                  <li>
                    <a href="/">단체예약</a>
                  </li>
                </ul>
              </li>
              <li>
                <button>아쿠아플라넷</button>
                <ul className="sub-menu">
                  <li>
                    <a href="/">아쿠아플라넷 일산</a>
                  </li>
                  <li>
                    <a href="/">아쿠아플라넷 친구들</a>
                  </li>
                  <li>
                    <a href="/">아쿠아지움</a>
                  </li>
                  <li>
                    <a href="/">아쿠아리스트</a>
                  </li>
                  <li>
                    <a href="/">오시는 길</a>
                  </li>
                </ul>
              </li>
              <li>
                <button>해양생물연구소</button>
                <ul className="sub-menu">
                  <li>
                    <a href="/">연구센터소개</a>
                  </li>
                  <li>
                    <a href="/">구조/치료실적</a>
                  </li>
                  <li>
                    <a href="/">보전활동</a>
                  </li>
                  <li>
                    <a href="/">연구분야</a>
                  </li>
                  <li>
                    <a href="/">보호대상 학습</a>
                  </li>
                </ul>
              </li>
              <li>
                <button>고객의 소리</button>
                <ul className="sub-menu">
                  <li>
                    <a href="/">공지사항</a>
                  </li>
                  <li>
                    <a href="/">전자공고</a>
                  </li>
                  <li>
                    <a href="/">자주 묻는 질문</a>
                  </li>
                  <li>
                    <a href="/">고객소리함</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div className="aside">
            <div className="log-in">
              <button onClick={joinMenu}>
                <span className="ico"></span>
                <span className="ico2"></span>
              </button>
              <div className={`join ${joinOpen ? "show" : ""}`}>
                <a href="/">
                  <span className="text-join">Log In</span>
                </a>
                <a href="/">
                  <span className="text-join">회원가입</span>
                </a>
              </div>
            </div>
            <div className="ticket-box">
              <a href="/">
                <span className="ico"></span>
              </a>
            </div>
          </div>
        </div>
        <div className="nav-toggle-box">
          <div className="operating-area">
            <span style={{fontSize:30, fontFamily:"MyriadPro-Bold", color: "#222222", fontWeight:600}}>{today}</span>
            <span style={{fontSize:16, fontFamily:"NotoSans-Light", color: "#222222"}}> {weekday}</span>
            <span className="ico"></span>
            <span style={{fontSize:24, fontFamily:"NotoSans-Light", color: "#222222"}}>운영시간</span>
            <p>
              <span style={{fontSize:18, fontFamily:"MyriadPro-Bold", color: "#222222", fontWeight:600}}>10 : 00 - 18 : 00</span>
            </p>
            <p style={{fontSize:15, fontFamily:"NotoSans-Regular", color: "#222222"}}>
              ※ 입장 마감 &nbsp;
              <span style={{fontSize:18, fontFamily:"MyriadPro-Bold", color: "#222222", fontWeight:600}}>17 : 00</span>
            </p>
          </div>
          <div className="v-line"></div>
          <div className="item-banner">
            <div>
              <a href="/">
                <img src="/img/202131054071614396438_6.png" />
              </a>
            </div>
          </div>
          <span className="ico-line"></span>
        </div>
      </div>
    </header>
  );
};
export default Header;
