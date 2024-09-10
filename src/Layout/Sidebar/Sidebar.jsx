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
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchMenuItems()
      .then((menuItems) => {
        console.log(111111);
        console.log(menuItems[0]);

        setMenuItems([...menuItems]);
      })
      .catch((err) => console.log(err.message));
  }, [location.pathname]);

  const handleNavigation = (id) => {
    if (id === 1) {
      window.location.href = "/community/free";
    } else if (id === 2) {
      window.location.href = "/community/questions";
    } else if (id === 3) {
      window.location.href = "/community/projects";
    } else if (id === 4) {
      window.location.href = "/community/notices";
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
            <SidebarLi
              key={item.id}
              onClick={(e) => handleNavigation(item.id, e)}
            >
              <SidebarLink>{item.item}</SidebarLink>
            </SidebarLi>
          ))}
        </SidebarUl>
      </SidebarDiv>
    </ContainerDiv>
  );
}

export default Sidebar;
