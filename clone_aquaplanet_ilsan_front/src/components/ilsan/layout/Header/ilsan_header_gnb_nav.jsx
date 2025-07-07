import { gnbMenuItems } from "./data/ilsan_header_data";

const GnbNav = ({subMenuRefs}) => {
  return (
    <nav className="gnb">
      <ul className="main-menu">
        {gnbMenuItems &&
          gnbMenuItems.map((menu, mainIndex) => (
            <li key={mainIndex}>
              <button type="button">{menu.main}</button>
              {menu.sub && (
                <ul
                  className="sub-menu"
                  ref={(el) => (subMenuRefs.current[mainIndex] = el)}
                >
                  {menu.sub.map((subItem, subIndex) => (
                    <li key={`${mainIndex}-${subIndex}`}>
                      <a href={subItem.link}>{subItem.text}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
};
export default GnbNav;
