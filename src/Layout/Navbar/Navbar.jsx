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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar({ isMainPage = true }) {
  const [menuItems, setMenuItems] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const email = useSelector((state) => state.user.userInfo.email).split("@")[0];

  let navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  const redirectToMyPage = () => {
    navigate(`/my-page/${email}`);
  };

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
          <ButtonBox>
            <Button>글쓰기</Button>
            <Button>다크모드</Button>
            <Button onClick={redirectToMyPage}>프로필</Button>{" "}
          </ButtonBox>
        ) : (
          <Button>다크모드 로그인 회원가입</Button>
        )}
      </NavbarInner>
    </NavbarWrapper>
  );
}

export default Navbar;
