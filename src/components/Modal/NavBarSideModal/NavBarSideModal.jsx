import React from 'react';
import {
    NavBarSideContainer,
    SectionTitle,
    NavMenu,
    NavModalButtonBox,
    UserImg
} from "./NavBarSideModal.style";
import {
    Button,
    BorderButton
} from "../../../Layout/Navbar/Navbar.style";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { LuUserSquare2 } from "react-icons/lu";
import darkmodeIcon from "../../../assets/images/darkmode.png";
import lightmodeIcon from "../../../assets/images/lightmode.png";
import profileIcon from "../../../assets/images/profileIcon.png";
import {
    SidebarLi,
    SidebarLink
} from "../../../Layout/Sidebar/Sidebar.style";
import {useSelector} from "react-redux";

const NavBarSideModal = ({isOpen, menuItems, handleMenuClick,
                          handleDarkMode,isDarkMode,islogin, userInfo,
                          navigateNewPost, navigateMyPage, onLogout, onLogin, onSignUp}) => {

    const selectedItem = useSelector((state) => state.menu?.selectedItem || null);

    if(!isOpen) return null;

    return (
        <NavBarSideContainer>
            {isOpen && (
                <NavModalButtonBox>
                    <Button onClick={handleDarkMode}>
                        <img
                            src={!isDarkMode ? darkmodeIcon : lightmodeIcon}
                            alt="다크모드"
                        />
                    </Button>
                    {islogin ? (
                        <>
                            <BorderButton onClick={navigateNewPost}>
                                새 글 작성
                            </BorderButton>
                            <UserImg
                                src={userInfo?.imageUrl ? userInfo.imageUrl : profileIcon}
                                alt="프로필"
                            />
                        </>
                    ):(
                        <>
                            <BorderButton onClick={onLogin}>
                                Login
                            </BorderButton>
                            <BorderButton onClick={onSignUp}>
                                Sign up
                            </BorderButton>
                        </>
                    )}
                </NavModalButtonBox>
            )}
            <SectionTitle>게시판</SectionTitle>
            <NavMenu>
                {menuItems.map((item) => (
                    <SidebarLi
                        key={item.id}
                        onClick={() => {
                            handleMenuClick(item.id);
                        }}
                    >
                        <SidebarLink
                            className="link"
                            $isSelected={selectedItem !== null && selectedItem !== item.id}
                        >
                                {item.item}
                                {item.icon}
                        </SidebarLink>
                    </SidebarLi>
                ))}
            </NavMenu>
            <SectionTitle>마이 페이지</SectionTitle>
            <NavMenu>
                <SidebarLi onClick={navigateMyPage}>
                    <SidebarLink className="link">
                        <span>마이 페이지</span>
                        <span><RiLogoutBoxRLine/></span>
                    </SidebarLink>
                </SidebarLi>
                <SidebarLi onClick={onLogout}>
                    <SidebarLink className="link">
                        <span>로그 아웃</span>
                        <span><LuUserSquare2/></span>
                    </SidebarLink>
                </SidebarLi>
            </NavMenu>
        </NavBarSideContainer>
    )
}

export default NavBarSideModal;