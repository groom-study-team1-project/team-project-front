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
import Modal from "react-modal";
import LoginModal from "../../components/Modal/LoginModal/LoginModal";
import SignUpModal from "../../components/Modal/SignUpModal/SignUpModal";
import { logout } from "../../services/authApi";

Modal.setAppElement("#root");

function Navbar({ isMainPage = false, isLoggedIn = true }) {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");

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

  async function handleLogout(e) {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  }

  const openLoginModal = () => {
    setModalType("login");
    setIsModalOpen(true);
  };

  const openSignupModal = () => {
    setModalType("signup");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeModal = () => {
    setModalType("login");
    setIsModalOpen(true);
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
          <ButtonBox>
            <Button onClick={handleLogout}>다크모드</Button>
            <Button onClick={openLoginModal}>로그인</Button>
            <Button onClick={openSignupModal}>회원가입</Button>
          </ButtonBox>
        )}
      </NavbarInner>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={modalType === "login" ? "로그인 모달" : "회원가입 모달"}
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
        {modalType === "login" ? (
          <LoginModal closeModal={closeModal} />
        ) : (
          <SignUpModal changeModal={changeModal} />
        )}
      </Modal>
    </NavbarWrapper>
  );
}

export default Navbar;
