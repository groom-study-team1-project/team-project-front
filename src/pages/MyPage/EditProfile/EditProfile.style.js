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
  background: linear-gradient(to bottom right, #0b0611, #47286f, #42469c);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 30px;
  font-weight: 800;
  text-align: center;
`;

export const Container = styled.div`
  width: 70vw;
  border: 1px solid black;
  padding: 20px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ProfileImageWraps = styled.div`
  display: flex;
`;

// 닉네임 라벨
export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  div {
    margin-bottom: 8px;
  }
`;

// 닉네임 입력 및 버튼이 있는 컨테이너
export const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
`;

// 입력 필드 스타일
export const Input = styled.input`
  width: ${(props) => props.width};
  height: 40px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin-right: 10px; // 버튼과 간격을 주기 위해 사용
`;

// 중복확인 버튼 스타일
export const CheckButton = styled.button`
  height: 40px;
  padding: 0 20px;
  background-color: #b3e5fc; // 하늘색 배경
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: #fff;

  &:hover {
    background-color: #81d4fa; // 버튼에 hover 했을 때 색상 변화
  }
`;

export const ProfileActions = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
  margin-left: 20px;
  width: 120%;
    @media (max-width: 550px) {
        flex-direction: column;
        gap: 20px;
    }
  button {
    height: 40px;
  }
`;

export const ProfileFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
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

export const ProfileImageWrapsRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const JobSelect = styled.select`
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 10px;
  width: 80%;
`;

export const ChecknickName = styled.div`
  font-size: 12px;
  color: ${(props) => props.color || "black"};
`;
