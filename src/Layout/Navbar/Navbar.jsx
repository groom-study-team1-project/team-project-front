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
          <Button onClick={openModal}>다크모드 로그인 회원가입</Button>
        )}
      </NavbarInner>

      {/* react-modal 모달 */}
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
        <LoginModal />
      </Modal>
    </NavbarWrapper>
  );
}

export default Navbar;
