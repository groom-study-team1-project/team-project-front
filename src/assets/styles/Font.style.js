import { createGlobalStyle } from "styled-components";

export const FontDefault = createGlobalStyle`
  @font-face {
    font-family: 'Pretandard';
    src: url("/assets/fonts/Pretendard-Regular.woff2") format("woff2");
    font-display: swap;
  }

  body{
    font-family: 'Pretendard';
    font-size:16px;
  }
`;
