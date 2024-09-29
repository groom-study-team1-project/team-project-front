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
  border: 1px solid black;
  margin-bottom: 48px;
`;

export const PostCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

export const LastPostEnd = styled.div`
  padding: 20px;
  text-align: center;
  background-color: white;
  margin-top: 48px;
  font-weight: bold;
`;
