import styled from "styled-components";

export const CommentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export const CommetHr = styled.hr`
  width: 100%;
`;

export const CommentWrap = styled.div`
  width: 100%;
  min-height: 70px;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 12px 5px 12px;
  border-radius: 10px;
  margin-bottom: 16px;
  background: white;
`;

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
  font-size: 13px;
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
`;

export const CommentInputWrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: 16px;
`;

export const CommentInput = styled.input`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 5px;
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
  margin-left: 10px;
  position: relative;
`;

export const IconWrap = styled.div`
  margin-top: 10px;
  align-items: center;
`;

export const LikedButton = styled.span`
  border: none;
  background: none;
  width: 10%;
  align-items: end;
  margin-right: 5px;
`;

export const LikeImg = styled.img`
  width: ${(props) => (props.$like ? "10%" : "")};
`;

export const ReplyButton = styled.button`
  padding: 8px 0px 0px 0px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const EditCommentWrap = styled.div`
  width: 100%;
`;

export const CommentButton = styled.button`
  margin: 5px 2px 5px 5px;
  border-radius: 30px;
  border: none;
  background: black;
  color: white;
  font-weight: bold;
  float: right;
`;

export const CommentInputForm = styled.form`
  margin: 0px 0px 0px 0px;
  width: 100%;
`;
