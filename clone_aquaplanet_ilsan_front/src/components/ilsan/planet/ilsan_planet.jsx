import gsap from "gsap";
import React, { useEffect } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../../../css/ilsan/ilsan_planet.css";
import PlanetContent01 from "./sub_components/planet_content01";
gsap.registerPlugin(ScrollToPlugin);

const AquaplanetIlsanPlanet = () => {
  useEffect(() => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: 850 },
      ease: "power2.out",
      delay: 1,
    });
  }, []);

  return (
    <section className="aquaplanet-ilsan-content-wrapper">
      <div className="content-visual-top">
        <div className="text-box">
          <p className="line">AQUA PLANET</p>
          <p>
            <strong>해양문화의 가치</strong>와 <strong>생태계 보존을</strong>
            <br />
            대중에게 널리 알리는 <br />
            아쿠아플라넷 일산입니다
          </p>
          <p>아쿠아플라넷 일산의 다양한 정보를 확인해보세요.</p>
        </div>
      </div>
      <div className="ilsan-content-container">
        <div className="center-content">
          <div className="location-box">
            <a href="/">HOME</a>
            <a href="/aquaplanet/ilsan/aquaplanet/planet">아쿠아플라넷</a>
            <a href="/aquaplanet/ilsan/aquaplanet/planet">아쿠아플라넷 일산</a>
          </div>
          <div className="content-title">
            <h2>아쿠아플라넷 일산</h2>
          </div>
            <PlanetContent01/>
        </div>
      </div>
    </section>
  );
};
export default AquaplanetIlsanPlanet;
