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
  flex-direction: column;
  align-items: start;
  font-weight: bold;
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

export const SmallWrite = styled.div`
    font-size: 1rem;
    padding-left: 0.2rem;
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
  width: 100%;
  ${(props) =>
    props.$isMobile
      ? `
        flex-direction: column;
        margin-bottom: 10px;
        justify-content: none;
        ` 
      : ``
  }
`;

export const Titleinput = styled.input`
  flex: 10;
  height: 43px;
  border-radius: 5px;
  border: none;
  margin-right: 1rem;
  margin-bottom: 32px;
  padding-left: 1rem;
  width: ${(props) => (props.$isMobile ? "100%" : "30vw")};
`;

export const Categoryselect = styled.select`
  width: 30%;
  height: 43px;
  border: none;
  border-radius: 5px;
  background: white;
  color: black;
  ${(props) =>
    props.$isMobile
      ? `
          width: 100%;
          margin-top: -20px;
      `
      : ``
  }
`;

export const EditorWrap = styled.div`
    background: white;
    border-radius: 5px;
`;

export const Toolbar = styled.div`
  margin-bottom: 0px;
  border-bottom: 1px solid gray;
`;

export const HashtagWrap = styled.div`
    display: flex;
    flex: 1;
`;

export const Hashtag = styled.input`
  border: none;
  background: white;
  border-radius: 5px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  margin-right: 1rem;  
  ${(props) =>
    props.$isMobile
      ? `
        width: 50%;
        margin-bottom: 20px;
      `
      : ``
  }
`;

export const Hashtags = styled.div`
    padding: 0.3rem;
    margin-right: 0.5rem;
    border: none;
    border-radius: 5px;
    background: white;
    cursor: pointer;
    ${(props) =>
            props.$isMobile
                    ? `
        width: 50%;
        margin-bottom: 20px;
      `
                    : ``
    }
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
