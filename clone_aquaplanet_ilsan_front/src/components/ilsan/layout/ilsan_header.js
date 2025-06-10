import React, { useContext, useEffect, useState } from "react";
import "../../../css/ilsan/ilsan_header.css";
import moment from "moment";
import "moment/locale/ko";
import gsap from "gsap";
import LoginContext from "../../LoginContext";
moment.locale("ko");

const IlsanHeader = () => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const aquaplanet = [
    { text: "아쿠아플라넷", link: "https://www.aquaplanet.co.kr/index.do" },
    {
      text: "아쿠아플라넷 제주",
      link: "https://www.aquaplanet.co.kr/jeju/index.do",
    },
    {
      text: "아쿠아플라넷 여수",
      link: "https://www.aquaplanet.co.kr/yeosu/index.do",
    },
    {
      text: "아쿠아플라넷 일산",
      link: "https://www.aquaplanet.co.kr/ilsan/index.do",
    },
    {
      text: "아쿠아플라넷 광교",
      link: "https://www.aquaplanet.co.kr/gwanggyo/index.do",
    },
  ];

  const today = moment().format("M . DD");
  const weekday = moment().format("dddd");

  useEffect(() => {
    gsap.fromTo(
      ".ilsan-header",
      { opacity: 0, y: -130 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" }
    );
    const scrollEvent = () => {
      //스크롤이 최상단에 왔는지 체크 -> 최상단 = 0
      const scrollOnTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollOnTop === 0) {
        gsap.to(".upper-nav", { opacity: 1, duration: 0.5, height: "50px" });
        gsap.to(".ilsan-header", { y: 0, duration: 0.5 });
      } else if (scrollOnTop !== 0) {
        gsap.to(".upper-nav", { opacity: 0, duration: 0.5, height: 0 });
        gsap.to(".ilsan-header", { y: "-20px", duration: 0.5 });
      }
    };

    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  useEffect(() => {
    if (!hover) {
      setCategoryOpen(false);
      setJoinOpen(false);
    }
  }, [hover]);

  const categoryMenu = () => {
    setCategoryOpen(!categoryOpen);
  };

  const joinMenu = () => {
    setJoinOpen(!joinOpen);
  };

  const headerMouseOn = () => {
    setHover(true);

    gsap.to(".ilsan-header", {
      backgroundColor: "#fff",
      color: "#767676",
      duration: 0.1,
    });
    gsap.to(".nav-toggle-box", {
      backgroundColor: "#fff",
      height: "350px",
      opacity: 1,
      ease: "power3.out",
      borderBottom: "1px solid #e0e0e0",
      duration: 0.5,
    });

    const subMenuLists = document.querySelectorAll(".sub-menu");
    subMenuLists.forEach((menu) => {
      gsap.to(menu, { opacity: 1, duration: 0.5 });
    });
  };

  const headerMouseLeave = () => {
    setHover(false);

    gsap.to(".ilsan-header", { backgroundColor: "transparent", duration: 0.1 });
    gsap.to(".nav-toggle-box", {
      backgroundColor: "transparent",
      height: 0,
      opacity: 0,
      ease: "power1.in",
      duration: 0.5,
    });

    const subMenuLists = document.querySelectorAll(".sub-menu");
    subMenuLists.forEach((menu) => {
      gsap.to(menu, { opacity: 0, duration: 0.5 });
    });
  };

  const logout = () => {
    window.location.reload();
    setLoginMember(null);
    localStorage.removeItem("loginMember");
  }

  return (
    <header
      className="ilsan-header"
      onMouseEnter={headerMouseOn}
      onMouseLeave={headerMouseLeave}
    >
      <div className="upper-nav">
        <div className="upper-nav-left">
          <div className="item-category">
            <button
              className="item-category-family-btn"
              type="button"
              onClick={categoryMenu}
            >
              <span className="ico"></span>
              <span>
                <strong>아쿠아플라넷 일산</strong>
              </span>
            </button>
            <ul
              className={`item-category-family-list ${categoryOpen ? "show" : ""}`}
            >
              {aquaplanet.map((text, index) => (
                <li key={index}>
                  <a href={text.link}>{text.text}</a>
                </li>
              ))}
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
          <div className="ilsan-logo">
            <a href="/">
              {hover ? (
                <img src="/img/ilsan/logo_ilsan.png" alt="logo" />
              ) : (
                <img src="/img/ilsan/logo_ilsan_white.png" alt="white_logo" />
              )}
            </a>
          </div>
          <nav className="gnb">
            <ul className="main-menu">
              <li>
                <button type="button">이용안내</button>
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
                <button type="button">프로그램</button>
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
                <button type="button">혜택안내</button>
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
                <button type="button">제휴/단체 안내</button>
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
                <button type="button">아쿠아플라넷</button>
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
                <button type="button">해양생물연구소</button>
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
                <button type="button">고객의 소리</button>
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
              <button onClick={joinMenu} type="button">
                <span className="ico"></span>
                <span className="log-in-text">{loginMember ? loginMember.memberName + "님" : "Log In"}</span>
                <span
                  className="ico2"
                  style={joinOpen ? { transform: "rotate(180deg)" } : {}}
                ></span>
              </button>
              <div className={`join ${joinOpen ? "show" : ""}`}>
                {loginMember != null ? (
                  <>
                  <a href="/aquaplanet/member/mypage">
                    <span className="text-join">My Page</span>
                  </a>
                  <span className="header-log-out" onClick={logout}>
                    <span className="text-join">Log Out</span>
                  </span>
                  </>

                ) : (
                  <>
                    <a href="/aquaplanet/member/login">
                      <span className="text-join">Log In</span>
                    </a>
                    <a href="/aquaplanet/member/signup">
                      <span className="text-join">회원가입</span>
                    </a>
                  </>
                )}
              </div>
            </div>
            <div className="ticket-box">
              <a href="/">
                <span className="ico"></span>
                <span className="ticket-text">티켓구매</span>
              </a>
            </div>
          </div>
        </div>
        <div className="nav-toggle-box">
          <div className="operating-area">
            <span
              style={{
                fontSize: 30,
                fontFamily: "MyriadPro-Bold",
                color: "#222222",
                fontWeight: 600,
              }}
            >
              {today}
            </span>
            <span
              style={{
                fontSize: 16,
                fontFamily: "NotoSans-Light",
                color: "#222222",
              }}
            >
              &nbsp;
              {weekday}
            </span>
            <span className="ico"></span>
            <span
              style={{
                fontSize: 24,
                fontFamily: "NotoSans-Light",
                color: "#222222",
              }}
            >
              운영시간
            </span>
            <p>
              <span
                style={{
                  fontSize: 18,
                  fontFamily: "MyriadPro-Bold",
                  color: "#222222",
                  fontWeight: 600,
                }}
              >
                10 : 00 - 18 : 00
              </span>
            </p>
            <p
              style={{
                fontSize: 15,
                fontFamily: "NotoSans-Regular",
                color: "#222222",
              }}
            >
              ※ 입장 마감 &nbsp;
              <span
                style={{
                  fontSize: 18,
                  fontFamily: "MyriadPro-Bold",
                  color: "#222222",
                  fontWeight: 600,
                }}
              >
                17 : 00
              </span>
            </p>
          </div>
          <div className="item-banner">
            <div>
              <a href="/">
                <img
                  src="/img/ilsan/202131054071614396438_6.png"
                  alt="banner"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default IlsanHeader;
