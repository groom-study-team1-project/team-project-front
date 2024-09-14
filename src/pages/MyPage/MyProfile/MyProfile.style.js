import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  // 임시로 배경 지정
  background-color: #acb6e5;
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
  padding: 10px;
  border-radius: 20px;
  width: 200px;
  text-align: center;
  font-size: 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0.5) 100%
  );
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    background: linear-gradient(180deg, #0b0611 0%, #47286f 53%, #42469c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    font-size: 24px;
    font-weight: 800;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
`;

export const ProfileSetting = styled.button`
  border-radius: 10px;
  width: 136px;
  height: 40px;
  background-color: #7682ff;
  color: white;
  border: none;
  cursor: pointer;
`;

export const Userintroduce = styled.div`
  padding: 20px;
`;
