import { ProfileImage } from "../../Card/PostCard/PostProfile";
import styled from "styled-components";

export const ProfileHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const UserName = styled.div`
  font-weight: bold;
  font-size: ${(props) => (props.$size ? props.$size : "32px")};
  margin-bottom: ${(props) => (props.$bottom ? props.$bottom : "20px")};
`;

export const UserJob = styled.div`
  font-size: ${(props) => (props.$jobSize ? props.$jobSize : "16px")};
  color: ${(props) => (props.$color ? props.$color : "black")};
`;

export const Mypost = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.5) 100%
  );
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: 24px;
  border-radius: 10px;
  padding: 16px;
`;

export const Myboard = styled.div`
  padding: 10px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;

  span {
    color: #575757;
    padding-right: 10px;
  }

  &:hover {
    border: 1px solid transparent;
    border-radius: 8px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.5)
    );
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 4px rgba(0, 0, 0, 0.05),
      0 10px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
  }

  &:hover::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: transparent;
    border-radius: 8px;
    border: 1px solid transparent;
    background: linear-gradient(
        10deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      )
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

export const ProfileImages = styled(ProfileImage)`
  width: ${(props) => (props.$width ? props.$width : "100px")};
  height: ${(props) => (props.$height ? props.$height : "100px")};
  background-color: lightblue; // 임시 배경색 지정
  border: 2px solid white;
  margin-right: ${(props) => (props.$marginRight ? props.marginRight : "0")};
`;

export const BoardContentsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 20px 10px 20px;
`;

export const BoardContent = styled.div`
  flex: 4;
  overflow: hidden;
  max-width: 300px;
`;
