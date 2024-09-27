import styled from "styled-components";

export const PageNameWrap = styled.div`
  width: 260px;
  height: 54px;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 130px;
  margin-right: -100px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.5)
  );
`;

export const PageName = styled.h1`
  font-size: 30px;
  background: linear-gradient(to right bottom, #0b0611, #42469c);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70vw;
`;

export const Leftaside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  * {
    margin-top: 20px;
  }
`;

export const ProfileActions = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 15px;
  button {
    padding: 20px;
  }
`;

export const ProfileBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 0px;
`;

export const FormGroup = styled.div`
  input,
  select {
    width: 100%;
    height: 70px; // 고정된 높이 설정
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box; // padding과 border를 포함하여 크기를 계산
  }
`;

export const RightSection = styled.div`
  flex: 2;
  margin-left: 48px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 아래쪽으로 배치 */
  align-items: flex-start; /* 왼쪽 정렬 */
`;

export const RightProfile = styled.div`
  font-size: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 50px;
  width: 100%;
  margin-bottom: 20px; /* ButtonGroup과의 간격 조정 */
  button {
    padding: 10px 20px;
  }
`;
export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  div:nth-child(1) {
    font-weight: bold;
  }
  input,
  textarea {
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 24px;
    resize: none;
    overflow: scroll;
  }
`;
export const EmailWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const EmailDescription = styled.div`
  font-size: 12px;
  color: #ff0000;
  margin-left: 24px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center;

  button {
    margin-right: 10px;
    padding: 10px 20px;
    border-radius: 5px;
  }
`;

export const SubmitBtn = styled.button`
  background: ${(props) => props.$bgColor || "#fff"};
  color: ${(props) => props.$Color || "#fff"};
  border-radius: 10px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  white-space: nowrap;
`;
