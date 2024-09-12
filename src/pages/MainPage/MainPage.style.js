import styled from "styled-components";

export const Container = styled.div`
  max-width: 1920px;
  max-height: 100vh;
  margin: 0;
  padding-top: 20px;
  border: 1px solid black;
`;

// 콘텐츠
export const Content = styled.main`
  height: auto;
  padding: 20px;
  margin-top: 155px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
`;

// 왼쪽 콘텐츠(타이틀&게시판버튼)
export const LeftArea = styled.div`
  width: 500px;
  max-width: 520px;
  height: auto;
  margin-top: -100px;
  border: 1px solid black;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  color: #343a40;
  border: 1px solid black;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SubTitle = styled.h1`
  font-style: black;
  border: 1px solid black;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Detail = styled.p`
  font-size: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid black;
`;

export const Button = styled.div`
  width: 240px;
  color: #000000;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ededed;
  }

  img {
    width: 16px;
    height: 16px;
    margin-left: 8px;
    margin-top: 1px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: translateX(5px);
  }
`;

// 오른쪽 콘텐츠(포스트카드)
export const RightArea = styled.div`
  padding: 20px;
  margin-right: 90px;
  border: 1px solid black;
`;

export const PostCardLine = styled.div`
  display: flex;
  border: 1px solid black;
`;

export const PostCard = styled.div`
  margin: 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  width: ${({ width }) => width || ""};
`;
