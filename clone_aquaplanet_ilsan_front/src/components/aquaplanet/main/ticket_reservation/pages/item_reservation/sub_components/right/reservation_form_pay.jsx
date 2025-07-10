import React from "react";
import useCouponSelection from "../../../../hooks/useCouponSelection";
import couponList from "../../../../../common_data/coupon_list.json";
import usePaymentProcess from "../../../../hooks/usePaymentProcess";
import CouponModal from "./sub_components/pay_form_coupon_modal";

const PayForm = ({
  baseData,
  loginMember,
  onSelectCoupon,
  totalDiscountPrice,
  totalDiscountableOptionPrice,
  discountableItems,
  updatedFinalizedOptions,
  finalTotalPrice
}) => {

  const formattedPhone = loginMember?.memberPhone
    ? `${loginMember.memberPhone.substring(0, 3)}-${loginMember.memberPhone.substring(3, 7)}-${loginMember.memberPhone.substring(7)}`
    : "";

  const {
    couponModal,
    openCouponList,
    selectedCouponName,
    activeBestDiscount,
    handleButtons,
    handleCouponChange,
    autoApplyBestCoupon
  } = useCouponSelection(couponList, totalDiscountableOptionPrice, onSelectCoupon);

  const {
    finishPay
  } = usePaymentProcess(baseData, loginMember, finalTotalPrice, updatedFinalizedOptions)

  return (
    <div className="item-order-container">
      <div className="item-final-order-form">
        <div className="pay-area-user-info">
          <div className="area-title">
            <span>주문자 정보</span>
          </div>
          <div className="area-content">
            <dl>
              <dt>성명</dt>
              <dd>{loginMember.memberName}</dd>
            </dl>
            <dl>
              <dt>휴대폰번호</dt>
              <dd>{formattedPhone}</dd>
            </dl>
          </div>
        </div>
        <div className="pay-area-coupon">
          <div className="area-title">
            <span>쿠폰할인</span>
            <span
              onClick={() => {
                autoApplyBestCoupon();
                handleButtons("bestDiscount");
              }}
              className={`btn-best-discount ${activeBestDiscount ? "on" : ""}`}
            >
              최대할인적용
            </span>
          </div>
          <div className="area-content">
            <button type="button" onClick={() => handleButtons("modal")}>
              쿠폰 수동 선택
            </button>
            <span className="discounted-price">
              <span>할인금액</span>
              <span>{totalDiscountPrice.toLocaleString()}원</span>
            </span>
          </div>
          {couponModal && (
            <CouponModal
              autoApplyBestCoupon={autoApplyBestCoupon}
              baseData={baseData}
              couponList={couponList}
              discountableItems={discountableItems}
              handleButtons={handleButtons}
              handleCouponChange={handleCouponChange}
              openCouponList={openCouponList}
              selectedCouponName={selectedCouponName}
              totalDiscountPrice={totalDiscountPrice}
              totalDiscountableOptionPrice={totalDiscountableOptionPrice}
            />
          )}
        </div>
        <div className="pay-area-payment">
          <div className="area-title">
            <span>결제 수단 선택</span>
          </div>
          <div className="area-content">
            <button onClick={() => finishPay("신용카드")}>
              <span>신용카드</span>
            </button>
            <button onClick={() => finishPay("계좌이체")}>
              <span>계좌이체</span>
            </button>
            <button onClick={() => finishPay("휴대폰결제")}>
              <span>휴대폰결제</span>
            </button>
            <button onClick={() => finishPay("네이버페이")}>
              <span>네이버페이</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PayForm;