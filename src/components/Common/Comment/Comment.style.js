import styled from "styled-components";

export const CommentsWrap = styled.div`
    margin-top: 25px;
    padding: 0 0px;
    justify-content: space-between;
`;

export const CommentTitle = styled.div`
    color: black;
    font-family: Sans-Serif;
    span:first-child {
        font-weight: bold;
        font-size: 24px;
        margin-right: 8px;
    }
    span:last-child {
        font-size: 14px;
    }
`

export const CommetHr = styled.hr`
    width: 100%;
    height: 2px;
    background-color: darkgray;
    border: none;
    `;

export const CommentWrap = styled.div`
    width: 98%;
    min-height: 70px;
    height: auto;
    display: flex;
    align-items: center;
    padding: 5px 12px 5px 12px;
    margin-bottom: 16px;
    background: none;
    &:hover {
        border-radius: 10px;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    }
`;

export const Comment = styled.div`
    display: flex;
    width: 90%;
    margin-right: 1rem;
`;

export const CommentText = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: start;
    width: 90%;
    margin-left: 10px;
    font-size: 13px;
`;

export const CommentRight = styled.div`
    display: flex;
    width: 10%;
    flex-direction: row;
    align-items: flex-start;
`;

export const TimeAndLike = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    div {
        font-size: 9px;
    }
`;

export const CommentModalIcon = styled.div`
    justify-content: flex-start;
    position: relative;
`;

export const LikedButton = styled.button`
    border: none;
    background: none;
    width: 50%;
    height: auto;
    align-items: end;
    justify-content: start;
    img {
        object-fit: contain;
        width : 100%;
        padding-top: 5px;
    }
`;

export const IconWrap = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    justify-content: flex-end;
    max-width: 100%;
    span {
        margin-top: 3px;
    }
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

export const ReplyButton = styled.button`
    padding: 8px 0px 0px 0px;
    background: none;
    border: none;
    cursor: pointer;
`

export const EditCommentWrap = styled.div`
    width: 100%;
`

export const CommentButton = styled.button`
    padding: 5px 5px 5px 5px;
    border-radius: 30px;
    border: none;
    background: black;
    color: white;
    font-weight: bold;
    float: right;
`

export const CommentInputForm = styled.form`
    margin-bottom: 30px;
    width: 100%;
`

export const CommentInputWrap = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
`;

export const CommentInput = styled.input`
    width: 100%;
    height: 20%;
    padding: 10px 30px 10px 10px;
    font-size: 16px;
    border-radius: 8px;
    background: none;
    &:focus {
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
        border: none;
        outline: none;
    }
`;

export const InputImg = styled.img`
    position: absolute;
    object-fit: contain;
    border: none;
    background: none;
    width: 15px;
    cursor: pointer;
    right: 10px;        
    top: 50%;           
    transform: translateY(-50%);
`;