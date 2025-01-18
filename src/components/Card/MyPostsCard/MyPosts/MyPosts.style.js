import styled from "styled-components";

export const MyPost = styled.div`
  width: 100%;
  max-width: 320px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid black;
  display: flex;
  justify-content: center;
  padding: 1%;
  margin: 10px;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MypostThumbnail = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  object-fit: cover;
`;

export const MypostTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10%;
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
  font-size: 0.8rem;
  white-space: nowrap;
`;

export const Hastags = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  flex-wrap: wrap;
  div {
    margin-right: 3%;
    font-size: 0.9rem;
  }
`;
