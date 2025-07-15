import React, { useEffect, useState } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import gsap from "gsap";
import "../../../css/ilsan/ilsan_friends.css";
import FriendsSwiper from "./sub_components/friends_swiper";

gsap.registerPlugin(ScrollToPlugin);

const AquaplanetIlsanFriends = () => {
  const [isFilterChecked, setIsFilterChecked] = useState(false);

  useEffect(() => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: 850 },
      ease: "power2.out",
      delay: 1,
    });
  }, []);

  const handlerCheckboxFilter = () => {
    setIsFilterChecked(prev => !prev);
  }

  return (
    <>
      <div className="aquaplanet-ilsan-content-wrapper">
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
        <div className="ilsan-friends-container">
          <div className="center-content">
            <div className="location-box">
              <a href="/">HOME</a>
              <a href="/">아쿠아플라넷</a>
              <a href="/aquaplanet/ilsan/friends">아쿠아플라넷 친구들</a>
            </div>
            <div className="content-title">
              <h2>아쿠아플라넷 친구들</h2>
            </div>
            <div className="filter-search-box">
              <div className="first-filter">
                <button>전체<em></em></button>     
                <ul>
                  <li>전체</li>
                  <li>2F</li>
                  <li>3F</li>
                  <li>5F</li>
                </ul>
              </div>
              <div className="second-filter">
                <button>전체<em></em></button>
                <ul>
                  <li>전체</li>
                  <li>민물어류</li>
                  <li>양서파충류</li>
                  <li>자포동물</li>
                  <li>조류</li>
                  <li>포유류</li>
                  <li>해수경골어류</li>
                  <li>해수연골어류</li>
                </ul>
              </div>
              <div className="search-input-box">
                <input placeholder="찾고 싶은 전시생물을 검색해보세요" />
                <button>
                  <span className="blind">검색</span>
                </button>
              </div>
            </div>
            <div className="result-box">
              <div className="result-head">
                <p className="answer">
                  총 <span className="highlight">30</span>마리의 친구들이
                  검색되었습니다. 카드를 클릭하면 세부 정보를 알 수 있어요.
                </p>
                <div className="filter-popular">
                  <input checked={isFilterChecked} type="checkbox" id="popularCheck" onChange={handlerCheckboxFilter}/>
                  <label htmlFor="popularCheck" className={isFilterChecked ? "checked" : ""}>인기생물순정렬</label>
                </div>
              </div>
              <FriendsSwiper/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AquaplanetIlsanFriends;
