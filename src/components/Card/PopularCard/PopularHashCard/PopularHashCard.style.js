import styled from "styled-components";

export const Hash = styled.div`
  height: 16px;
  display: flex;
  background-color: white;
  border-radius: 8px;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const HashText = styled.p`
  font-size: 14px;
  padding: 4px;
  padding-top: 9px;
  padding-bottom: 8px;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
