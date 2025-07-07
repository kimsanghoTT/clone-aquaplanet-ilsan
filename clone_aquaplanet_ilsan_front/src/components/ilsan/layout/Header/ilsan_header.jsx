import React, { useEffect, useRef } from "react";
import "../../../../css/ilsan/ilsan_header.css";
import gsap from "gsap"; 
import UpperNav from "./ilsan_header_upper_nav.jsx";
import AsideSection from "./ilsan_header_aside.jsx";
import GnbToggleArea from "./ilsan_header_gnb_toggle.jsx";
import useHeaderScrollEvent from "./hooks/useHeaderScrollEvent.js";
import useHeaderHoverEvent from "./hooks/useHeaderHoverEvent.js";
import GnbNav from "./ilsan_header_gnb_nav.jsx";

const IlsanHeader = () => {
  const headerRef = useRef(null);
  const upperNavRef = useRef(null);
  const subMenuRefs = useRef([]); 

  // 커스텀 훅 사용
  useHeaderScrollEvent(headerRef, upperNavRef);
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHeaderHoverEvent(headerRef, subMenuRefs);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -130 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" }
      );
    }
  }, []); 

  return (
    <header
      className="ilsan-header"
      ref={headerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="upper-nav" ref={upperNavRef}>
        <UpperNav isHovered={isHovered}/>
      </div>
      <div className="main-nav">
        <div className="nav-inner">
          <div className="ilsan-logo">
            <a href="/">
              {isHovered ? ( 
                <img src="/img/ilsan/logo_ilsan.png" alt="logo" />
              ) : (
                <img src="/img/ilsan/logo_ilsan_white.png" alt="white_logo" />
              )}
            </a>
          </div>
          <GnbNav subMenuRefs={subMenuRefs}/>
          <AsideSection isHovered={isHovered}/>
        </div>
        <GnbToggleArea isHovered={isHovered} /> 
      </div>
    </header>
  );
};

export default IlsanHeader;