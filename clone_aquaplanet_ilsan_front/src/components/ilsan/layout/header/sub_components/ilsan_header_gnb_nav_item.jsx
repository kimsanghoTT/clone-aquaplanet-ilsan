import { useMatch } from "react-router-dom";

const GnbMenuItem = ({ menu, subMenuRefs }) => {
  const activeParentNav = useMatch(menu.pathPattern);

  return (
    <li key={menu.id}>
      <button className={`ilsan-header-gnb ${activeParentNav ? "on" : ""}`} type="button">
        {menu.main}
      </button>
      {menu.sub && (
        <ul
          className="sub-menu"
          ref={subMenuRefs}
        >
          {menu.sub.map((subItem) => (
            <li key={subItem.id}>
              <a href={subItem.link}>{subItem.text}</a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
export default GnbMenuItem;
