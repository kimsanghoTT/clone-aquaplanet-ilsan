import React, { useCallback, useEffect, useState } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import gsap from "gsap";
import "../../../css/ilsan/ilsan_friends.css";
import FriendsSwiper from "./sub_components/friends_swiper";
import FriendsFilter from "./sub_components/friends_filter";
import useSort from "./hooks/useSort";
import FilterHead from "./sub_components/friends_filter_head";
import FriendsNoData from "./sub_components/friends_no_data";

gsap.registerPlugin(ScrollToPlugin);

const AquaplanetIlsanFriends = () => {
  const [isSortChecked, setIsSortChecked] = useState(false);
  const [originalFilteredFriends, setOriginalFilteredFriends] = useState([]);
  const {finalFilteredFriends} = useSort({originalFilteredFriends, isSortChecked});

  useEffect(() => {
    gsap.to(window, {duration: 0.5, scrollTo: { y: 850 }, ease: "power2.out", delay: 1,});
  }, []);

  const filterFriendsHandler = useCallback((result) => {
    setOriginalFilteredFriends(result);
    setIsSortChecked(false);
  },[])

  const CheckboxHandler = useCallback(() => {
    setIsSortChecked(prev => !prev);
  },[])

  return (
    <>
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
              <a href="/aquaplanet/ilsan/aquaplanet/friends">아쿠아플라넷 친구들</a>
            </div>
            <div className="content-title">
              <h2>아쿠아플라넷 친구들</h2>
            </div>
            <div className="filter-search-box">
              <FriendsFilter
                onFilter={filterFriendsHandler}
              />
            </div>
            <div className="result-box">
              <FilterHead
                CheckboxHandler={CheckboxHandler}
                finalFilteredFriends={finalFilteredFriends}
                isSortChecked={isSortChecked}
              />
              {finalFilteredFriends.length > 0 ? (
                <FriendsSwiper
                  filteredFriends={finalFilteredFriends}
                />
              ) : (
                <FriendsNoData/>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AquaplanetIlsanFriends;
