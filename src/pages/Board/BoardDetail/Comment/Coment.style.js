import styled from "styled-components";

export const CommentsWrap = styled.div`
  margin-top: 50px;
`;

export const CommentWrap = styled.div`
  width: 100%;
  height: 65px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
  border-radius: 15px;
  margin-bottom: 16px;
  background: none;  
  div {
    padding-bottom: 1rem;    
  }  
`;

export const Comment = styled.div`
  display: flex;
  align-items: center;
`;

export const CommentText = styled.div`
  margin-left: 10px;
`;

export const CommentRight = styled.div`
  display: flex;
`;

export const TimeAndLike = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const CommentInputWrap = styled.div`
  position: relative;
  width: 110%;
  margin-top: 16px;
`;

export const CommentInput = styled.input`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 16px;
`;

export const InputImg = styled.img`
  position: absolute;
  width: 17px;
  top: 10px;
  right: 0px;
  cursor: pointer;
`;
export const Bold = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const IconWrap = styled.div`
  margin-top: 10px;
  margin-left: 16px;
`;

export const CommnetModalIcon = styled.div`
  margin-left: 10px;
  position: relative;
`;
