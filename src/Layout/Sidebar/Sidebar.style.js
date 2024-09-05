import styled from "styled-components";

export const ContainerDiv = styled.div`
  max-height: 1080px;
  height: 90vh;
  width: 314px;
  position: fixed;
  // container border는 원래 없는 거라서 스켈레톤에서만 보임
  border-right: 1px solid gray;
`;

export const SidebarDiv = styled.div`
  margin-top: 8rem;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Logo = styled.div`
  margin: 1rem;
  box-sizing: border-box;
`;

export const SidebarUl = styled.ul`
  list-style-type: none;
  padding-left: 2rem;
  padding-right: 8px;
`;

export const SidebarLi = styled.li`
  margin-bottom: 1rem;
  padding: 1rem 0;
  border: 1px solid black;
`;

export const SidebarLink = styled.a`
  text-decoration: none;
  color: black;
`;
