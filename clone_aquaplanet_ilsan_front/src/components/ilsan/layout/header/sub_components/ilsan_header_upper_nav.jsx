import React, { useEffect, useState } from "react";
import { aquaplanetLinks } from "../data/ilsan_header_data";

const UpperNav = ({isHovered}) => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const aquaplanet = aquaplanetLinks;

  const categoryMenu = () => {
    setCategoryOpen(!categoryOpen);
  };

  useEffect(() => {
    if(!isHovered){
      setCategoryOpen(false);
    }
  }, [isHovered])


  return (
    <>
      <div className="upper-nav-left">
        <div className="item-category">
          <button
            className="item-category-family-btn"
            type="button"
            onClick={categoryMenu}
          >
            <span className="ico"></span>
            <span>
              <strong>아쿠아플라넷 일산</strong>
            </span>
          </button>
          <ul className={`item-category-family-list ${categoryOpen ? "show" : ""}`}>
            {aquaplanet.map((text, index) => (
              <li key={index}>
                <a href={text.link}>{text.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="item-operating">
          <span className="ico"></span>
          <span>
            <strong>AM 10:00-PM 6:00</strong>
          </span>
        </div>
      </div>
      <div className="upper-nav-right">
        <div className="item-info">
          <div className="news-letter">
            <button>
              <span className="ico"></span>
              <span>뉴스레터</span>
            </button>
          </div>
          <div className="tel">
            <span className="ico"></span>
            <span>1833.7001</span>
          </div>
          <div className="language">
            <a href="/" style={{ fontFamily: "MyriadPro-Bold" }}>
              KR
            </a>
          </div>
          <div className="language">
            <a href="/" style={{ fontFamily: "NotoSans-Regular" }}>
              제휴문의
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpperNav;