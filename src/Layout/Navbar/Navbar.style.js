import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  border: 1px solid #111;
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
  border: 1px solid #111;
`;

export const NonLogo = styled(Logo)`
  width: 0;
  height: 0;
  border: none;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #111;
`;

export const MenuItem = styled.div`
  margin-right: 20px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
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
  border: 1px solid #111;
`;
