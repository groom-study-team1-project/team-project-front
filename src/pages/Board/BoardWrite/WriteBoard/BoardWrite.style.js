import styled from "styled-components";

export const Wrap = styled.div`
  width: 1028px;
  margin: auto auto;
  font-size: 16px;
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
    margin-bottom: 20px;
    background: white;
  }

  .ck.ck-toolbar {
    border: none;
    border-radius: 10px;
  }
`;

export const WriteWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 111px;
  margin-bottom: 41px;
`;

export const BackImg = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
export const Write = styled.div`
  font-size: 40px;
`;
export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Titleinput = styled.input`
  width: 300%;
  height: 43px;
  border-radius: 10px;
  border: none;
  margin-bottom: 32px;
`;

export const Categoryselect = styled.select`
  width: 196px;
  height: 43px;
  border: none;
  border-radius: 10px;
`;

export const Hashtag = styled.input`
  border: none;
`;

export const SubmitBtnWrap = styled.div`
  float: right;
`;

export const SubmitBtn = styled.button`
  margin-left: 16px;
  width: 132px;
  height: 40px;
  border-radius: 10px;
  background: ${(props) => props.$bgColor};
  cursor: pointer;
  border: 1px solid ${(props) => props.$borderColor};
`;

export const Toolbar = styled.div`
  margin-bottom: 30px;
`;
