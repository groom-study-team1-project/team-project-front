import styled from "styled-components";

export const Wrap = styled.div`
  width: 60%;
  margin: auto auto;
  font-size: 16px;
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
    margin-bottom: 20px;
    background: white;
    border-radius: 5px;
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
  ${(props) =>
    props.$isMobile
      ? `
  width:30px;
  height:30px;
`
      : `
  width:40px;
  height:40px;
`}
  cursor: pointer;
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
  border: none;
  margin-bottom: 32px;
  padding: 0px;
  width: ${(props) => (props.$isMobile ? "100%" : "30vw")};
`;

export const Categoryselect = styled.select`
  height: 43px;
  border: none;
  border-radius: 10px;
  background: white;
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
  border: none;
  background: none;
  border: 1px solid black;
  border-radius: 5px;
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

export const SubmitBtn = styled.button`
  margin-left: 16px;
  height: 40px;
  border-radius: 10px;
  background: ${(props) => props.$bgColor};
  cursor: pointer;
  border: 1px solid ${(props) => props.$borderColor};
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

export const Toolbar = styled.div`
  margin-bottom: 30px;
`;
