import styled from "styled-components";

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
  height: 100%;
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
  &:hover {
    background-color: rgba(177, 205, 233, 0.3);
    color: rgba(0, 0, 0, 0.7);
  }
  ${({ $select }) =>
    $select &&
    `
    background: rgba(177, 205, 233); 
    font-weight: bold; 
    border: 1px solid rgba(177, 205, 233);
  `}
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
  margin-left: 3%;
  gap: 1rem;
  flex: 5;
  overflow-y: auto;
  height: 90%;
`;

export const EndPost = styled.p`
  width: 100%;
  text-align: center;
  background: #b1cde9;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 0; /* 상하 패딩을 추가 */
  margin-top: auto; /* 요소를 컨테이너 하단으로 밀어내기 */
`;

export const NopostWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 3%;
  div {
    margin-top: 3%;
    font-size: clamp(1rem, 2vw, 1.5rem);
    cursor: pointer;
  }
`;

export const Nopost = styled.img`
  width: 13vw;
  height: 18vw;
`;
