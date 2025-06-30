import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderForm = ({baseData, selectedOption, selectedCoupon, onDiscountChange, onDiscountablePriceChange ,onFinalizedOptionsChange}) => {
    const navigate = useNavigate();
    const [finalizedOptions, setFinalizedOptions] = useState(selectedOption);
    const [quantityExceedMsg, setQuantityExceedMsg] = useState(false);
    const [totalSumPrice, setTotalSumPrice] = useState(0);
    const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
    const [finalTotalPrice, setFinalTotalPrice] = useState(0);
    const branchColor = {
        일산: "#5400FF",
        제주: "#34A5FC",
        여수: "#76E479",
        광교: "#f8a139",
    };

    useEffect(() => {
        //기본 합계
        let sumPrice = 0;
        finalizedOptions.forEach((item) => {
            const itemPrice = parseInt(item.option.price.replace(/,/g, ""));
            sumPrice += itemPrice * item.quantity;
        });
        setTotalSumPrice(sumPrice);

        // 할인가능한 상품 총 금액 계산
        let discountableOptionPrice = 0;
        finalizedOptions.forEach(item => {
            if(item.option && item.option.discountable){
                const itemPrice = parseInt(item.option.price.replace(/,/g, ""));
                discountableOptionPrice += itemPrice * item.quantity;
            }
        })
        onDiscountablePriceChange(discountableOptionPrice);

        //할인 적용 계산
        let discountPrice = 0;
        if(selectedCoupon){
            if(selectedCoupon.discountAmount !== undefined){
                discountPrice = selectedCoupon.discountAmount;
            }
            else if(selectedCoupon.discountRate !== undefined){
                discountPrice = selectedCoupon.discountRate * discountableOptionPrice;
            }
        }
        discountPrice = Math.min(discountPrice, discountableOptionPrice);
        discountPrice = Math.round(discountPrice / 10) * 10;
        setTotalDiscountPrice(discountPrice);
        onDiscountChange(discountPrice);

        //최종 금액 계산
        let finalPrice = sumPrice - discountPrice;
        finalPrice = Math.max(finalPrice, 0);
        setFinalTotalPrice(finalPrice);
    }, [finalizedOptions, selectedCoupon, onDiscountChange, onDiscountablePriceChange]);

    const calcTotalTicketQuantity = (selectedOptions) => {
        return selectedOptions.reduce((total, option) => total + option.quantity, 0);
    };

    const handleQuantity = (btnType, itemOption) => {
        if (btnType === "minus") {
            setFinalizedOptions((prevOption) => {
            const subtractOptionQuantity = prevOption.map((detail) => {
                if (itemOption.option.name === detail.option.name) {
                setQuantityExceedMsg(false);
                const newQuantity = detail.quantity > 1 ? detail.quantity - 1 : 1;
                return { ...detail, quantity: newQuantity };
                }
                return detail;
            });

            const totalQuantity = calcTotalTicketQuantity(subtractOptionQuantity);
            if (totalQuantity >= baseData.maxQuantity) {
                setQuantityExceedMsg(true);
            } else {
                setQuantityExceedMsg(false);
            }
            return subtractOptionQuantity;
            });
        } 
        else if (btnType === "plus") {
            setFinalizedOptions((prevOption) => {
            const currentTotalQuantity = calcTotalTicketQuantity(prevOption);

            if (currentTotalQuantity >= baseData.maxQuantity) {
                setQuantityExceedMsg(true);
                return prevOption;
            }

            return prevOption.map((detail) =>
                itemOption.option.name === detail.option.name
                ? { ...detail, quantity: detail.quantity + 1 }
                : detail
            );
            });
        }
    };

    const orderCancel = () => {
        navigate(-1);
    }

    return(
        <div className="item-order-container">
            <div className="item-final-order-form">
                <div className="order-area-title">
                    <span>결제</span>
                    {baseData.available &&
                    (baseData.available === "1hour" ? (
                        <span className="warn-msg">선택하신 상품은 구매 1시간 후 사용이 가능합니다.</span>
                    ) : (
                        <span className="warn-msg">선택하신 상품은 구매 1일 후 사용이 가능합니다.</span>
                    ))}
                </div>
                <div className="order-area-content">
                    <figure>
                        <img src={baseData.detailImages.banner} alt="bannerImage" />
                    </figure>
                    <div className="item-list">
                        {finalizedOptions.map((itemOption) => {
                            const parseIntPrice = parseInt(itemOption.option.price.replace(/,/g, ""));
                            const totalOptionPrice = (parseIntPrice * itemOption.quantity).toLocaleString();

                            return (
                            <div className="item" key={itemOption.option.name}>
                                <span className="item-label" style={{background: branchColor[baseData.branch]}}>{baseData.branch}</span>
                                <span className="item-name">
                                {itemOption.option.name}
                                </span>
                                <div className="item-function">
                                    <button
                                        className="minus"
                                        onClick={() => handleQuantity("minus", itemOption)}
                                    >
                                        <span className="blind">빼기</span>
                                    </button>
                                    <input value={itemOption.quantity} disabled />
                                    <button
                                        className="plus"
                                        onClick={() => handleQuantity("plus", itemOption)}
                                    >
                                        <span className="blind">더하기</span>
                                    </button>
                                </div>
                                <span className="item-price">{totalOptionPrice}원</span>

                            </div>
                            );
                        })}
                        {quantityExceedMsg && (
                        <div className="quantity-message">
                            <p>
                            구매 가능 횟수를 초과합니다. 최대 구매수량은{" "}
                            {baseData.maxQuantity}개입니다.
                            </p>
                        </div>
                    )}
                    </div>
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
                        <span><em>{finalTotalPrice.toLocaleString()}</em>원</span>
                    </div>
                    <div className="order-cancel">
                        <button onClick={orderCancel}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OrderForm;