import styled from "styled-components";

export const MyPost = styled.div`
  width: ${({ $isSmallDesktop, $isTablet }) =>
    $isTablet ? "80%" : $isSmallDesktop ? "40%" : "28%"};

  aspect-ratio: 4/3.5;
  background: white;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  padding: 1%;
  margin-right: 1%;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

export const MypostThumbnail = styled.img`
  width: 95%;
  height: 55%;
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
  font-size: ${({ $isSmallDesktop, $isTablet }) =>
    $isTablet ? "2rem" : $isSmallDesktop ? "1rem" : "1rem"};
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
  font-size: ${({ $isSmallDesktop, $isTablet }) =>
    $isTablet ? "1.3rem" : $isSmallDesktop ? "1rem" : "1rem"};
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
