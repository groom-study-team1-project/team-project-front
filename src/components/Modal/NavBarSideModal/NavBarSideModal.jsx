import React from 'react';
import {
    NavBarSideContainer,
    SectionTitle,
    NavMenu,
    NavMenuItem,
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

const NavBarSideModal = ({isOpen, menuItems, handleMenuClick,
                          handleDarkMode,isDarkMode,islogin, userInfo,
                          navigateNewPost, navigateMyPage, onLogout, onLogin, onSignUp}) => {
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
                    <NavMenuItem key={item.id} onClick={() => handleMenuClick(item.id)}>
                        {item.item}
                        {item.icon}
                    </NavMenuItem>
                ))}
            </NavMenu>
            <SectionTitle>마이 페이지</SectionTitle>
            <NavMenu>
                <NavMenuItem onClick={navigateMyPage}>
                    <span>마이 페이지</span>
                    <span><RiLogoutBoxRLine/></span>
                </NavMenuItem>
                <NavMenuItem onClick={onLogout}>
                    <span>로그 아웃</span>
                    <span><LuUserSquare2 /></span>
                </NavMenuItem>
            </NavMenu>
        </NavBarSideContainer>
    )
}

export default NavBarSideModal;