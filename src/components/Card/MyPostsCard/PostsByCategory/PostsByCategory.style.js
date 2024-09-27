import styled from "styled-components";

export const Myboard = styled.div`
  padding: 10px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;

  span {
    color: #575757;
    padding-right: 10px;
  }

  &:hover {
    border: 1px solid transparent;
    border-radius: 8px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.5)
    );
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 4px rgba(0, 0, 0, 0.05),
      0 10px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
  }

  &:hover::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: transparent;
    border-radius: 8px;
    border: 1px solid transparent;
    background: linear-gradient(
        10deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      )
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

export const BoardContentsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 20px 10px 20px;
  cursor: pointer;
`;

export const BoardContent = styled.div`
  flex: 4;
  overflow: hidden;
  max-width: 300px;
`;

export const LoadMore = styled.p`
  margin: 20px;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
