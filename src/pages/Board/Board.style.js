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
  border: 1px solid black;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
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
