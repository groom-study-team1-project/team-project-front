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
  ButtonBox,
} from "./Navbar.style";
import { logout } from "../../services/authApi";
import Modal from "react-modal";
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

  async function handleLogout(e) {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  }
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
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
          <ButtonBox>
            <Button onClick={handleLogout}>다크모드</Button>
            <Button>로그인</Button>
            <Button>회원가입</Button>
          </ButtonBox>
          <Button onClick={openModal}>다크모드 로그인 회원가입</Button>
        )}
      </NavbarInner>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="로그인 모달"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <LoginModal closeModal={closeModal} />
      </Modal>
    </NavbarWrapper>
  );
}

export default Navbar;
