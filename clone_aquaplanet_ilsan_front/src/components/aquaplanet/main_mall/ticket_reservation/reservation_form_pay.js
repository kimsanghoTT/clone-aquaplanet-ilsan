import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosIntercepting";
import moment from "moment";

const PayForm = ({
  baseData,
  loginMember,
  availableCoupons,
  onSelectCoupon,
  totalDiscountPrice,
  totalDiscountableOptionPrice,
  discountableItems,
  finalizedOptions,
  finalTotalPrice
}) => {
  const [couponModal, setCouponModal] = useState(false);
  const [openCouponList, setOpenCouponList] = useState(false);
  const [selectedCouponName, setSelectedCouponName] =
    useState("쿠폰을 선택해 주세요.");
  const [activeBestDiscount, setActiveBestDiscount] = useState(false);
  const navigate = useNavigate();
  const branchColor = {
    일산: "#5400FF",
    제주: "#34A5FC",
    여수: "#76E479",
    광교: "#f8a139",
  };
  const formattedPhone = loginMember?.memberPhone
    ? `${loginMember.memberPhone.substring(0, 3)}-${loginMember.memberPhone.substring(3, 7)}-${loginMember.memberPhone.substring(7)}`
    : "";

  const handleButtons = (type) => {
    switch (type) {
      case "modal":
        setCouponModal(!couponModal);
        if (!couponModal) setOpenCouponList(false);
        break;
      case "couponList":
        setOpenCouponList(!openCouponList);
        break;
      case "bestDiscount":
        setActiveBestDiscount(!activeBestDiscount);
        break;
      default:
        break;
    }
  };

  const handleCouponChange = (coupon) => {
    if (coupon === null) {
      setSelectedCouponName("쿠폰을 선택해 주세요.");
      setOpenCouponList(false);
      onSelectCoupon(null);
      return;
    }
    setSelectedCouponName(coupon.name);
    setOpenCouponList(false);
    onSelectCoupon(coupon);
  };

  const autoApplyBestCoupon = () => {
    if(!activeBestDiscount){
      if (!availableCoupons) {
        return;
      }

      let potentialDiscount = 0;
      let bestCoupon = null;

      availableCoupons.forEach((element) => {
        let realDiscountedPrice = 0;
        if (element.discountAmount !== undefined) {
          //만약 고정할인액이 티켓 가격보다 높을 경우 티켓 가격에 맞춰 줌
          realDiscountedPrice = Math.min(
            element.discountAmount,
            totalDiscountableOptionPrice
          );
        } else if (element.discountRate !== undefined) {
          realDiscountedPrice =
            element.discountRate * totalDiscountableOptionPrice;
          realDiscountedPrice = Math.min(
            realDiscountedPrice,
            totalDiscountableOptionPrice
          );
        }
        realDiscountedPrice = Math.round(realDiscountedPrice / 10) * 10;
        realDiscountedPrice = Math.max(realDiscountedPrice, 0);

        if (realDiscountedPrice > potentialDiscount) {
          potentialDiscount = realDiscountedPrice;
          bestCoupon = element;
        }
      });

      if (bestCoupon) {
        handleCouponChange(bestCoupon);
      } else {
        handleCouponChange(null);
      }
    }

  };

  const finishPay = async (payment) => {
    const orderData = {
      memberNo: loginMember.memberNo,
      ticketId: baseData.id,
      ticketTitle: baseData.ticketTitle,
      ticketBranch: baseData.branch,
      finalTotalPrice: finalTotalPrice,
      orderStatus:"사용가능",
      orderDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      paymentMethod: payment
    }
    const orderDetailDataList = finalizedOptions.map(item => ({
      optionId:item.option.id,
      optionName:item.option.name,
      quantity: item.quantity,
      totalPricePerOption: item.totalPricePerOption,
      optionStatus:"사용대기",
      usedDate:null
    }))
    const requestBody = {
      orderData: orderData,
      orderDetailDataList: orderDetailDataList
    }
    try{
      const response = 
      await axiosInstance.post(`/aquaplanet/mall/${baseData.id}/order/${loginMember.memberNo}`, requestBody);
      if(response.data.result === "SUCCESS"){
        const postedOrderData = response.data.orderData;
        const postedOrderDetailDataList = response.data.orderDetailDataList;
        alert("결제가 완료되었습니다.");
        navigate(`/aquaplanet/mall/item_detail/${baseData.id}/order/${loginMember.memberNo}/orderDone`, 
        {
          state:{orderData :postedOrderData, orderDetailDataList:postedOrderDetailDataList, baseData:baseData},
          replace:true
        });
      }
      else{
        alert("결제 오류가 발생했습니다. 반복될 경우 관리자에게 문의해 주세요.")
      }
    }
    catch{
      alert("결제 오류가 발생했습니다. 반복될 경우 관리자에게 문의해 주세요.");
    }

  }

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
                          <ul
                            className={`coupon-list ${openCouponList ? "on" : ""}`}
                          >
                            <li
                              onClick={() => handleCouponChange(null)}
                              className="coupon"
                            >
                              사용 안 함
                            </li>
                            {availableCoupons.map((coupon) => (
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
                                  <em>{totalDiscountPrice.toLocaleString()}</em>
                                  원
                                </td>
                                <td>
                                  <em>
                                    {(
                                      totalDiscountableOptionPrice -
                                      totalDiscountPrice
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
                    <button
                      type="button"
                      onClick={() => handleButtons("modal")}
                    >
                      할인 수동 적용
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
