import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  /* position: fixed; */
`;

export const NavbarInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1440px;
  height: 80px;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 136px;
  height: 38px;
`;

export const NonLogo = styled(Logo)`
  width: 0;
  height: 0;
  border: none;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuItem = styled.div`
  margin-right: 20px;
  cursor: pointer;
  transition: transform 0.2s;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    transform: scale(1.08);
  }
`;

export const ButtonBox = styled.div`
  display: flex;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 32px;
  margin: 5px;
  padding: 1px;
`;

export const BorderButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 32px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0 10px;
  margin: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.1);
`;
