import styled from "styled-components";

export const Container = styled.div`
  margin: 0;
`;

// 콘텐츠
export const Content = styled.main`
  height: auto;
  padding: 20px;
  margin-top: 10%;
  margin-left: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
`;

// 왼쪽 콘텐츠(타이틀&게시판버튼)
export const LeftArea = styled.div`
  width: 600px;
  max-width: 620px;
  height: auto;
  margin-top: -50px;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  font-size: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const SubTitle = styled.h1`
  font-style: black;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 35px;
  font-weight: 900;
`;

export const Detail = styled.p`
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Button = styled.div`
  width: 240px;
  color: #000000;
  padding: 6px 10px;
  padding-left: 15px;
  padding-bottom: 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

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
`;

export const PostCardLine = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  width: auto;
  max-width: 800px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0;
  align-items: center;
  justify-items: end;
`;

export const PostCardImg = styled.img`
  width: ${(props) => props.width || "320px"};
  height: ${(props) => props.height || "200px"};
`;
