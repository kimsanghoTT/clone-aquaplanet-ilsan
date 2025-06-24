import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../../css/aquaplanet/aquaplanet_main.css";

const Main = () => {
  return (
    <div className="aquaplanet-default-wrapper">
      <div className="aquaplanet-grid-default-left">
        <div className="aquaplanet-grid-default-left-slide">
            <img
              src="../../../img/aquaplanet/db7d81e4-4dc6-4f5e-a356-8a071918ddc8.jpg"
              alt="메인비주얼"
            />
        </div>
        <div className="event-area-notice-link">
          <span style={{flex:1}}>공지사항</span>
          <span style={{flex: 3}}>
            <span className="notice-tag">공통</span>
            <a href="aquaplanet/mall">추천코드 구매 방법</a>
          </span >
          <a href="aquaplanet/mall">더보기</a>
        </div>
      </div>
      <div className="aquaplanet-grid-default-right"></div>
    </div>
  );
};
export default Main;
