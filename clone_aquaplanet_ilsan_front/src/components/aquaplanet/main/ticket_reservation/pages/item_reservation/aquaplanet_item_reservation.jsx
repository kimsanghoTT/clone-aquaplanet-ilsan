import React, { useCallback, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../../../../css/aquaplanet/aquaplanet_item_reservation.css";
import LoginContext from "../../../../../LoginContext";
import OrderForm from "./sub_components/left/reservation_form_order";
import PayForm from "./sub_components/right/reservation_form_pay";

const AquaplanetReservation = () => {
  const { loginMember } = useContext(LoginContext);
  const { state } = useLocation();
  const baseData = state?.baseData || {};
  const initialSelectedOption = state?.selectedOption || [];
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [calculatedOrderData, setCalculatedOrderData] = useState({
    finalizedOptions: initialSelectedOption,
    totalDiscountableOptionPrice: 0,
    discountableItems : [],
    finalTotalPrice: 0,
    totalSumPrice: 0,
    totalDiscountPrice:0
  })

  const handleSelectCoupon = useCallback((coupon) => {
    setSelectedCoupon(coupon);
  },[]);

  const handleCalculatedOrderDataChange = useCallback((data) => {
    setCalculatedOrderData(data);
  },[]);

  if(!loginMember){
    return;
  }

  return (
    <section className="aquaplanet-item-order-wrapper">
      <div className="item-order-default-grid-left">
        <OrderForm
          baseData={baseData}
          initialSelectedOption={initialSelectedOption}
          selectedCoupon={selectedCoupon}
          onFinalizedOptionsChange={handleCalculatedOrderDataChange}
        />
      </div>
      <div className="item-order-default-grid-right">
        <PayForm
          baseData={baseData}
          loginMember={loginMember}
          onSelectCoupon={handleSelectCoupon}
          totalDiscountPrice={calculatedOrderData.totalDiscountPrice}
          totalDiscountableOptionPrice={calculatedOrderData.totalDiscountableOptionPrice}
          discountableItems={calculatedOrderData.discountableItems}
          updatedFinalizedOptions={calculatedOrderData.finalizedOptions}
          finalTotalPrice={calculatedOrderData.finalTotalPrice}
        />
      </div>
    </section>
  );
};
export default AquaplanetReservation;