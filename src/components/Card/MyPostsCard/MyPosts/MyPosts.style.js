import styled from "styled-components";

export const MyPost = styled.div`
  width: 23%;
  height: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid black;
  display: flex;
  justify-content: center;
  padding: 1%;
  margin-right: 3%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  cursor: pointer;
`;

export const MypostThumbnail = styled.img`
  width: 60%;
  height: auto;
`;

export const MypostTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5%;
`;

export const MypostTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: start;
  flex: 1;
`;

export const DateCountWrap = styled.div`
  margin: 5% 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const MypostDate = styled.div`
  font-weight: bold;
`;
