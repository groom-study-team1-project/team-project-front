import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { fetchMenuItems } from "../../../services/api";

function Navbar({ isMainPage = true, isLoggedIn = true }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  });

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__inner}>
        <div className={styles.navbar__logo}>로고</div>

        {isMainPage && (
          <div className={styles.navbar__menu}>
            {menuItems.map((menu) => (
              <div key={menu.id} className={styles.navbar__menuItem}>
                {menu.item}
              </div>
            ))}
          </div>
        )}

        {isLoggedIn ? (
          <div className={styles.navbar__button}>글쓰기 다크모드 프로필</div>
        ) : (
          <div className={styles.navbar__button}>다크모드 로그인 회원가입</div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
