import styled from "styled-components";

export const SearchWrapper = styled.div`
  width: auto;
  height: 32px;
  display: flex;
  border: 1px solid blue;
`;

export const SearchBox = styled.div`
  width: 378px;
  height: 32px;
  border: 1px solid black;
  display: flex;
  border-radius: 20px;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;
`;

export const InnerSearch = styled.input`
  width: 378px;
  height: 30px;
  font-size: 16px;
  border: none;
  padding-left: 24px;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

export const SearchIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const SearchOption = styled.select`
  width: 80px;
  height: 24px;
  border: 1px solid blue;
  align-self: flex-end;
  cursor: pointer;
`;
