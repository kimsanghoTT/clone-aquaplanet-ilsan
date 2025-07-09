import React from "react";
import { Link } from "react-router-dom";

const ItemDetailBillBox = ({itemId, memberNo, goNextForm, handleQuantity, totalPrice}) => {
  return (
    <div className="item-total-bill">
      <div className="item-btn-box">
        <Link
          to={`/aquaplanet/mall/item_detail/${itemId}/order/${memberNo}`}
          onClick={goNextForm}
        >
          예매하기
        </Link>
        <button type="button" onClick={() => handleQuantity("init", null)}>
          초기화
        </button>
      </div>
      <div className="calc-bill-box">
        <p>총 상품금액</p>
        <p>
          <em>{totalPrice}</em>원
        </p>
      </div>
    </div>
  );
};
export default ItemDetailBillBox;
