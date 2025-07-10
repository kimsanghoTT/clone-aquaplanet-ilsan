import React from "react";
import { branchColor } from "../../../../../../common_data/branch_color";

const CouponModal = ({handleButtons, baseData, discountableItems, openCouponList, selectedCouponName, handleCouponChange, couponList,totalDiscountableOptionPrice,totalDiscountPrice, autoApplyBestCoupon}) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <button
          className="modal-close-btn"
          type="button"
          onClick={() => handleButtons("modal")}
        ></button>
        <div className="coupon-form">
          <div className="form-container">
            <span className="form-title">쿠폰할인</span>
            <div className="coupon-form-content">
              <div className="coupon-form-label">
                <span
                  style={{
                    backgroundColor: branchColor[baseData.branch],
                  }}
                >
                  {baseData.branch}
                </span>
                <span>{baseData.ticketTitle}</span>
              </div>
              {discountableItems.length > 0 && (
                <div className="coupon-select-area">
                  <span className="discountable-item-name">
                    {discountableItems[0].option.name}
                  </span>
                  <span
                    className={`selected-coupon-display ${openCouponList ? "on" : ""}`}
                    onClick={() => handleButtons("couponList")}
                  >
                    <span>{selectedCouponName}</span>
                  </span>
                  <ul className={`coupon-list ${openCouponList ? "on" : ""}`}>
                    <li
                      onClick={() => handleCouponChange(null)}
                      className="coupon"
                    >
                      사용 안 함
                    </li>
                    {couponList.map((coupon) => (
                      <li
                        key={coupon.id}
                        onClick={() => handleCouponChange(coupon)}
                        className="coupon"
                      >
                        {coupon.name}
                      </li>
                    ))}
                  </ul>
                  <table className="calc-bill-table">
                    <caption>상품판매가, 할인금액, 쿠폰적용기</caption>
                    <colgroup>
                      <col style={{ width: "90px" }}></col>
                      <col></col>
                      <col style={{ width: "90px" }}></col>
                    </colgroup>
                    <thead>
                      <tr>
                        <th>상품판매가</th>
                        <th>할인금액</th>
                        <th>쿠폰적용가</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <em>
                            {totalDiscountableOptionPrice.toLocaleString()}
                          </em>
                          원
                        </td>
                        <td>
                          <em>{totalDiscountPrice.toLocaleString()}</em>원
                        </td>
                        <td>
                          <em>
                            {(
                              totalDiscountableOptionPrice - totalDiscountPrice
                            ).toLocaleString()}
                          </em>
                          원
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <div className="coupon-sum-discount">
                <span>쿠폰 할인금액 합계</span>
                <span>
                  <em>{totalDiscountPrice.toLocaleString()}</em>원
                </span>
              </div>
            </div>
          </div>
          <div className="modal-button-list">
            <button
              type="button"
              onClick={() => {
                autoApplyBestCoupon();
                handleButtons("modal");
              }}
            >
              최대 할인 적용
            </button>
            <button type="button" onClick={() => handleButtons("modal")}>
              할인 수동 적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CouponModal;
