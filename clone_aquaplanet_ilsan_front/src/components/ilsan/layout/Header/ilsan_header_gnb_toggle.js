import React, { useEffect, useRef } from "react";
import moment from "moment";
import "moment/locale/ko";
import gsap from "gsap";

moment.locale("ko");

const GnbToggleArea = ({ isHovered }) => {
  const dropdownRef = useRef(null);

  const today = moment().format("M . DD");
  const weekday = moment().format("dddd");

  useEffect(() => {
    if (dropdownRef.current) {
      if (isHovered) {
        gsap.to(dropdownRef.current, {
          backgroundColor: "#fff",
          height: "350px",
          opacity: 1,
          ease: "power3.out",
          borderBottom: "1px solid #e0e0e0",
          duration: 0.5,
        });
      } else {
        gsap.to(dropdownRef.current, {
          backgroundColor: "transparent",
          height: 0,
          opacity: 0,
          ease: "power1.in",
          duration: 0.5,
        });
      }
    }
  }, [isHovered]);

  return (
    <div className="nav-toggle-box" ref={dropdownRef}>
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
          &nbsp;{weekday}
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
            <img src="/img/ilsan/202131054071614396438_6.png" alt="banner" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GnbToggleArea;