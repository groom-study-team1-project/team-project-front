import styled from "styled-components";

export const ContainerDiv = styled.div`
  max-height: 1080px;
  height: 100vh;
  width: 314px;
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
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: ${(props) =>
    props.isSelected
      ? `-webkit-linear-gradient(45deg, rgba(38, 112, 233, 0.5) 0%, rgba(255, 255, 255, 0.1) 100%);
      -moz-linear-gradient(45deg, rgba(38, 112, 233, 0.5) 0%, rgba(255, 255, 255, 0.1) 100%);
      linear-gradient(45deg, rgba(38, 112, 233, 0.5) 0%, rgba(255, 255, 255, 0.1) 100%);
      `
      : "transparent"};
  border-left: ${(props) => (props.isSelected ? "2px solid #2670E9" : "none")};

  &:last-child {
    border-bottom: none;
  }
`;

export const SidebarLink = styled.div`
  text-decoration: none;
  color: black;
  margin-left: 8px;
`;

export const SidebarIcon = styled.img`
  float: right;
  margin-right: 16px;
`;
