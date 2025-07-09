import React from "react";
import { branchColor } from "../../../../../../common_data/branch_color";

const OrderFormItemList = ({finalizedOptions, baseData, quantityExceedMsg, handleQuantity}) => {
  return (
    <div className="item-list">
      {finalizedOptions.map((itemOption) => {
        const parseIntPrice = parseInt(
          itemOption.option.price.replace(/,/g, "")
        );
        const totalOptionPrice = (
          parseIntPrice * itemOption.quantity
        ).toLocaleString();

        return (
          <div className="item" key={itemOption.option.name}>
            <span
              className="item-label"
              style={{ background: branchColor[baseData.branch] }}
            >
              {baseData.branch}
            </span>
            <span className="item-name">{itemOption.option.name}</span>
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
            구매 가능 횟수를 초과합니다. 최대 구매수량은 {baseData.maxQuantity}
            개입니다.
          </p>
        </div>
      )}
    </div>
  );
};
export default OrderFormItemList;