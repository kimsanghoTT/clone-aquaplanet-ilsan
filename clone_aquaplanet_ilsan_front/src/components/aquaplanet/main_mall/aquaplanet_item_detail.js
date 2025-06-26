import React, { useState } from "react";
import "../../../css/aquaplanet/item_detail.css";
import useItemDetail from "./useItemDetail";

const calcTotalTicketQuantity = (quantity) => {
  return quantity.reduce((total, option) => total + option.quantity, 0); 
}

const AquaplanetItemDetail = () => {
  const finalItem = useItemDetail();
  const [selectedItemOption, setSelectedItemOption] = useState([]);
  const [openOptionList, setOpenOptionList] = useState(false);
  const [quantityExceedMsg, setQuantityExceedMsg] = useState(false);

  const handleOpenOptionList = () => {
    setOpenOptionList(!openOptionList);
  };

  const handleOption = (option) => {
    const isAlreadySelected = selectedItemOption.some(
      (detail) => detail.name === option.name
    );

    if (isAlreadySelected) return;

    const totalQuantity = calcTotalTicketQuantity(selectedItemOption);
    const potentialTotalQuantity = totalQuantity + 1

    if(potentialTotalQuantity > 10){
      setQuantityExceedMsg(true);
      return;
    }

    setQuantityExceedMsg(false);

    setSelectedItemOption((prevOption) => [
      ...prevOption,
      { option, quantity: 1 },
    ]);
    setOpenOptionList(false);
  };

  const handleQuantity = (btnType, item) => {
    if (btnType === "minus") {
      setSelectedItemOption(prevOption => prevOption.map(option => {
        if(option.option.name === item.option.name){
          setQuantityExceedMsg(false);
          const newQuantity = option.quantity > 1 ? option.quantity - 1 : 1;
          return {...option, quantity: newQuantity};
        }
        return option
      }))
    }
    else if (btnType === "plus") {
      setSelectedItemOption(prevOption =>{
        const totalQuantity = calcTotalTicketQuantity(prevOption);
        if(totalQuantity >= 10){
          setQuantityExceedMsg(true);
          return prevOption;
        }

        return prevOption.map(option => {
          if(option.option.name === item.option.name){
            const newQuantity = option.quantity < 10 ? option.quantity + 1 : 10;
            return {...option, quantity: newQuantity};
          }
          return option
        })
      })
    }
    else if (btnType === "cancel") {
      setSelectedItemOption(prevOption => prevOption.filter(option => option.option.name !== item.option.name));
      setQuantityExceedMsg(false);
    }
  };


  return (
    <>
      {finalItem ? (
        <section className="aquaplanet-item-detail-wrapper">
          <div className="item-detail-default-grid-left">
            <div className="item-detail-container">
              <div className="item-first-order-form">
                <div className="item-detail-badge">
                  <span>{finalItem.branch}</span>
                </div>
                <div className="item-detail-info">
                  <p className="item-detail-title">{finalItem.ticketTitle}</p>
                  <p className="item-detail-description">
                    {finalItem.description}
                  </p>
                  <span className="item-detail-discount">
                    {finalItem.discount}
                  </span>
                </div>
                <form>
                  <div className="item-detail-option-select">
                    <div className="item-detail-option-selector">
                      <span
                        className="selected-option-display"
                        onClick={handleOpenOptionList}
                      >
                        <span>
                          {selectedItemOption.length > 0
                            ? `${selectedItemOption.length}개 옵션 선택됨`
                            : "권종 선택"}
                        </span>
                        <span
                          className={`ico ${openOptionList ? "on" : ""}`}
                        ></span>
                      </span>
                      <ul
                        className={`option-list ${openOptionList ? "on" : ""}`}
                      >
                        {finalItem.details.map((data, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              handleOption(data);
                            }}
                            className={`item-option 
                              ${selectedItemOption.some((detail) => detail.name === data.name) ? "selected" : ""}`}
                          >
                            {data.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="selected-option-list-box">
                      {selectedItemOption.map((item, index) => (
                        <div className="item" key={index}>
                          <label htmlFor={`quantity-${index}`}>{item.option.name}</label>
                          <button
                            type="button"
                            className="item-quantity-button minus"
                            onClick={() => handleQuantity("minus", item)}
                          >
                            <span className="blind">빼기</span>
                            빼기
                          </button>
                          <input
                            id={`quantity-${index}`}
                            type="text"
                            value={item.quantity}
                            disabled
                          />
                          <button
                            type="button"
                            className="item-quantity-button plus"
                            onClick={() => handleQuantity("plus", item)}
                          >
                            <span className="blind">더하기</span>
                            더하기
                          </button>
                          <button
                            type="button"
                            className="item-quantity-button cancel"
                            onClick={() => handleQuantity("cancel", item)}
                          >
                            <span className="blind">취소</span>
                            취소
                          </button>
                        </div>
                      ))}
                      {quantityExceedMsg && (
                      <div className="quantity-message">
                        <p>구매 가능 횟수를 초과합니다. 최대 구매수량은 10개입니다.</p>
                      </div>
                      )}
                    </div>
                  </div>
                  <div className="item-total-bill">
                    <div className="item-btn-box">
                      <button>예매하기</button>
                      <button type="button">초기화</button>
                    </div>
                    <div className="calc-bill">
                      <p>총 상품금액</p>
                      <p>
                        <em>{finalItem.price}</em>원
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="item-detail-footer">
              <span>공지사항</span>
              <span>공통</span>
              <span>추천 코드 구매 방법</span>
              <span>더보기</span>
            </div>
          </div>
          <div className="item-detail-default-grid-right"></div>
        </section>
      ) : (
        <div>
          <p>일치하는 상품이 존재하지 않습니다.</p>
        </div>
      )}
    </>
  );
};

export default AquaplanetItemDetail;
