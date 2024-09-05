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

function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems()
      .then((menuItems) => setMenuItems(menuItems))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <ContainerDiv>
      <Logo>
        <h2>로고이미지</h2>
      </Logo>
      <SidebarDiv>
        <SidebarUl>
          {menuItems.map((item) => (
            <SidebarLi key={item.id}>
              <SidebarLink href={item.link}>{item.item}</SidebarLink>
            </SidebarLi>
          ))}
        </SidebarUl>
      </SidebarDiv>
    </ContainerDiv>
  );
}

export default Sidebar;
