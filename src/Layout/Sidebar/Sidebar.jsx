import React, { useEffect, useState } from "react";
import {
  ContainerDiv,
  Logo,
  SidebarDiv,
  SidebarIcon,
  SidebarLi,
  SidebarLink,
  SidebarUl,
} from "./Sidebar.style";
import { useNavigate } from "react-router-dom";
import { fetchCategoryItems } from "../../services/postApi";
import logoImg from "../../assets/images/DEEPDIVERS.png";
import cardIcon from "../../assets/images/Card.png";
import informaitonIcon from "../../assets/images/Help Badge.png";
import userIcon from "../../assets/images/User.png";
import questionIcon from "../../assets/images/User Settings.png";
import fileIcon from "../../assets/images/File Multiple.png";

function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  const handleNavigation = (id) => {
    console.log(id);
    if (id === 1) {
      navigate("/community/free");
    } else if (id === 2) {
      navigate("/community/questions");
    } else if (id === 3) {
      navigate("/community/projects");
    } else if (id === 4) {
      navigate("/community/notices");
    } else if (id == 5) {
      navigate("/");
    }
  };

  const iconMapping = {
    "HOT 게시판": <SidebarIcon src={userIcon} alt="HOT 게시판 아이콘" />,
    "자유 게시판": <SidebarIcon src={cardIcon} alt="자유 게시판 아이콘" />,
    "프로젝트 게시판": (
      <SidebarIcon src={fileIcon} alt="프로젝트 게시판 아이콘" />
    ),
    "질문 게시판": <SidebarIcon src={questionIcon} alt="질문 게시판 아이콘" />,
    공지사항: <SidebarIcon src={informaitonIcon} alt="공지사항 아이콘" />,
  };

  return (
    <ContainerDiv>
      <Logo onClick={() => handleNavigation(5)}>
        <img
          src={logoImg}
          alt="로고 이미지"
          style={{ width: "128px", margin: "16px" }}
        />
      </Logo>
      <SidebarDiv>
        <SidebarUl>
          {menuItems.map((item) => (
            <SidebarLi key={item.id} onClick={() => handleNavigation(item.id)}>
              <SidebarLink>
                {item.item}
                {iconMapping[item.item]}
              </SidebarLink>
            </SidebarLi>
          ))}
        </SidebarUl>
      </SidebarDiv>
    </ContainerDiv>
  );
}

export default Sidebar;
