import styled from "styled-components";

export const ContentWrapper = styled.div`
  flex-grow: 1;
  margin-right: 50px;
`;

export const BoardTitle = styled.div`
  width: 264px;
  height: 48px;
  display: flex;
  margin-bottom: 48px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.5)
  );
`;

export const Title = styled.h1`
  background: linear-gradient(to bottom right, #0b0611, #47286f, #42469c);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 30px;
  font-weight: 800;
  text-align: center;
`;

export const SearchSortWrapper = styled.div`
  width: auto;
  height: 32px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
`;

export const PostCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(minmax(300px, 1fr));
  gap: 40px;
`;
