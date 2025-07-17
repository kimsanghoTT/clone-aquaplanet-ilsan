import gsap from "gsap";
import React, { useEffect } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../../../css/ilsan/ilsan_planet.css";
import PlanetContent01 from "./sub_components/planet_content01";
import PlanetContent02 from "./sub_components/planet_content02";
import PlanetContent03 from "./sub_components/planet_content03";
import PlanetContent04 from "./sub_components/planet_content04";
import PlanetPagination from "./sub_components/planet_pagination";
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
      <div className="ilsan-content-container" style={{padding:0}}>
            <PlanetContent01/>
            <PlanetContent02/>
            <PlanetContent03/>
            <PlanetContent04/>
      </div>
      <PlanetPagination/>
    </section>
  );
};
export default AquaplanetIlsanPlanet;
