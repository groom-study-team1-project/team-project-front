import styled from "styled-components";

export const RepliesWrap = styled.div`
    margin-top: 2px;
`;

export const Reply = styled.div`
    display: flex;
    background: blue;
    align-items: center;
    margin-bottom: 5px;
    padding-left: 10px;
`;

export const ReplyContent = styled.div`
    width: 90%;
    margin-bottom: 5px;
    padding-left: 10px;
`;

export const Nickname = styled.div`
    font-weight: bold;
    padding-bottom: 5px;
`;

export const ReplyText = styled.span`
    font-size: 12px;
`;

export const ReplyRight = styled.div`
    float: right;
    display: flex;
    width: 15%;
    flex-direction: column;
    align-items: end;
    justify-content: flex-start;
    small {
        padding-bottom: 10px;
        font-size: 10px;
    }
`;

export const ReplyLike = styled.span`
    
`

export const InputImg = styled.img`

`;

export const ReplySubmitButton = styled.button`
    max-width: 50px;
`;

export const ReplyInputWrap = styled.div`

`;

export const ReplyInput = styled.input`

`;