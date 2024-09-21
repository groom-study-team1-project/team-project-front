import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Main = styled.div`
  width: 1450px;
  border: 1px solid black;
`;

export const ProfileWrap = styled.div`
  width: 1450px;
  margin-left: 0px;
  margin-bottom: 70px;
`;

export const ProfileTitle = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  text-align: center;
`;

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
`;

export const ProfileSetting = styled.button`
  border-radius: 10px;
  width: 155px;
  height: 50px;
  background-color: #7682ff;
  color: white;
  border: none;
  cursor: pointer;
`;

export const Userintroduce = styled.div`
  padding: 20px;
`;
