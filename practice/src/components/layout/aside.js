import React from "react";
import "../../css/aside.css";

const AsideBar = () => {
  return (
    <aside>
      <div className="event-btn">
        <button>
          <span className="ico"></span>
          <span>이벤트</span>
        </button>
      </div>
      <div className="event-list">
        <div>
          <span>이벤트</span>
        </div>
      </div>
      <ul className="social-icons">
        <li className="ico"></li>
        <li className="ico"></li>
        <li className="ico"></li>
        <li className="ico"></li>
      </ul>
    </aside>
  );
};
export default AsideBar;
