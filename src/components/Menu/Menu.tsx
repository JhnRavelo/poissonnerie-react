/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { menus } from "../../assets/ts/menu";
import "./menu.scss";
import { useEffect, useRef } from "react";
import useActive from "../../hooks/useActive";

const Menu = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const active = useActive();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <div className="menu-container">
      <h2>MENU</h2>
      <div className="item-container" ref={menuRef}>
        {menus.map((menu, index) => (
          <Link
            to={menu.url}
            onClick={(e) => active(e, menuRef)}
            key={index}
            className={index == 0 ? "active" : ""}
          >
            <div className="item">
              {menu.SVG}
              <span>{menu.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
