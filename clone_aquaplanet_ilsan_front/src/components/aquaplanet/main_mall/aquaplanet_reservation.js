import React from "react";
import { useLocation } from "react-router-dom";
import "../../../css/aquaplanet/aquaplanet_reservation.css";

const AquaplanetReservation = () => {
  const { state } = useLocation();

  return (
    <section className="aquaplanet-item-order-wrapper">
      <div className="item-order-default-grid-left">
        <div className="item-order-container">
          <div className="item-final-order-form">
            <div className="bill-area-title">
              <span>결제</span>
              {state.baseData.available &&
                (state.baseData.available === "1hour" ? (
                  <span>선택하신 상품은 구매 1시간 후 사용이 가능합니다.</span>
                ) : (
                  <span>선택하신 상품은 구매 1일 후 사용이 가능합니다.</span>
                ))}
            </div>
            <div className="bill-area-content"></div>
            <div className="bill-area-total-price"></div>
          </div>
        </div>
      </div>
      <div className="item-order-default-grid-right">
        <div className="item-order-container">
          <div className="item-final-order-form"></div>
        </div>
      </div>
    </section>
  );
};
export default AquaplanetReservation;
