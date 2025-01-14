import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  height: 80%;
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
`;

export const LeftContent = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 3%;
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
  font-size: 1rem;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const ProfileSetting = styled.button`
  border-radius: 10px;
  width: 136px;
  height: 40px;
  background-color: #b1cde9;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const RightContentWrap = styled.div`
  width: 100%;
  height: 100%; /* 부모 높이를 기준으로 설정 */
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden; /* 자식이 범위를 벗어나지 않도록 설정 */
  display: flex;
  flex-direction: column;
`;

export const RightContent = styled.div`
  margin: 1%;
  height: 100%;
`;
