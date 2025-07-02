import React from "react";
import "../../../css/aquaplanet/aquaplanet_main.css";
import itemData from "./main_mall_item.json";
import Footer from "../layout/aquaplanet_footer";
import { Link } from "react-router-dom";

const MainMall = ({selectedPreferredBranch}) => {
  const branchColor = {
    일산: "#5400FF",
    제주: "#34A5FC",
    여수: "#76E479",
    광교: "#f8a139"
  }

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
        <div className="aquaplanet-board-item-list">
          {branchFilter.map((cardData, index) => (
            <div className="aquaplanet-board-item" key={index}>
              <Link to={`/aquaplanet/mall/item_detail/${cardData.id}`} state={{item:cardData}}>
                <figure>
                  <span className="branch-tag" style={{backgroundColor: branchColor[cardData.branch]}}>{cardData.branch}</span>
                  <img src={cardData.image} alt={cardData.ticketTitle}/>
                </figure>
                <div className="aquaplanet-board-item-info">
                  <p className="title">{cardData.ticketTitle}</p>
                  <p className="description">{cardData.description}</p>
                  <p className="price"><em>{cardData.price}</em>원</p>
                  {cardData.canceledPrice && (
                  <p className="canceled-price"><em>{cardData.canceledPrice}</em>원</p>
                  )}
                  {cardData.discount && (
                  <span className="discount">{cardData.discount}</span>
                  )}
                </div>     
                {cardData.delay && (
                <div className="available">
                  {cardData.delay === "1hour" ? (
                    <p>1시간 뒤 사용가능</p>
                  ) : (
                    <p>1일 뒤 사용가능</p>
                  )
                  }
                </div>
                )}   
              </Link>
            </div>
          ))}
        </div>
        <Footer/>
      </div>
    </section>
  );
};
export default MainMall;
