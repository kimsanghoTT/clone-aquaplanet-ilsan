import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOrderCalculations from "../../../../hooks/useOrderCalculations";
import useQuantityControl from "../../../../hooks/useQuantityControl";
import OrderFormItemList from "./sub_components/order_form_item_list";

const OrderForm = ({
  baseData,
  selectedOption,
  selectedCoupon,
  onDiscountChange,
  onDiscountablePriceChange,
  onFinalizedOptionsChange,
  onFinalTotalPriceChange,
}) => {
  const navigate = useNavigate();

  const { quantityExceedMsg, finalizedOptions, handleQuantity } =
    useQuantityControl(selectedOption, baseData?.maxQuantity);

  const {
    totalSumPrice,
    totalDiscountPrice,
    finalTotalPrice,
    totalDiscountableOptionPrice,
    calculatedFinalizedOptions,
  } = useOrderCalculations({ finalizedOptions, selectedCoupon });

  useEffect(() => {
    onDiscountChange(totalDiscountPrice);
    onDiscountablePriceChange(totalDiscountableOptionPrice);
    onFinalTotalPriceChange(finalTotalPrice);
    onFinalizedOptionsChange(calculatedFinalizedOptions);
  }, [
    finalTotalPrice,
    calculatedFinalizedOptions,
    onDiscountChange,
    onDiscountablePriceChange,
    onFinalTotalPriceChange,
    onFinalizedOptionsChange,
    totalDiscountPrice,
    totalDiscountableOptionPrice,
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
            baseData={baseData}
            finalizedOptions={finalizedOptions}
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
