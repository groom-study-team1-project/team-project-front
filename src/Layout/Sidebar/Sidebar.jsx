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
import logoImg from "../../assets/images/DEEPDIVERS.png";

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

  return (
    <ContainerDiv>
      <Logo onClick={() => handleNavigation(5)}>
        <img src={logoImg} alt="로고 이미지" style={{ width: "128px" }} />
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
