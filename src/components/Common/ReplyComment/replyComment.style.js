import styled from "styled-components";

export const RepliesWrap = styled.div`
    margin-left: 2rem;
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
`;

export const Reply = styled.div`
    display: flex;
    background: none;
    align-items: center;
    margin-bottom: 2%;  
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

export const ReplyTimeText = styled.span`
    font-size: 9px;
    white-space: nowrap;
`;

export const EditReplyWrap = styled.div`
    padding: 2% 2% 2% 2%;
`;

export const EditReplyInput = styled.input`
    display:flex;
    width: 90%;
    border-radius: 5px;
    border: 2px solid black;
    padding : 2% 2% 2% 2%;
`;

export const ReplyInputForm = styled.form`
    margin: 0.5rem 0rem 0rem 0rem;
`;

export const ReplyInputWrap = styled.div`
    position: relative;
    margin-left: 2rem;
    margin-right: 1rem;   
    width: 95%;
    border-bottom: 2px solid black;
`;

export const ReplyInput = styled.input`
    width: 90%;
    padding: 1rem 0.5rem 1rem 1rem;
    border: none;
    outline: none;
`;

export const ReplySubmitButton = styled.img`
    position: absolute; 
    margin-top: 1rem;
    margin-left: 2rem;   
`;

export const SomeMoreReplyButton = styled.button`
    background-color: white;
    border: none;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    flex: 1;
    
    &: hover {
        background-color: #afafaf;
        font-weight: bold;
    }
`;