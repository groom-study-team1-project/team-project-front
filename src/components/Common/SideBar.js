import React, { useEffect, useState } from "react";
import { fetchSideBarMenuItems } from "../../services/api";
import {
  ContainerDiv,
  Logo,
  SideBarDiv,
  SideBarUl,
  SideBarLi,
  SideBarLink,
} from "../../assets/styles/SideBarStyles";

export default function SideBar() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await fetchSideBarMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error(error);
        // 사용자에게 오류 메시지 표시를 고려할 수 있습니다.
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <ContainerDiv>
      <Logo>
        <h2>로고이미지</h2>
      </Logo>
      <SideBarDiv>
        <SideBarUl>
          {menuItems.map((item) => (
            <SideBarLi key={item.id}>
              <SideBarLink href={item.link}>{item.item}</SideBarLink>
            </SideBarLi>
          ))}
        </SideBarUl>
      </SideBarDiv>
    </ContainerDiv>
  );
}
