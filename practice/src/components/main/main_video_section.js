import React from "react";
import "../../css/main.css";

const MainVideoSection = () => {
  return (
    <div className="video-section-container">
      <video
        src="/img/ilsan_main_video.mp4"
        autoPlay
        muted
        loop
        type="video/mp4"
      />
      <div className="main-video-overlay-text">
      <p>국내 유일 바다코끼리 보유</p>
      <p>수도권 최대 규모 아쿠아리움</p>
      <p>아쿠아플라넷 일산</p>
      <span className="border-highlight"></span>
      </div>
    </div>
  );
};
export default MainVideoSection;
