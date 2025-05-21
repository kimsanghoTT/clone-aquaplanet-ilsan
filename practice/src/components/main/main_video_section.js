import React, { useEffect } from "react";
import "../../css/main.css";
import gsap from "gsap";

const MainVideoSection = () => {

  useEffect(() => {
    const text = document.querySelectorAll(".main-video-overlay-text p");

    gsap.fromTo(text, {opacity:0, y: 50}, {opacity: 1, y: 0, duration: 0.5, ease: "power1.out", stagger: 0.2})
    gsap.fromTo(".border-highlight", {width: "0px"}, {width : "180px", duration: 0.5, ease: "power3.out", delay:0.6})
  },[])

  return (
    <section className="main-section section01">
      <div className="video-section-container">
        <video src="/img/ilsan_main_video.mp4" autoPlay muted loop type="video/mp4"/>
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
