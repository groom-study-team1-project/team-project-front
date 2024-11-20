import React, { useEffect, useState } from "react";
import {
  ContainerDiv,
  Logo,
  SidebarDiv,
  SidebarIcon,
  SidebarLi,
  SidebarLink,
  SidebarTitle,
  SidebarUl,
} from "./Sidebar.style";
import { useNavigate } from "react-router-dom";
import { fetchCategoryItems } from "../../services/api/postApi";
import logoImg from "../../assets/images/DEEPDIVERS.png";
import cardIcon from "../../assets/images/Card.png";
import informaitonIcon from "../../assets/images/Help Badge.png";
import userIcon from "../../assets/images/User.png";
import questionIcon from "../../assets/images/User Settings.png";
import fileIcon from "../../assets/images/File Multiple.png";
import { useDispatch, useSelector } from "react-redux";
import { selectMenuItem } from "../../store/category/menuSlice";

function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.menu?.selectedItem || null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetchCategoryItems();
        setMenuItems(response);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleMenuClick = (item) => {
    dispatch(selectMenuItem(item));
    handleNavigation(item.id);
  };

  const handleNavigation = (id) => {
    if (id === 1) {
      navigate("/board/free");
    } else if (id === 2) {
      navigate("/board/projects");
    } else if (id === 3) {
      navigate("/board/questions");
    } else if (id === 4) {
      navigate("/board/notices");
    } else if (id === 5) {
      navigate("/");
    }
  };

  const iconMapping = {
    "자유게시판": <SidebarIcon src={cardIcon} alt="자유 게시판 아이콘" />,
    "프로젝트 자랑 게시판": (
      <SidebarIcon src={fileIcon} alt="프로젝트 게시판 아이콘" />
    ),
    "질문 게시판": <SidebarIcon src={questionIcon} alt="질문 게시판 아이콘" />,
    "공지사항 게시판": <SidebarIcon src={informaitonIcon} alt="공지 아이콘" />,
  };

  return (
    <ContainerDiv>
      <Logo onClick={() => handleNavigation(5)}>
        <img src={logoImg} alt="로고 이미지" />
      </Logo>
      <SidebarDiv>
        <SidebarUl>
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <SidebarLi
                key={item.id}
                onClick={() => {
                  handleMenuClick(item);
                }}
              >
                <SidebarLink
                  className="link"
                  $isSelected={
                    selectedItem !== null && selectedItem === item.id
                  }
                >
                  <SidebarTitle>{item.title}</SidebarTitle>
                  {iconMapping[item.title]}
                </SidebarLink>
              </SidebarLi>
            ))
          ) : (
            <li>메뉴를 불러오는 중...</li>
          )}
        </SidebarUl>
      </SidebarDiv>
    </ContainerDiv>
  );
}

export default Sidebar;
