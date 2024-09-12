import React, { useEffect, useState } from "react";
import { fetchMenuItems } from "../../services/api";
import {
  ContainerDiv,
  Logo,
  SidebarDiv,
  SidebarLi,
  SidebarLink,
  SidebarUl,
} from "./Sidebar.style";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  const handleNavigation = (id, e) => {
    console.log(id);
    if (id === 1) {
      navigate("/community/free");
    } else if (id === 2) {
      navigate("/community/questions");
    } else if (id === 3) {
      navigate("/community/projects");
    } else if (id === 4) {
      navigate("/community/notices");
    }
  };

  return (
    <ContainerDiv>
      <Logo>
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
