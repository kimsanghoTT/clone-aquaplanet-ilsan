import React, { useContext } from "react";
import "../../../../../../css/aquaplanet/aquaplanet_item_detail.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoginContext from "../../../../../LoginContext";
import itemData from "../../../common_data/main_mall_item.json";
import useOptionSelection from "../../hooks/useOptionSelection";
import { branchColor } from "../../../common_data/branch_color";
import ItemDetailSummery from "./sub_components/item_detail_summery.jsx";
import ItemOptionSelector from "./sub_components/item_detail_option_selector.jsx";
import SelectedOptionList from "./sub_components/item_detail_selected_option_list.jsx";
import ItemDetailBillBox from "./sub_components/item_detail_bill_box.jsx";
import ItemDetailInfoSection from "./sub_components/item_detail_info_section.jsx";

const AquaplanetItemDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const item = state?.item;
  const spareItem = itemData.find((item) => item.id === id);
  const finalItem = item || spareItem;
  const {loginMember} = useContext(LoginContext);

  const navigate = useNavigate();

  const {
    selectedItemOption,
    openOptionList,
    setOpenOptionList, 
    quantityExceedMsg,
    totalPrice,
    handleOpenOptionList,
    handleOption,
    handleQuantity
  } = useOptionSelection({finalItem});

  const goNextForm = (e) => {
    e.preventDefault();
    
    if(!loginMember) {
      alert("로그인 후 결제 가능합니다.");
      navigate("/aquaplanet/member/login");
      return;
    }

    if(selectedItemOption.length === 0){
      alert("예매할 티켓을 선택해 주세요!");
      return;
    }

    navigate(
      `/aquaplanet/mall/item_detail/${finalItem.id}/order/${loginMember?.memberNo}`, 
      {state:{baseData: finalItem, selectedOption:selectedItemOption}}
    ); 
  }

  return (
    <>
      {finalItem ? (
        <section className="aquaplanet-item-detail-wrapper">
          <div className="item-detail-default-grid-left">
            <div className="item-detail-container">
              <div className="item-first-order-form">
                <ItemDetailSummery item={finalItem} branchColor={branchColor}/>
                <div className="item-detail-option-select">
                  <ItemOptionSelector
                    options={finalItem.details}
                    selectedCount={selectedItemOption.length}
                    setOpenOptionList={setOpenOptionList}
                    openOptionList={openOptionList}
                    handleOpenOptionList={handleOpenOptionList}
                    handleOption={handleOption}
                  />
                  <SelectedOptionList
                    selectedOptions={selectedItemOption}
                    handleQuantity={handleQuantity}
                    maxQuantity={finalItem.maxQuantity}
                    quantityExceedMsg={quantityExceedMsg}
                  />
                </div>
                <ItemDetailBillBox
                  itemId={finalItem.id}
                  memberNo={loginMember?.memberNo}
                  goNextForm={goNextForm}
                  handleQuantity={handleQuantity}
                  totalPrice={totalPrice}
                />
              </div>
            </div>
            <div className="item-detail-footer">
              <span>공지사항</span>
              <span>공통</span>
              <span>추천 코드 구매 방법</span>
              <span>더보기</span>
            </div>
          </div>
          <div className="item-detail-default-grid-right">
          <ItemDetailInfoSection item={finalItem}/>
          </div>
        </section>
      ) : 
      (
        <div className="none-item-found">
          <p>일치하는 상품이 존재하지 않습니다.</p>
        </div>
      )}
    </>
  );
};

export default AquaplanetItemDetail;
