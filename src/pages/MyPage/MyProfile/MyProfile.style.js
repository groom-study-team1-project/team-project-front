import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 48px 24px;
`;

export const Main = styled.div`
  max-width: 1380px;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.5) 100%
  );
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 8px;
`;

export const ProfileWrap = styled.div`
  width: 100%;
  max-width: 1450px;
  margin-left: 0px;
  margin-bottom: 70px;
`;

export const ProfileTitle = styled.div`
  padding: 10px;
  border-radius: 16px;
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
  margin: 24px;
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
  padding: 32px;
  padding-bottom: 5%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 24px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin-top: 2%;
`;

export const LabelTitle = styled.div`
  font-size: 1.5rem;
`;

export const Url = styled.a`
  margin-left: 1%;
  text-decoration: none;
  color: black;
`;
