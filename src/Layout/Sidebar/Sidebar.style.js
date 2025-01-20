import styled from "styled-components";

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 45px 24px 24px;
`;

export const SidebarDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Logo = styled.div`
  margin-bottom: 178px;
  img {
    width: 136px;
  }
`;

export const SidebarUl = styled.ul`
  width: 100%;
  list-style-type: none;
`;

export const SidebarLi = styled.li`
  padding: 15px 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  list-style: none;

  &:last-child {
    border-bottom: none;
  }

  &:hover .link {
    border-left: 2px solid #2670e9;
  }

  &:hover .link::after {
    transition: width 0.2s ease-in-out;
    width: 100%;
  }
`;

export const SidebarLink = styled.div`
  position: relative;
  height: 40px;
  padding-left: 9px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: black;
  border-left: 2px solid #2670e9;
  background: ${(props) =>
    props.$isSelected
      ? "linear-gradient(to right, rgba(38, 112, 233, 0.7), rgba(38, 112, 233, 0))"
      : "transparent"};

  &::after {
    content: "";
    position: absolute;

    background: linear-gradient(
      to right,
      rgba(38, 112, 233, 0.5),
      rgba(38, 112, 233, 0)
    );
    opacity: 0.3;
    left: 0;
    top: 0;
    width: ${(props) => (props.isSelected ? "100%" : "0")};
    height: 100%;
    transition: 0.2s;
    z-index: -1;
  }
`;

export const SidebarTitle = styled.p``;

export const SidebarIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;
