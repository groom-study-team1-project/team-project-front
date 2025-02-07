import styled from "styled-components";

export const CommentsWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    margin-left: 1rem;
    background-color: white;
    opacity: 0.7;
    border-radius: 5px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.2);
    justify-content: center;
`;

export const CommentTitle = styled.div`
    padding: 1rem 1rem 0.5rem 1rem;
    span:first-child {
        color: rgba(132, 84, 255, 0.73);
    }
`;

export const CommentInputForm = styled.form`
  width: 95%;
  padding: 1rem 1rem 1rem 1rem;  
  margin-bottom: 0.5%;          
  background-color: white;  
`;

export const CommentInputWrap = styled.div`
  position: relative;
  width: 100%;
`;

export const CommentInput = styled.input`
    width: 100%;
    background: aliceblue;
    opacity: 1;
    border: 1px solid #bbb;
    border-radius: 8px;
    padding: 1rem 0.5rem 1rem 0.5rem;
    font-size: 16px;
`;

export const InputImg = styled.img`
  padding-top: 0.2rem;
  position: absolute;
  width: 20px;
  top: 10px;
  right: 0px;
  cursor: pointer;
`;

export const CommentHr = styled.hr`
    width: 98%;
    border: 1px solid gray;
`;

export const CommentWrap = styled.div`
  width: 95%;
  min-height: 70px;
  height: auto;  
  display: flex;
  flex-direction: column;  
  justify-content: space-between;
  align-items: center;
  padding: 0 2% 0 2%;  
  border-radius: 10px;
  margin-bottom: 2%;  
`;

export const CommentBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 2%;
`

export const Comment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  margin-right: 1rem;
`;

export const CommentText = styled.div`
  width: 100%;
  margin-left: 10px;
  font-size: 14px;
`;

export const CommentRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TimeAndLike = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  div {
    font-size: 12px;
  }
`;

export const TimeAndModal = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 20%;  
`;

export const Bold = styled.div`
  font-weight: 900;
  margin-bottom: 5px;
  font-size: 12px;
  color: black;

  p {
    color: #797979;
    font-weight: 200;
  }
`;
export const CommnetModalIcon = styled.div`
  position: relative;
`;

export const IconWrap = styled.div`
  margin-top: 5px;
  align-items: center;
`;

export const LikedButton = styled.span`
  border: none;
  background: none;
  width: 15%;
  align-items: end;
  margin-right: 3px;
  white-space: nowrap;  
`;

export const ReplyButton = styled.button`
  padding: 0.5rem 0.5rem 0.5rem 0rem;
  background: none;
  border: none;
  cursor: pointer;
`;

export const EditCommentWrap = styled.div`
  width: 100%;
`;

export const EditCommentInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 2px solid black;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  margin-bottom: 0.5rem;  
  width: 100%;  
`;

export const CommentButton = styled.button`
  margin: 5px 2px 5px 5px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;  
  border-radius: 5px;
  border: none;
  color: gray;
  background: white;
  font-weight: bold;
  float: right;
  cursor: pointer;
  &:hover{
      color: white;
      background: black;
  }  
`;

export const ReplyList = styled.div`
  width: 100%;
  margin-top: 2%;    
`;

export const SomeMoreCommentButton = styled.button`
    background-color: white;
    border: none;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    flex: 1;

    &:hover {
        background-color: #afafaf;
        font-weight: bold;
    }
`;