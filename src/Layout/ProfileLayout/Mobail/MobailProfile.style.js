import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const Main = styled.div`
  width: 95%;
  height: 95%;
  border-radius: 10px;
  background: rgba(247, 251, 255, 0.6);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const LeftContent = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  padding: 0 30px;
`;

export const MyInfoHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 10px;
`;

export const ProfileSetting = styled.div`
  width: 30%;
  background-color: #b1cde9;
  border-radius: 30px;
  padding: 1.3%;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;
export const IntroDuce = styled.div`
  width: 100%;
  height: 70%;
  font-size: 150%;
  padding: 3%;
  position: relative; /* 가상 요소를 위한 설정 */

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, black, transparent);
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

export const UserInfoBox = styled.div`
  width: ${(props) => props.$width || "40%"};
  height: 70%;
  margin-top: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 1);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  padding: 10px;
  text-align: center;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 20px;
  }
`;

export const RightContentWrap = styled.div`
  width: 100%;
  height: 150%;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: auto;
`;

export const RightContent = styled.div`
  width: 100%;
  max-width: 98%;
  min-height: 100%;
  overflow-y: auto;
  padding: 20px 10px;
  box-sizing: border-box;
`;
