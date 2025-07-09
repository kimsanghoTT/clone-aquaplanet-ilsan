import React, { useEffect, useRef } from "react";
import "../../../../css/ilsan/ilsan_header.css";
import gsap from "gsap"; 
import useHeaderHoverEvent from "./hooks/useHeaderHoverEvent";
import useHeaderScrollEvent from "./hooks/useHeaderScrollEvent";
import AsideSection from "./sub_components/ilsan_header_aside";
import GnbNav from "./sub_components/ilsan_header_gnb_nav";
import GnbToggleArea from "./sub_components/ilsan_header_gnb_toggle";
import UpperNav from "./sub_components/ilsan_header_upper_nav";

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