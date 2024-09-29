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
  BorderButton,
} from "./Navbar.style";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import ModalLayout from "../../components/Modal/Modal";
import LoginModal from "../../components/Modal/LoginModal/LoginModal";
import SignUpModal from "../../components/Modal/SignUpModal/SignUpModal";
import ChangeUserPw from "../../components/Modal/ChangeUserPwModal/ChangeUserPw";
import { logout } from "../../services/api/authApi";
import { fetchCategoryItems } from "../../services/api/postApi";
import { userLogout } from "../../store/user/userSlice";
import logoImg from "../../assets/images/DEEPDIVERS.png";
import { selectMenuItem } from "../../store/category/menuSlice";
import darkmodeIcon from "../../assets/images/darkmode.png";
import profileIcon from "../../assets/images/profileIcon.png";
import useJwt from "../../hooks/useJwt";

Modal.setAppElement("#root");

function Navbar({ isMainPage = false }) {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const payload = useJwt(
    useSelector((state) => state.user.userInfo.accessToken)
  );
  const memberId = payload.memberId;
  const userInfo = {
    imageUrl: payload.memberImageUrl,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  const handleMenuClick = (id) => {
    dispatch(selectMenuItem(id));
    handleBoardNavigation(id);
  };

  const handleBoardNavigation = (id, e) => {
    console.log(id);
    if (id === 1) {
      navigate("/board/free");
    } else if (id === 2) {
      navigate("/board/questions");
    } else if (id === 3) {
      navigate("/board/projects");
    } else if (id === 4) {
      navigate("/board/notices");
    } else if (id == 5) {
      navigate("/");
    }
  };

  const handleNavigation = (to, e) => {
    if (to === "my-profile") {
      navigate(`/my-page/${memberId}`);
    } else if (to === "write") {
      navigate("/board/write");
    }
  };

  async function handleLogout(e) {
    try {
      await logout();
      dispatch(userLogout());
      navigate("/");
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
        {isMainPage ? (
          <Logo>
            <img src={logoImg} alt="로고 이미지" style={{ width: "128px" }} />
          </Logo>
        ) : (
          <NonLogo />
        )}

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
            <Button>
              <img src={darkmodeIcon} alt="다크모드" />
            </Button>
            <BorderButton onClick={() => handleNavigation("write")}>
              새 글 작성
            </BorderButton>
            <Button onClick={handleLogout}>로그아웃</Button>
            <Button onClick={() => handleNavigation("my-profile")}>
              <img
                src={userInfo?.imageUrl ? userInfo.imageUrl : profileIcon}
                alt="프로필"
                style={{
                  borderRadius: "20px",
                  marginTop: "3px",
                  width: "40px",
                  height: "40px",
                }}
              />
            </Button>
          </ButtonBox>
        ) : (
          <ButtonBox>
            <Button>
              <img src={darkmodeIcon} alt="다크모드" />
            </Button>
            <Button onClick={() => openModal("login")}>Login</Button>
            <BorderButton onClick={() => openModal("signup")}>
              Sign up
            </BorderButton>
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
            : "비밀번호 변경 모달"
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
        ) : (
          <ChangeUserPw changeModal={changeModal} />
        )}
      </ModalLayout>
    </NavbarWrapper>
  );
}

export default Navbar;
