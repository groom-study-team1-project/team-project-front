import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  height: 88%;
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
  position: relative;
`;

export const LeftContent = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 3%;
`;

export const IntroDuce = styled.div`
  width: 80%;
  height: 10%;
  font-size: 100%;
  padding: 3%;
  position: relative; /* 가상 요소를 위한 설정 */
  margin-top: 10%;
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
  width: 80%;
  height: 10%;
  margin-top: 10%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 1);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 3%;
  span {
    margin-left: 3%;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-decoration: none;
    color: inherit;
  }
`;

export const ProfileSetting = styled.div`
  width: 80%;
  height: 5%;
  background-color: #b1cde9;
  border-radius: 30px;
  padding: 3%;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  span {
    margin-left: 10%;
  }
`;

export const RightContentWrap = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: auto;
`;

export const RightContent = styled.div`
  width: 100%;
  max-width: 98%;
  min-height: 100%;
  overflow-y: auto;
  padding: 20px 10px;
`;
