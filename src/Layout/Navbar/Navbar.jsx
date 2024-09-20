import React, { useState, useEffect } from "react";
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
import Modal from "react-modal";
import ModalLayout from "../../components/Modal/Modal";
import LoginModal from "../../components/Modal/LoginModal/LoginModal";
import SignUpModal from "../../components/Modal/SignUpModal/SignUpModal";
import FindUserId from "../../components/Modal/FindUserIdModal/FindUserId";
import FindUserPw from "../../components/Modal/FindUserPwModal/FindUserPw";
import { logout } from "../../services/authApi";
import { fetchCategoryItems } from "../../services/postApi";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/user/userSlice";

Modal.setAppElement("#root");

function Navbar({ isMainPage = false }) {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const email = useSelector((state) =>
    state.user.isLoggedIn ? state.user.userInfo.email.split("@")[0] : null
  );

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    fetchCategoryItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  const handleBoardNavigation = (id, e) => {
    console.log(id);
    if (id === 0) {
    } else if (id === 1) {
      navigate("/board/free");
    } else if (id === 2) {
      navigate("/board/questions");
    } else if (id === 3) {
      navigate("/board/projects");
    } else if (id === 4) {
      navigate("/board/notices");
    }
  };

  const handleNavigation = (to, e) => {
    if (to === "my-profile") {
      navigate(`/my-page/${email}`);
    } else if (to === "write") {
      navigate("board/write");
    }
  };

  async function handleLogout(e) {
    try {
      await logout();
      dispatch(userLogout());
    } catch (err) {
      console.log(err);
    }
  }

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("모달 닫힘");
    setIsModalOpen(false);
  };

  const changeModal = (type) => {
    openModal(type);
  };

  return (
    <NavbarWrapper>
      <NavbarInner>
        {isMainPage ? <Logo>로고</Logo> : <NonLogo />}

        {isMainPage && (
          <Menu>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => handleBoardNavigation(item.id)}
              >
                {item.item}
              </MenuItem>
            ))}
          </Menu>
        )}

        {isLoggedIn ? (
          <ButtonBox>
            <Button onClick={() => handleNavigation("write")}>글쓰기</Button>
            <Button onClick={handleLogout}>다크모드</Button>
            <Button onClick={() => handleNavigation("my-profile")}>
              프로필
            </Button>
          </ButtonBox>
        ) : (
          <ButtonBox>
            <Button>다크모드</Button>
            <Button onClick={() => openModal("login")}>로그인</Button>
            <Button onClick={() => openModal("signup")}>회원가입</Button>{" "}
          </ButtonBox>
        )}
      </NavbarInner>

      <ModalLayout
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={
          modalType === "login"
            ? "로그인 모달"
            : modalType === "signup"
            ? "회원가입 모달"
            : modalType === "findUserId"
            ? "아이디 찾기 모달"
            : "비밀번호 찾기 모달"
        }
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
        closeModal={closeModal}
        contentLable={"로그인 모달"}
      >
        {modalType === "login" ? (
          <LoginModal closeModal={closeModal} changeModal={changeModal} />
        ) : modalType === "signup" ? (
          <SignUpModal changeModal={changeModal} />
        ) : modalType === "findUserId" ? (
          <FindUserId changeModal={changeModal} />
        ) : (
          <FindUserPw changeModal={changeModal} />
        )}
      </ModalLayout>
    </NavbarWrapper>
  );
}

export default Navbar;
