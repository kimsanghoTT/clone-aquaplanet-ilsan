import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuantityControl from "../../../../hooks/useQuantityControl";
import useOrderCalculation from "../../../../hooks/useOrderCalculation";
import OrderFormItemList from "./sub_components/order_form_item_list.jsx";

const OrderForm = ({
  baseData,
  initialSelectedOption,
  selectedCoupon,
  onFinalizedOptionsChange,
}) => {
  const navigate = useNavigate();

  const { finalizedOptions, handleQuantity, quantityExceedMsg } =
    useQuantityControl({initialSelectedOption:initialSelectedOption, maxQuantity:baseData.maxQuantity});

  const {
    totalSumPrice,
    totalDiscountPrice,
    totalDiscountableOptionPrice,
    finalTotalPrice,
    discountableItems,
    updatedFinalizedOptions,
  } = useOrderCalculation(finalizedOptions, selectedCoupon);

  useEffect(() => {
    if (updatedFinalizedOptions && updatedFinalizedOptions.length > 0) {
      onFinalizedOptionsChange({
        finalizedOptions: updatedFinalizedOptions,
        totalDiscountableOptionPrice: totalDiscountableOptionPrice,
        discountableItems: discountableItems,
        finalTotalPrice: finalTotalPrice,
        totalSumPrice: totalSumPrice,
        totalDiscountPrice: totalDiscountPrice,
      });
    }
  }, [
    updatedFinalizedOptions,
    totalDiscountableOptionPrice,
    discountableItems,
    finalTotalPrice,
    totalSumPrice,
    totalDiscountPrice,
    onFinalizedOptionsChange,
  ]);

  const orderCancel = () => {
    navigate(-1);
  };

  return (
    <div className="item-order-container">
      <div className="item-final-order-form">
        <div className="order-area-title">
          <span>결제</span>
          {baseData.delay &&
            (baseData.delay === "1hour" ? (
              <span className="warn-msg">
                선택하신 상품은 구매 1시간 후 사용이 가능합니다.
              </span>
            ) : (
              <span className="warn-msg">
                선택하신 상품은 구매 1일 후 사용이 가능합니다.
              </span>
            ))}
        </div>
        <div className="order-area-content">
          <figure>
            <img src={baseData.detailImages.banner} alt="bannerImage" />
          </figure>
          <OrderFormItemList
            finalizedOptions={finalizedOptions}
            baseData={baseData}
            handleQuantity={handleQuantity}
            quantityExceedMsg={quantityExceedMsg}
          />
        </div>
        <div className="order-area-total-price">
          <div className="calc-line">
            <span>상품 합계금액</span>
            <span>{totalSumPrice.toLocaleString()}원</span>
          </div>
          <div className="calc-line">
            <span>총 할인금액</span>
            <span>{totalDiscountPrice.toLocaleString()}원</span>
          </div>
          <div className="final-bill-line">
            <span>최종 결제금액</span>
            <span>
              <em>{finalTotalPrice.toLocaleString()}</em>원
            </span>
          </div>
          <div className="order-cancel">
            <button onClick={orderCancel}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderForm;
