import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../../css/aquaplanet/item_reservation.css";
import LoginContext from "../../../LoginContext";
import OrderForm from "./reservation_order_form";
import PayForm from "./reservation_pay_form";
import couponList from "../coupon_list.json";

const AquaplanetReservation = () => {
  const { loginMember } = useContext(LoginContext);
  const { state } = useLocation();
  const baseData = state.baseData;
  const selectedOption = state.selectedOption;
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [totalDiscountableOptionPrice, setTotalDiscountableOptionPrice] = useState(0);
  const [finalizedOptions, setFinalizedOptions] = useState(selectedOption); 

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const handleDiscountPrice = (discountAmount) => {
    setTotalDiscountPrice(discountAmount);
  }

  const handleDiscountablePriceChange = (price) => {
    setTotalDiscountableOptionPrice(price);
  };

  const handleFinalizedOptionsChange = (options) => {
    setFinalizedOptions(options);
  };

  const discountableItems = finalizedOptions.filter(item => item.option.discountable);

  if (!loginMember) {
    return;
  }

  return (
    <section className="aquaplanet-item-order-wrapper">
      <div className="item-order-default-grid-left">
        <OrderForm
          baseData={baseData}
          selectedOption={selectedOption}
          selectedCoupon={selectedCoupon}
          onDiscountChange={handleDiscountPrice}
          onDiscountablePriceChange={handleDiscountablePriceChange}
          onFinalizedOptionsChange={handleFinalizedOptionsChange}
        />
      </div>
      <div className="item-order-default-grid-right">
        <PayForm
          baseData={baseData}
          loginMember={loginMember}
          availableCoupons={couponList}
          onSelectCoupon={handleSelectCoupon}
          totalDiscountPrice={totalDiscountPrice}
          totalDiscountableOptionPrice={totalDiscountableOptionPrice}
          discountableItems={discountableItems}
        />
      </div>
    </section>
  );
};
export default AquaplanetReservation;
