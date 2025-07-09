import React from "react";

const SelectedOptionList = ({
    selectedOptions,
    handleQuantity,
    quantityExceedMsg,
    maxQuantity
}) => {
  return (
    <div className="selected-option-list-box">
      {selectedOptions.map(item => (
        <div className="item" key={item.option.id}>
          <label htmlFor={`quantity-${item.option.id}`}>{item.option.name}</label>
          <div className="quantity-function">
            <button
              type="button"
              className="item-quantity-button minus"
              onClick={() => handleQuantity("minus", item)}
            >
              <span className="blind">빼기</span>
            </button>
            <input
              id={`quantity-${item.option.id}`}
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
            </button>
            <button
              type="button"
              className="item-quantity-button cancel"
              onClick={() => handleQuantity("cancel", item)}
            >
              <span className="blind">취소</span>
            </button>
          </div>
        </div>
      ))}
      {quantityExceedMsg && (
        <div className="quantity-message">
          <p>
            구매 가능 횟수를 초과합니다. 최대 구매수량은 {maxQuantity}
            개입니다.
          </p>
        </div>
      )}
    </div>
  );
};
export default SelectedOptionList;
