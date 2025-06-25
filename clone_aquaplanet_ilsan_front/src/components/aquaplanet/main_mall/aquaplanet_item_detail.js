import React from "react";
import { useLocation, useParams } from "react-router-dom";
import itemData from "./main_mall_item.json";
import "../../../css/aquaplanet/item_detail.css";

const AquaplanetItemDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const item = state?.item;
  const spareItem = itemData.find((item) => item.id === id);
  const finalItem = item || spareItem;

  if (!finalItem) {
    return <p>해당 아이템을 찾을 수 없습니다.</p>;
  }

  return (
    <section className="aquaplanet-item-detail-wrapper">
      <div className="item-detail-default-grid-left">
        <div className="item-detail-container">
          <div className="item-first-order-form">
            <div className="item-detail-badge">
              <span>{finalItem.branch}</span>
            </div>
            <div className="item-detail-info">
              <p className="item-detail-title">{finalItem.ticketTitle}</p>
              <p className="item-detail-description">{finalItem.description}</p>
              <span className="item-detail-discount">{finalItem.discount}</span>
            </div>
            <form>
              <div className="item-option-select">
                <select>
                  {finalItem.details.map((option, index) => (
                    <option key={index}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div className="item-total-bill">
                <div className="item-btn-box">
                  <button>예매하기</button>
                  <button type="button">초기화</button>
                </div>
                <div className="calc-bill">
                  <p>총 상품금액</p>
                  <p>
                    <em>{finalItem.price}</em>원
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="item-detail-footer">
          <span>공지사항</span>
          <span>공통</span>
          <span>추천 코드 구매 방법</span>
          <span>더보기</span>
        </div>
      </div>
      <div className="item-detail-default-grid-right"></div>
    </section>
  );
};

export default AquaplanetItemDetail;
