import React from "react";

const ItemDetailInfoSection = ({ item }) => {
  const scrollToSection = (sectionName) => {
    const sectionTitle = document.getElementById(sectionName);
    if (sectionTitle) {
      sectionTitle.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!item) {
    return null;
  }

  return (
    <>
      <figure className="item-detail-visual">
        <img src={item.detailImages.banner} alt="itemBanner" />
        <div className="banner-text">
          <p className="banner-branch">아쿠아플라넷 {item.branch}</p>
          <p className="banner-title">{item.ticketTitle}</p>
          <p className="banner-description">{item.description}</p>
        </div>
      </figure>
      <div className="item-detail-info">
        <div className="link-btn-area">
          <button onClick={() => scrollToSection("ProductInfo")}>
            상품 안내
          </button>
          <button onClick={() => scrollToSection("ProductPolicy")}>
            이용 및 환불 안내
          </button>
          <button onClick={() => scrollToSection("BranchLocation")}>
            오시는 길
          </button>
        </div>
        <div className="product-info info-01">
          <p id="ProductInfo">상품 안내</p>
          {item.detailImages.content.map((img, index) => (
            <div key={index}>
              {img.isLink ? (
                <a href={img.linkUrl}>
                  <img src={img.url} alt="productInfo" />
                </a>
              ) : (
                <img src={img.url} alt="productInfo" />
              )}
            </div>
          ))}
        </div>
        <div className="product-info info-02">
          <p id="ProductPolicy">이용 및 환불 안내</p>
          <img src={item.detailImages.refundPolicy} alt="productPolicy" />
        </div>
        <div className="product-info info-03">
          <p id="BranchLocation">오시는 길</p>
          <iframe
            src={`https://maps.google.com/maps?q=${item.map.latitude},${item.map.longitude}&z=13&output=embed`}
            title={`아쿠아플라넷 ${item.branch}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};
export default ItemDetailInfoSection;
