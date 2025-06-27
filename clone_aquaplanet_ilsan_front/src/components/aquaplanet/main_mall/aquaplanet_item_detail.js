import React, { useContext, useEffect, useRef, useState } from "react";
import "../../../css/aquaplanet/item_detail.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LoginContext from "../../LoginContext";
import itemData from "./main_mall_item.json";

const calcTotalTicketQuantity = (selectedOptions) => {
  return selectedOptions.reduce((total, option) => total + option.quantity, 0); 
}

const AquaplanetItemDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const item = state?.item;
  const spareItem = itemData.find((item) => item.id === id);
  const finalItem = item || spareItem;
  const {loginMember} = useContext(LoginContext);
  const [selectedItemOption, setSelectedItemOption] = useState([]);
  const [openOptionList, setOpenOptionList] = useState(false);
  const [quantityExceedMsg, setQuantityExceedMsg] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const navigate = useNavigate();
  const optionRef = useRef(null);
  const branchColor = {
    일산: "#5400FF",
    제주: "#34A5FC",
    여수: "#76E479",
    광교: "#f8a139"
  }

  useEffect(() => {
      const clickOutside = (e) => {
        if (optionRef.current && !optionRef.current.contains(e.target)) {
          setOpenOptionList(false);
        }
      };
  
      document.addEventListener("mousedown", clickOutside);
      return () => {
        document.removeEventListener("mousedown", clickOutside);
      };
  }, [setOpenOptionList]);

  useEffect(() => {
    let price = 0;
    selectedItemOption.forEach(item => {
      const itemPrice = parseInt(item.option.price.replace(/,/g, ""));
      price += itemPrice * item.quantity;
    })
    
    const formattedPrice = price.toLocaleString();
    setTotalPrice(formattedPrice);
  },[selectedItemOption])

  const handleOpenOptionList = () => {
    setOpenOptionList(!openOptionList);
  };

  const handleOption = (option) => {
    const isAlreadySelected = selectedItemOption.some(
      (detail) => detail.option.name === option.name
    );

    if (isAlreadySelected) {
      setOpenOptionList(false);
      return;
    }

    const totalQuantity = calcTotalTicketQuantity(selectedItemOption);
    const potentialTotalQuantity = totalQuantity + 1

    if(potentialTotalQuantity > finalItem.maxQuantity){
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

        if(totalQuantity >= finalItem.maxQuantity){
          setQuantityExceedMsg(true);
          return prevOption;
        }

        return prevOption.map(option => {
          if(option.option.name === item.option.name){
            const newQuantity = option.quantity < finalItem.maxQuantity ? option.quantity + 1 : 10;
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
    else if(btnType === "init"){
      setSelectedItemOption([]);
      setQuantityExceedMsg(false);
    }
  };

  const scrollToSection = (sectionName) => {
    const sectionTitle = document.getElementById(sectionName);
    sectionTitle.scrollIntoView({behavior:"smooth", block:"start"});
  }

  const goSecondForm = (e) => {
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
      {state:{baseData: finalItem, selectedOption:selectedItemOption, initTotalPrice:totalPrice}}
    ); 
  }

  return (
    <>
      {finalItem ? (
        <section className="aquaplanet-item-detail-wrapper">
          <div className="item-detail-default-grid-left">
            <div className="item-detail-container">
              <div className="item-first-order-form">
                <div className="item-detail-badge" style={{backgroundColor: branchColor[finalItem.branch]}}>
                  <span>{finalItem.branch}</span>
                </div>
                <div className="item-summery-info">
                  <p className="item-detail-title">{finalItem.ticketTitle}</p>
                  <p className="item-detail-description">
                    {finalItem.description}
                  </p>
                  <br/>
                  {finalItem.discount && (
                  <span className="item-detail-discount">
                    {finalItem.discount}
                  </span>
                  )}
                </div>
                <div className="item-detail-option-select">
                  <div className="item-detail-option-selector" ref={optionRef}>
                    <span
                      className={`selected-option-display ${openOptionList ? "on" : ""}`}
                      onClick={handleOpenOptionList}
                    >
                      <span>
                        {selectedItemOption.length > 0
                          ? `${selectedItemOption.length}개 옵션 선택됨`
                          : "권종 선택"}
                      </span>
                    </span>
                    <ul
                      className={`option-list ${openOptionList ? "on" : ""}`}
                    >
                      {finalItem.details.map((data, index) => (
                        <li
                          key={index}
                          onClick={() => handleOption(data)} className="item-option">
                          {data.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="selected-option-list-box">
                    {selectedItemOption.map((item, index) => (
                      <div className="item" key={index}>
                        <label htmlFor={`quantity-${index}`}>{item.option.name}</label>
                        <div className="quantity-function">
                          <button
                            type="button"
                            className="item-quantity-button minus"
                            onClick={() => handleQuantity("minus", item)}
                          >
                            <span className="blind">빼기</span>
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
                      <p>구매 가능 횟수를 초과합니다. 최대 구매수량은 {finalItem.maxQuantity}개입니다.</p>
                    </div>
                    )}
                  </div>
                </div>
                <div className="item-total-bill">
                  <div className="item-btn-box">
                    <Link 
                    to={`/aquaplanet/mall/item_detail/${finalItem.id}/order/${loginMember?.memberNo}`} onClick={goSecondForm}
                    >
                      예매하기
                    </Link>
                    <button type="button" onClick={() => handleQuantity("init", null)}>초기화</button>
                  </div>
                  <div className="calc-bill-box">
                    <p>총 상품금액</p>
                    <p>
                      <em>{totalPrice}</em>원
                    </p>
                  </div>
                </div>
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
            <figure className="item-detail-visual">
              <img src={finalItem.detailImages.banner} alt="itemBanner"/>
              <div className="banner-text">
                <p className="banner-branch">아쿠아플라넷 {finalItem.branch}</p>
                <p className="banner-title">{finalItem.ticketTitle}</p>
                <p className="banner-description">{finalItem.description}</p>
              </div>
            </figure>
            <div className="item-detail-info">
              <div className="link-btn-area">
                <button onClick={() => scrollToSection("ProductInfo")}>상품 안내</button>
                <button onClick={() => scrollToSection("ProductPolicy")}>이용 및 환불 안내</button>
                <button onClick={() => scrollToSection("BranchLocation")}>오시는 길</button>
              </div>
              <div className="product-info info-01">
                <p id="ProductInfo">상품 안내</p>
                {finalItem.detailImages.content.map((img, index) => (
                  <div key={index}>
                  {img.isLink ? (
                    <a href={img.linkUrl}><img src={img.url} alt="productInfo"/></a>
                  ) : (<img src={img.url} alt="productInfo"/>)}
                  </div>
                ))}
              </div>
              <div className="product-info info-02">
                <p id="ProductPolicy">이용 및 환불 안내</p>
                <img src={finalItem.detailImages.refundPolicy} alt="productPolicy"/>
              </div>
              <div className="product-info info-03">
                <p id="BranchLocation">오시는 길</p>
                <iframe 
                src={`https://maps.google.com/maps?q=${finalItem.map.latitude},${finalItem.map.longitude}&z=13&output=embed`}
                title={`아쿠아플라넷 ${finalItem.branch}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
              </div>
            </div>
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
