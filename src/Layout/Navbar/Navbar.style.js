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
  height: 80px;
  margin: 0px 10px;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 136px;
  height: 38px;
  cursor: pointer;
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
  margin-right: 5%;
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
  color: black;
`;

export const MobailDropDown = styled.div`
  margin-right: 10px;
  border-radius: 50%;
  background: white;
  opacity: 0.5;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  cursor: pointer;
  transition: all 0.35s ease;
  z-index: 1000;
  right: ${({ $dropDown }) => ($dropDown ? `58%` : `0`)};
  span {
    display: block;
    position: absolute;
    width: 70%;
    height: 3px;
    border-radius: 30px;
    background-color: black;
    transition: all 0.35s ease;
    &:nth-child(1) {
      ${({ $dropDown }) =>
        $dropDown
          ? `top: 50%;
             transform: translateY(-50%) rotate(45deg);
             z-index: 2;`
          : `top: 30%; `}
    }

    &:nth-child(2) {
      ${({ $dropDown }) =>
        $dropDown
          ? `opacity: 0;`
          : `top: 50%;
             transform: translateY(-50%);`}
    }

    &:nth-child(3) {
      ${({ $dropDown }) =>
        $dropDown
          ? `bottom: 50%;
             transform: translateY(50%) rotate(-45deg);
             z-index: 2;`
          : `bottom: 30%;`}
    }
  }
`;
