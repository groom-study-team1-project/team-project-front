import styled from "styled-components";

export const Wrap = styled.div`
  width: 60%;
  margin: auto auto;
  font-size: 16px;
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
      min-height: 400px;
      background: white;
      border-radius: 0 0 10px 10px;
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

export const Write = styled.div`
  ${(props) =>
    props.$isMobile
      ? `
    font-size: 30px;
 
`
      : `
  font-size: 40px;
`}
`;

export const TitleWrap = styled.div`
  display: flex;
  ${(props) =>
    props.$isMobile
      ? `
    flex-direction: column;
    margin-bottom: 10px;
    justify-content: none;
 
`
      : `
    justify-content: space-between;
`}
`;

export const Titleinput = styled.input`
  height: 43px;
  border-radius: 10px;
    border: 1px solid #B2ACAC;
  margin-bottom: 32px;
  padding-left: 10px;
  width: ${(props) => (props.$isMobile ? "100%" : "30vw")};
`;

export const Categoryselect = styled.select`
  height: 43px;
    border: 1px solid #B2ACAC;
  border-radius: 10px;
  background: white;
    padding-left: 10px;
  color: black;
  ${(props) =>
    props.$isMobile
      ? `
     width: 100%;
    margin-top: -20px;
 
`
      : ``}
`;

export const Hashtag = styled.input`
  border: 1px solid #B2ACAC;
  background: white;
  border-radius: 10px;
  padding: 10px;
  ${(props) =>
    props.$isMobile
      ? `
    width: 50%;
    margin-bottom: 20px;
`
      : ``}
`;

export const SubmitBtnWrap = styled.div`
  float: right;
  width: ${(props) => props.$isMobile && "100%"};
`;

export const Toolbar = styled.div`
    border-bottom: 1px solid #B2ACAC;
`;

export const CancelBtn = styled.button`
  margin-left: 16px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  border: 1px solid #929292;
  color: black;
  ${(props) =>
    props.$isMobile
        ? `width: 50%;
         margin: 0px;
         display: inline;`
        : `
         width: 132px;
      `}
`;

export const ConfirmBtn = styled.button`
  margin-left: 16px;
  height: 40px;
  border-radius: 10px;
  background: #b1cde9;
  cursor: pointer;
  border: 1px solid #b1cde9;
  color: black;
  ${(props) =>
    props.$isMobile
        ? `width: 50%;
         margin: 0px;
         display: inline;`
        : `
         width: 132px;
      `}
`;

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
    border: 1px solid #B2ACAC;
    background: white;
    border-radius: 10px;
    margin-bottom: 20px;
`;


