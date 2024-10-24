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
  MobailDropDown,
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
import ProfileMenu from "./ProfileMenu";
import { changeTheme } from "../../store/theme/themeSlice";
import lightmodeIcon from "../../assets/images/lightmode.png";
import NavBarSideModal from "../../components/Modal/NavBarSideModal/NavBarSideModal";

Modal.setAppElement("#root");

function Navbar({ isMainPage = false}) {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [navModalOpen, setNavModalOpen] = useState(false);
  const [isMobileState, setIsMobileState] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const payload = useJwt(
    useSelector((state) => state.user.userInfo.accessToken)
  );
  const memberId = payload.memberId;
  const userInfo = {
    imageUrl: payload.memberImageUrl,
  };
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileState(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return() => {
      window.removeEventListener("resize", handleResize);
    }
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
    } else if (id === 5) {
      navigate("/");
    }
  };

  const handleNavClick = (to) => {
    dispatch(logout());
    handleNavigation(to);
  }

  const handleNavigation = (to, e) => {
    if (to === "my-profile") {
      navigate(`/my-page/${memberId}`);
      setMenuOpen(false);
    } else if (to === "write") {
      navigate("/board/write");
    }
  };

  async function handleLogout(e) {
    try {
      await logout();
      dispatch(userLogout());
      setMenuOpen(false);
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

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) console.log("토글메뉴 열림");
    else console.log("토글메뉴 닫힘");
  };

  const handleDarkMode = () => {
    dispatch(changeTheme());
    console.log("배경모드 변경");
  };

  const handleDropdown = () => {
    setDropDown(!dropDown);
    setNavModalOpen(!navModalOpen);
  };

  return (
    <NavbarWrapper>
      <NavbarInner>
        {isMainPage && isMobileState ?(
          <Logo>
            <img
              src={logoImg}
              alt="로고 이미지"
              style={{ width: "128px" }}
              onClick={() => {
                navigate("/");
              }}
            />
          </Logo>
        ) : (
          <NonLogo />
        )}

        {isMainPage && !isMobileState && (
          <Menu>
            {menuItems.map((item) => (
              <MenuItem key={item.id} onClick={() => handleMenuClick(item.id)}>
                {item.item}
              </MenuItem>
            ))}
          </Menu>
        )}

        {isMobileState ? (
          <>
            <MobailDropDown
              onClick={handleDropdown}
              $dropDown={dropDown}
            >
              <span></span>
              <span></span>
              <span></span>
            </MobailDropDown>
            {isMobileState && (
              <NavBarSideModal
                  isOpen={navModalOpen}
                  setIsOpen={setNavModalOpen}
                  menuItems={menuItems}
                  handleDropDown = {handleDropdown}
                  handleMenuClick={handleMenuClick}
                  handleDarkMode={handleDarkMode}
                  isDarkMode={isDarkMode}
                  userInfo={userInfo}
                  navigateNewPost={() => handleNavClick("write")}
                  navigateMyPage={() => handleNavigation("my-profile")}
                  onLogout={handleLogout}
                  onLogin={() => openModal("login")}
                  onSignUp={() => openModal("signup")}
              />
            )}
          </>
        ) : isLoggedIn ? (
          <ButtonBox>
            <Button onClick={handleDarkMode}>
              <img
                src={!isDarkMode ? darkmodeIcon : lightmodeIcon}
                alt="다크모드"
              />
            </Button>
            <BorderButton onClick={() => handleNavigation("write")}>
              새 글 작성
            </BorderButton>
            <div style={{ position: "relative", display: "inline-block" }}>
              <Button onClick={handleToggleMenu}>
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
                <ProfileMenu
                  isOpen={menuOpen}
                  onNavigate={() => handleNavigation("my-profile")}
                  onLogout={handleLogout}
                ></ProfileMenu>
              </Button>
            </div>
          </ButtonBox>
        ) : (
          <ButtonBox>
            <Button onClick={handleDarkMode}>
              <img
                src={!isDarkMode ? darkmodeIcon : lightmodeIcon}
                alt="다크모드"
              />
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
