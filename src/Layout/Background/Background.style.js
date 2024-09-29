import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  color: ${({ isDarkMode }) => (isDarkMode ? "#FFFFFF" : "#000000")};
`;
