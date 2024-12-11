import styled from "styled-components";

export const ReplyWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Reply = styled.div`
  display: flex;
  gap: 12px;
  flex: 1;
`;

export const ReplyContent = styled.div`
  flex: 1;
`;

export const ReplyInputWrap = styled.div`
  display: flex;
  height: 50%;  
  width: 100%;  
  align-items: center;
  margin-left: 12px;
  padding: 8px;
  border-bottom: 2px solid black;
`;

export const ReplyInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 8px;
  
  &::placeholder {
    color: #999;
  }
`;

export const InputImg = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;