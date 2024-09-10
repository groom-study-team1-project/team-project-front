import React, { useState, useEffect } from "react";
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
import Modal from "react-modal";
import ModalLayout from "../../components/Modal/Modal";
import LoginModal from "../../components/Modal/LoginModal/LoginModal";

Modal.setAppElement("#root");

function Navbar({ isMainPage = true, isLoggedIn = true }) {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMenuItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  const openModal = () => {
    console.log("모달 열림");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("모달 닫힘");
    setIsModalOpen(false);
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
          <Button>글쓰기 다크모드 프로필</Button>
        ) : (
          <Button onClick={openModal}>다크모드 로그인 회원가입</Button>
        )}
      </NavbarInner>

      <ModalLayout
        isOpen={isModalOpen}
        closeModal={closeModal}
        contentLable={"로그인 모달"}
      >
        <LoginModal closeModal={closeModal} />
      </ModalLayout>
    </NavbarWrapper>
  );
}

export default Navbar;
