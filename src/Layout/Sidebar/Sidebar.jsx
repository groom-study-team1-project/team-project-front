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
import { useDispatch, useSelector } from "react-redux";
import { selectMenuItem } from "../../store/category/menuSlice";

function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.menu?.selectedItem || null);
  console.log("selected item: ", selectedItem);

  useEffect(() => {
    fetchCategoryItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  const handleMenuClick = (id) => {
    // dispatch(selectMenuItem(id));
    // handleNavigation(id);

    console.log("Clicked Item ID:", id); // 클릭된 ID 출력

    dispatch(selectMenuItem(id)); // 선택된 메뉴 항목을 상태로 저장
    console.log("Updated Selected Item:", id); // 상태 업데이트 확인

    handleNavigation(id); // 페이지 이동 처리
  };

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
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <SidebarLi
                key={item.id}
                onClick={() => {
                  handleMenuClick(item.id);
                }}
                isSelected={selectedItem !== null && selectedItem === item.id}
              >
                <SidebarLink>
                  {item.item}
                  {iconMapping[item.item]}
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
