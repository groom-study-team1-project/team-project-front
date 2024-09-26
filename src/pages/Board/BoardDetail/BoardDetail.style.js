import styled from "styled-components";

export const Wrap = styled.div`
  width: 50vw;
  margin: auto auto;
  font-size: 16px;
`;

export const CategotyWrap = styled.div`
  width: 260px;
  height: 54px;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 130px;
  margin-right: -100px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.5)
  );
`;

export const CategoryTitle = styled.div`
  font-size: 30px;
  background: linear-gradient(to right bottom, #0b0611, #42469c);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

export const Postheader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PostheaderRignt = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  width: 100px;
  margin-right: 10px;
`;

export const Modify = styled.div`
  margin-left: 10px;
  cursor: pointer;
  position: relative;
`;

export const PostWrap = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 0px;
    margin-bottom: 0px;
  }
`;

export const Title = styled.div`
  font-size: 24px;
`;

export const PostFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

export const IconWrap = styled.div`
  margin-top: 10px;
  margin-left: 16px;
`;

export const CommetHr = styled.hr`
  width: 15%;
  float: left;
`;

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
  width: 100%;
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

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const Modal = styled.div`
  width: 80px;
  height: 40px;
  border: 1px solid black;
  border-radius: 10px;
  background: white;
  padding: 10px;
  position: absolute;
  top: 20px;
  left: 2px;
  div {
    cursor: pointer;
  }
`;
export const Bold = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;
export const CommnetModalIcon = styled.div`
  margin-left: 10px;
`;
