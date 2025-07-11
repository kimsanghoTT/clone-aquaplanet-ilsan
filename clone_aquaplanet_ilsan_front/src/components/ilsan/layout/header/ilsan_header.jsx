import React, { useLayoutEffect, useRef } from "react";
import "../../../../css/ilsan/ilsan_header.css";
import gsap from "gsap";
import useHeaderHoverEvent from "./hooks/useHeaderHoverEvent";
import useHeaderScrollEvent from "./hooks/useHeaderScrollEvent";
import AsideSection from "./sub_components/ilsan_header_aside.jsx";
import GnbNav from "./sub_components/ilsan_header_gnb_nav.jsx";
import GnbToggleArea from "./sub_components/ilsan_header_gnb_toggle.jsx";
import UpperNav from "./sub_components/ilsan_header_upper_nav.jsx";
import { useMatch } from "react-router-dom";

const IlsanHeader = () => {
  const headerRef = useRef(null);
  const subMenuRefs = useRef({});
  const isInMainPage = useMatch("/aquaplanet/ilsan");

  // 커스텀 훅 사용
  const { isHeaderScrolled } = useHeaderScrollEvent(headerRef, isInMainPage);
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHeaderHoverEvent(
    headerRef,
    subMenuRefs,
    isHeaderScrolled,
    isInMainPage
  );

  useLayoutEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -130 },
      { opacity: 1, y: 0, duration: 1, ease: "power1.out" }
    );  
  }, []);

  return (
    <header
      className={`ilsan-header ${isHeaderScrolled ? "fixActive" : ""}`}
      ref={headerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="upper-nav">
        <UpperNav isHovered={isHovered} />
      </div>
      <div className="main-nav">
        <div className={`nav-inner ${isHeaderScrolled ? "fixActive" : ""}`}>
          <div className="ilsan-logo">
            <a href="/">
              {isHovered || isHeaderScrolled ? (
                <img src="/img/ilsan/logo_ilsan.png" alt="logo" />
              ) : (
                <img src="/img/ilsan/logo_ilsan_white.png" alt="white_logo" />
              )}
            </a>
          </div>
          <GnbNav
            subMenuRefs={subMenuRefs}
            isHeaderScrolled={isHeaderScrolled}
          />
          <AsideSection
            isHovered={isHovered}
            isHeaderScrolled={isHeaderScrolled}
          />
        </div>
        <GnbToggleArea isHovered={isHovered} />
      </div>
    </header>
  );
};

export default IlsanHeader;
