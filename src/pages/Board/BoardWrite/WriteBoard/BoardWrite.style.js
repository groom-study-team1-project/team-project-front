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
    flex-direction: column;
    align-items: start;
    font-weight: bold;
    margin-top: 111px;
    margin-bottom: 41px;
`;

export const Category = styled.div`
    font-size: 30px;
    margin-bottom: 10px;
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
` : `
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
    padding-left: 10px;
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
    margin-bottom: 1rem;
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
    margin-bottom: 0.5rem;
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
    margin-bottom: 0.5rem;
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
    ${(props) =>
            props.$isMobile
                    ? `
    width: 100%;
    align-items: center;
  `
                    : ""}
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
                    ? `width: 40%;
         margin-right: 10px;
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
                    ? `width: 40%;
         margin: 0px;
         margin-left: 10px;
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
