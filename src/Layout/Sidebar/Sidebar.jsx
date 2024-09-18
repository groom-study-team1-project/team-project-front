import React, { useEffect, useState } from "react";
import {
  ContainerDiv,
  Logo,
  SidebarDiv,
  SidebarLi,
  SidebarLink,
  SidebarUl,
} from "./Sidebar.style";
import { useNavigate } from "react-router-dom";
import { fetchCategoryItems } from "../../services/postApi";

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

  return (
    <ContainerDiv>
      <Logo onClick={() => handleNavigation(5)}>
        <h2>로고이미지</h2>
      </Logo>
      <SidebarDiv>
        <SidebarUl>
          {menuItems.map((item) => (
            <SidebarLi key={item.id} onClick={() => handleNavigation(item.id)}>
              <SidebarLink>{item.item}</SidebarLink>
            </SidebarLi>
          ))}
        </SidebarUl>
      </SidebarDiv>
    </ContainerDiv>
  );
}

export default Sidebar;
