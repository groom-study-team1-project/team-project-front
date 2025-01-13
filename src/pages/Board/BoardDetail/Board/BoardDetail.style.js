import styled from "styled-components";

export const Wrap = styled.div`
    width: 50vw;
    font-size: 16px;
`;

export const Postheader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: ${(props) => (props.$isMobile ? `9px` : ``)};
`;

export const PostheaderRignt = styled.div`
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    font-size: ${(props) => (props.$isMobile ? `11px` : ``)};
`;

export const Modify = styled.div`
    margin-left: 10px;
    cursor: pointer;
    position: relative;
`;

export const PostWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.6),
            rgba(255, 255, 255, 0.5)
    );
    .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
        min-height: 0px;
        margin-bottom: 0px;
    }
`;

export const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    background: white;
    .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
        min-height: 0px;
        margin-bottom: 0px;
    }
`;

export const Title = styled.div`
    font-size: ${(props) => (props.$isMobile ? `20px` : `24px`)};
    margin-bottom: 20px;
`;

export const PostFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    width: ${(props) => (props.$isMobile ? `115%;` : `103%;`)};
`;



