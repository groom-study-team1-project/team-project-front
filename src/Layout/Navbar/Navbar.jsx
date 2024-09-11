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
} from "./Navbar.style";

function Navbar({ isMainPage = true, isLoggedIn = true }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  const handleNavigation = (id) => {
    if (id === 1) {
      window.location.href = "/community/free";
    } else if (id === 2) {
      window.location.href = "/community/questions";
    } else if (id === 3) {
      window.location.href = "/community/projects";
    } else if (id === 4) {
      window.location.href = "/community/notices";
    }
  };

  return (
    <NavbarWrapper>
      <NavbarInner>
        {isMainPage ? <Logo>로고</Logo> : <NonLogo />}

        {isMainPage && (
          <Menu>
            {menuItems.map((item) => (
              <MenuItem key={item.id} onClick={() => handleNavigation(item.id)}>
                {item.item}
              </MenuItem>
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
