import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchMenuItems } from "../../services/api";

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  border: 1px solid #111;
`;

const NavbarInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
  height: 80px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 136px;
  height: 38px;
  border: 1px solid #111;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #111;
`;

const MenuItem = styled.div`
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  border: 1px solid #111;
`;

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
        <Logo>로고</Logo>

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
