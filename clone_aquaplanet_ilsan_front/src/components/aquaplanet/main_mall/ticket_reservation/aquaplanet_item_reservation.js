import React, { useCallback, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../../css/aquaplanet/aquaplanet_item_reservation.css";
import LoginContext from "../../../LoginContext";
import couponList from "../coupon_list.json";
import OrderForm from "./reservation_form_order";
import PayForm from "./reservation_form_pay";

const AquaplanetReservation = () => {
  const { loginMember } = useContext(LoginContext);
  const { state } = useLocation();
  const baseData = state.baseData;
  const selectedOption = state.selectedOption;
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [totalDiscountableOptionPrice, setTotalDiscountableOptionPrice] = useState(0);
  const [finalizedOptions, setFinalizedOptions] = useState(selectedOption); 
  const [finalTotalPrice, setFinalTotalPrice] = useState(0);

  const handleSelectCoupon = useCallback((coupon) => {
    setSelectedCoupon(coupon);
  },[]);

  const handleDiscountPrice = useCallback((discountAmount) => {
    setTotalDiscountPrice(discountAmount);
  },[]);

  const handleDiscountablePriceChange = useCallback((price) => {
    setTotalDiscountableOptionPrice(price);
  },[]);

  const handleFinalizedOptionsChange = useCallback((options) => {
    setFinalizedOptions(options);
  },[]);

  const handleFinalTotalPrice = useCallback((finalPrice) => {
    setFinalTotalPrice(finalPrice);
  },[]);

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
          onFinalTotalPriceChange={handleFinalTotalPrice}
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
          finalizedOptions={finalizedOptions}
          finalTotalPrice={finalTotalPrice}
        />
      </div>
    </section>
  );
};
export default AquaplanetReservation;
