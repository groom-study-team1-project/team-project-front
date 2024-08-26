import React, { useEffect, useState } from "react";
import { fetchSideBarMenuItems } from "../../services/api";
import styled from "styled-components";

export default function SideBar() {
  const ContainerDiv = styled.div`
    max-height: 1080px;
    height: 90vh;
    width: 314px;
  `;
  const SideBarDiv = styled.div`
    height: 296px;
    margin-top: 8rem;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
  const Logo = styled.div`
    margin: auto;
    margin-left: 1rem;
    box-sizing: border-box;
  `;
  const SideBarUl = styled.ul`
    list-style-type: none;
    padding-left: 2rem;
  `;
  const SideBarLi = styled.li`
    margin-bottom: 2rem;
  `;

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await fetchSideBarMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <ContainerDiv>
      {/* SideBar */}
      <Logo>
        <h2>로고이미지</h2>
      </Logo>
      <SideBarDiv>
        <SideBarUl>
          {menuItems.map((item) => (
            <SideBarLi key={item.id}>
              <a
                href={item.link}
                style={{ textDecoration: "none", color: "black" }}
              >
                {item.item}
              </a>
            </SideBarLi>
          ))}
        </SideBarUl>
      </SideBarDiv>
    </ContainerDiv>
  );
}
