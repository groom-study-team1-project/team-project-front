import React from "react";
import { useState, useEffect } from "react";
import {
  NavBarSideContainer,
  SectionTitle,
  NavMenu,
  NavModalButtonBox,
  UserImg,
} from "./NavBarSideModal.style";
import { Button, BorderButton } from "../../../Layout/Navbar/Navbar.style";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import darkmodeIcon from "../../../assets/images/darkmode.png";
import lightmodeIcon from "../../../assets/images/lightmode.png";
import profileIcon from "../../../assets/images/profileIcon.png";
import { SidebarLi, SidebarLink } from "../../../Layout/Sidebar/Sidebar.style";
import { useSelector } from "react-redux";
import { fetchCategoryItems } from "../../../services/api/postApi";
import useUserInfo from "../../../hooks/useUserInfo";

const NavBarSideModal = ({
  isOpen,
  setIsOpen,
  handleMenuClick,
  handleDarkMode,
  handleDropDown,
  handleMyProfile,
  navigateNewPost,
  navigateMyPage,
  onLogout,
  onLogin,
  onSignUp,
}) => {
  const [categories, setCategories] = useState([]);
  const { userInfo, userError } = useUserInfo();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const selectedItem = useSelector((state) => state.menu?.selectedItem || null);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // 카테고리 데이터 불러오기
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoryItems();
        setCategories(data);
      } catch (error) {
        console.error("카테고리 로드 실패: ", error);
      }
    };

    loadCategories();
  }, []);

  if (!isOpen) return null;

  return (
    <NavBarSideContainer $isOpen={isOpen}>
      {isOpen && (
        <NavModalButtonBox>
          <Button onClick={handleDarkMode}>
            <img
              src={!isDarkMode ? darkmodeIcon : lightmodeIcon}
              alt="다크모드"
            />
          </Button>
          {isLoggedIn ? (
            <>
              <BorderButton onClick={navigateNewPost}>새 글 작성</BorderButton>
              <Button onClick= {() => {
                handleMyProfile();
                handleDropDown();
              }}>
                <UserImg
                    src={ userInfo?.imageUrl || profileIcon }
                    alt="프로필"
                />
              </Button>
            </>
          ) : (
            <>
              <BorderButton
                onClick={() => {
                  onLogin();
                  setIsOpen(false);
                  handleDropDown();
                }}
              >
                Login
              </BorderButton>
              <BorderButton
                onClick={() => {
                  onSignUp();
                  setIsOpen(false);
                  handleDropDown();
                }}
              >
                Sign up
              </BorderButton>
            </>
          )}
        </NavModalButtonBox>
      )}
      <SectionTitle $isDarkMode={isDarkMode}>게시판</SectionTitle>
      <NavMenu>
        {categories.map((item) => (
          <SidebarLi
            key={item.id}
            onClick={() => {
              handleMenuClick(item.id);
              handleDropDown();
            }}
          >
            <SidebarLink
              className="link"
              $isSelected={selectedItem !== null && selectedItem === item.id}
            >
              {item.title}
              {item.icon}
            </SidebarLink>
          </SidebarLi>
        ))}
      </NavMenu>
      {isLoggedIn && (
        <>
          <SectionTitle $isDarkMode={isDarkMode}>마이 페이지</SectionTitle>
          <NavMenu>
            <SidebarLi
              onClick={() => {
                navigateMyPage();
                handleDropDown();
              }}
            >
              <SidebarLink className="link">
                <span>마이 페이지</span>
                <span>
                  <RiLogoutBoxRLine />
                </span>
              </SidebarLink>
            </SidebarLi>
            <SidebarLi
              onClick={() => {
                onLogout();
                handleDropDown();
              }}
            >
              <SidebarLink className="link">
                <span>로그 아웃</span>
                <span>
                  <IoIosLogOut />
                </span>
              </SidebarLink>
            </SidebarLi>
          </NavMenu>
        </>
      )}
    </NavBarSideContainer>
  );
};

export default NavBarSideModal;
