import styled from "styled-components";

export const Hash = styled.div`
  height: 16px;
  display: flex;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

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

export const HashText = styled.p`
  font-size: 14px;
  padding: 4px;
  padding-top: 9px;
  padding-bottom: 8px;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
