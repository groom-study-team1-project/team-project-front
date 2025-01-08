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
  width: 20%;
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
  font-size: 1.5rem;
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
`;

export const Hr = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0)
  );
  margin-top: 1%;
`;

export const MypostTitle = styled.span`
  font-size: 2rem;
  margin-right: 1%;
`;

export const MyPostWrap = styled.div`
  display: flex;
`;

export const CategoryLi = styled.div`
  flex: 1;
`;

export const CategoryList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;

  padding: 4%;
  border-radius: 8px;
  margin-top: 10%;
  cursor: pointer;
`;

export const CategoryTitle = styled.div`
  font-size: 1.3rem;
  margin-bottom: 10%;
`;

export const CategoryCount = styled.div`
  font-size: 0.8rem;
  margin-left: 1%;
  max-height: ${({ $isOpen }) => ($isOpen ? "50px" : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  margin-top: ${({ $isOpen }) => ($isOpen ? "10px" : "0")};
`;

export const MyPostCardwrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: ${({ $Nopost }) => ($Nopost ? "center" : "flex-start")};
  justify-content: ${({ $Nopost }) => ($Nopost ? "center" : "flex-start")};
  margin-left: 5%;
  gap: 10px;
  flex: 5;
`;

export const EndPost = styled.p`
  width: 83%;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  background: #b1cde9;
  height: 10%;
  align-items: center;
  font-weight: bold;
  border-radius: 10px;
`;

export const NopostWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  div {
    margin-top: 3%;
    font-size: clamp(1rem, 2vw, 1.5rem);
    cursor: pointer;
  }
`;

export const Nopost = styled.img`
  width: 13vw;
  height: 40vh;
`;
