import React, { useEffect, useState } from "react";
import { fetchMenuItems } from "../../services/api";
import styled from "styled-components";

const ContainerDiv = styled.div`
  max-height: 1080px;
  height: 90vh;
  width: 314px;
  // container border는 원래 없는 거라서 스켈레톤에서만 보임
  border-right: 1px solid gray;
`;

const SideBarDiv = styled.div`
  margin-top: 8rem;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.div`
  margin: 1rem;
  box-sizing: border-box;
`;

const SideBarUl = styled.ul`
  list-style-type: none;
  padding-left: 2rem;
  padding-right: 8px;
`;

const SideBarLi = styled.li`
  margin-bottom: 1rem;
  padding: 1rem 0;
  border: 1px solid black;
`;

const SideBarLink = styled.a`
  text-decoration: none;
  color: black;
`;

export default function SideBar() {
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
