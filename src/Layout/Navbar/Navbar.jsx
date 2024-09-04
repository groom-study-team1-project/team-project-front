import React, { useEffect, useState } from "react";
import { fetchMenuItems } from "../../services/api";
import {
  Logo,
  nonLogo,
  NavbarInner,
  NavbarWrapper,
  Menu,
  MenuItem,
  Button,
} from "./Navbar.style";

function Navbar({ isMainPage = true, isLoggedIn = true }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <NavbarWrapper>
      <NavbarInner>
        {isMainPage ? <Logo>로고</Logo> : <nonLogo />}

        {isMainPage && (
          <Menu>
            {menuItems.map((menu) => (
              <MenuItem key={menu.id}>{menu.item}</MenuItem>
            ))}
          </Menu>
        )}

        {isLoggedIn ? (
          <Button>글쓰기 다크모드 프로필</Button>
        ) : (
          <Button>다크모드 로그인 회원가입</Button>
        )}
      </NavbarInner>
    </NavbarWrapper>
  );
}

export default Navbar;
