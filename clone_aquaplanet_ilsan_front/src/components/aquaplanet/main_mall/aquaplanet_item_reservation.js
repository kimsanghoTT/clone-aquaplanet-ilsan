import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../css/aquaplanet/item_reservation.css";
import LoginContext from "../../LoginContext";

const calcTotalTicketQuantity = (selectedOptions) => {
  return selectedOptions.reduce((total, option) => total + option.quantity, 0); 
}

const AquaplanetReservation = () => {
  const {loginMember} = useContext(LoginContext);
  const { state } = useLocation();
  const baseData = state.baseData;
  const selectedOption =  state.selectedOption;
  const [finalizedOptions, setFinalizedOptions] = useState(selectedOption);
  const [quantityExceedMsg, setQuantityExceedMsg] = useState(false);
  const [sumPrice, setSumPrice] = useState("");
  const branchColor = {
    일산: "#5400FF",
    제주: "#34A5FC",
    여수: "#76E479",
    광교: "#f8a139"
  }

  useEffect(() => {
    let price = 0;
    finalizedOptions.forEach(item => {
      const itemPrice = parseInt(item.option.price.replace(/,/g, ""));
      price += itemPrice * item.quantity;
    })
    
    const formattedPrice = price.toLocaleString();
    setSumPrice(formattedPrice);
  },[finalizedOptions])

  const handleQuantity = (btnType, itemOption) => {
    if(btnType === "minus"){
      setFinalizedOptions(prevOption => {
        const substractOptionQuantity = prevOption.map(detail => {
          if(itemOption.option.name === detail.option.name){
            setQuantityExceedMsg(false);
            const newQuantity = detail.quantity > 1 ? detail.quantity - 1 : 1;
            return {...detail, quantity:newQuantity}
          }
          return detail;
        })
        const totalQuantity = calcTotalTicketQuantity(substractOptionQuantity);
        if(totalQuantity >= baseData.maxQuantity){
          setQuantityExceedMsg(true);
        }
        else{
          setQuantityExceedMsg(false);
        }
        return substractOptionQuantity;
      })
    }
    else if(btnType === "plus"){
      setFinalizedOptions(prevOption => {
        const currentTotalQuantity = calcTotalTicketQuantity(prevOption);

        if(currentTotalQuantity >= baseData.maxQuantity){
          setQuantityExceedMsg(true);
          return prevOption;
        }

        return prevOption.map(detail =>
          itemOption.option.name === detail.option.name ?
          {...detail, quantity : detail.quantity + 1} :
          detail
        )
      })
    }
  }

  return (
    <section className="aquaplanet-item-order-wrapper">
      <div className="item-order-default-grid-left">
        <div className="item-order-container">
          <div className="item-final-order-form">
            <div className="bill-area-title">
              <span>결제</span>
              {baseData.available &&
                (baseData.available === "1hour" ? (
                  <span>선택하신 상품은 구매 1시간 후 사용이 가능합니다.</span>
                ) : (
                  <span>선택하신 상품은 구매 1일 후 사용이 가능합니다.</span>
                ))}
            </div>
            <div className="bill-area-content">
              <div>
              <figure>
                <img src={baseData.detailImages.banner} alt="bannerImage"/>
              </figure>
                {finalizedOptions.map(itemOption => {
                  const parseIntPrice = parseInt(itemOption.option.price.replace(/,/g, ""));
                  const totalOptionPrice = (parseIntPrice * itemOption.quantity).toLocaleString();

                  return (
                    <div className="item" key={itemOption.option.name}>
                      <span className="item-label">{baseData.branch}</span>
                      <span className="item-name">{itemOption.option.name}</span>
                      <div className="item-function">
                        <button className="minus" onClick={() => handleQuantity("minus", itemOption)}><span className="blind">빼기</span></button>
                        <input value={itemOption.quantity} disabled/>
                        <button className="plus" onClick={() => handleQuantity("plus", itemOption)}><span className="blind">더하기</span></button>
                        <span>{totalOptionPrice}원</span>
                      </div>
                      <div></div>
                    </div>
                  )
                })}
              </div>
                {quantityExceedMsg && (
                <div className="quantity-message">
                  <p>구매 가능 횟수를 초과합니다. 최대 구매수량은 {baseData.maxQuantity}개입니다.</p>
                </div>
                )}
            </div>
            <div className="bill-area-total-price">
              <div className="calc-line">
                <span>상품 합계금액</span>
                <span>{sumPrice}원</span>
              </div>
              <div className="calc-line">
                <span>총 할인금액</span>
                <span>{sumPrice}원</span>
              </div>
              <div className="final-bill-line">
                <span>최종 결제금액</span>
                <span>{sumPrice}원</span>
              </div>
            </div>
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
