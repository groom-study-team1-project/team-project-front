import React, { useEffect, useState } from "react";
import { fetchMenuItems } from "../../services/api";
import {
  Logo,
  NonLogo,
  NavbarInner,
  NavbarWrapper,
  Menu,
  MenuItem,
  Button,
  ButtonBox,
} from "./Navbar.style";
import { logout } from "../../services/authApi";

function Navbar({ isMainPage = true, isLoggedIn = true }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  async function handleLogout(e) {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <NavbarWrapper>
      <NavbarInner>
        {isMainPage ? <Logo>로고</Logo> : <NonLogo />}

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
          <ButtonBox>
            <Button onClick={handleLogout}>다크모드</Button>
            <Button>로그인</Button>
            <Button>회원가입</Button>
          </ButtonBox>
        )}
      </NavbarInner>
    </NavbarWrapper>
  );
}

export default Navbar;
