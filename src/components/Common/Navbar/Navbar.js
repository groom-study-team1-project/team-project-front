import React from "react";
import styles from "./Navbar.module.css";

const menuItems = [
  { id: 1, item: "Dummy" },
  { id: 2, item: "Dummy" },
  { id: 3, item: "Dummy" },
  { id: 4, item: "Dummy" },
  { id: 5, item: "Dummy" },
];

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__inner}>
        <div className={styles.navbar__logo}>로고</div>
        <div className={styles.navbar__menu}>
          {menuItems.map((menu) => (
            <div key={menu.id} className={styles.navbar__menuItem}>
              {menu.item}
            </div>
          ))}
        </div>
        <div className={styles.navbar__login_signup}>로그인 회원가입</div>
      </div>
    </nav>
  );
}

export default Navbar;
