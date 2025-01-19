import styled from "styled-components";

export const EditProfileForm = styled.form`
  overflow-y: auto;
  height: 100%;
  width: 100%;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileImageWraps = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ProfileActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  button {
    margin: 4%;
    height: 40px;
  }
`;

export const EditProfileacticle = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
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
  width: 100%;
  display: flex;
  align-items: center;
  flex: 8;
`;

export const LabelTitle = styled.div`
  display: flex;
  width: 10%;
  flex: 1;
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
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: #fff;

  &:hover {
    background-color: black;
  }
`;

export const ProfileFooter = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  padding: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center;
  margin-top: 10px;
  button {
    margin-right: 10px;
    padding: 10px 30px;
    border-radius: 10px;
  }
`;

export const SubmitBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => !["$bgColor", "$Color"].includes(prop),
})`
  background: ${(props) => props.$bgColor || "#fff"};
  color: ${(props) => props.$Color || "#fff"};
  border-radius: 10px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  white-space: nowrap;
`;

export const ChecknickName = styled.div`
  font-size: 12px;
  color: ${(props) => props.color || "black"};
`;
