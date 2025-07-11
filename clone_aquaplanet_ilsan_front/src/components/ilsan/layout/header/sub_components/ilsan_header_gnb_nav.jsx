import React from "react";
import { gnbMenuItems } from "../data/ilsan_header_data";
import GnbMenuItem from "./ilsan_header_gnb_nav_item";

const GnbNav = ({subMenuRefs, isHeaderScrolled}) => {
  return (
    <nav className="gnb">
      <ul className={`main-menu ${isHeaderScrolled ? "fixActive" : ""}`}>
        {gnbMenuItems &&
          gnbMenuItems.map((menu) => (
            <GnbMenuItem
              key={menu.id}
              menu={menu}
              subMenuRefs={(el) => (subMenuRefs.current[menu.id] = el)}
            />
          ))}
      </ul>
    </nav>
  );
};
export default GnbNav;
