import React, { useEffect } from "react";
import gsap from "gsap";

const MainVideoSection = () => {

  useEffect(() => {
    const text = document.querySelectorAll(".main-video-overlay-text p");

    gsap.fromTo(text, {opacity:0, y: 50}, {opacity: 1, y: 0, duration: 0.5, ease: "power1.out", stagger: 0.2})
    gsap.fromTo(".border-highlight", {width: "0px"}, {width : "180px", duration: 0.5, ease: "power3.out", delay:0.8})
  },[])

  return (
    <section id="section01" className="main-section section01">
      <div className="video-section-container">
        <video autoPlay muted loop playsInline preload="auto" className="main-video">
          <source src="/img/ilsan/ilsan_main_video.mp4" type="video/mp4" />
        </video>
        <div className="main-video-overlay-text">
          <p>국내 유일 바다코끼리 보유</p>
          <p>수도권 최대 규모 아쿠아리움</p>
          <p>아쿠아플라넷 일산</p>
          <span className="border-highlight"></span>
        </div>
      </div>
    </section>
  );
};
export default MainVideoSection;
