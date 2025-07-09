import React from "react";
import "../../../../css/aquaplanet/aquaplanet_main.css";
import itemData from "../common_data/main_mall_item.json";
import Footer from "../../layout/aquaplanet_footer";
import MainMallBoardItem from "./sub_components/mall_board_item_list";

const MainMall = ({selectedPreferredBranch}) => {

  const branchFilter = itemData.filter((card) => selectedPreferredBranch[card.branch]);

  return (
    <section className="aquaplanet-default-wrapper">
      <div className="aquaplanet-grid-default-left">
        <div className="aquaplanet-grid-default-left-slide">
            <img
              src="../../../img/aquaplanet/db7d81e4-4dc6-4f5e-a356-8a071918ddc8.jpg"
              alt="main_visual"
            />
        </div>
        <div className="event-area-notice-link">
          <span style={{flex:1}}>공지사항</span>
          <span style={{flex: 3}}>
            <span className="notice-tag">공통</span>
            <a href="/aquaplanet/mall">추천코드 구매 방법</a>
          </span >
          <a href="/aquaplanet/mall">더보기</a>
        </div>
      </div>
      <div className="aquaplanet-grid-default-right">
        <MainMallBoardItem branchFilter={branchFilter}/>
        <Footer/>
      </div>
    </section>
  );
};
export default MainMall;
