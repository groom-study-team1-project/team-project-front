import { createGlobalStyle } from "styled-components";

export const FontDefault = createGlobalStyle`
  @font-face {
    font-family: 'Pretandard';
    src: url("/assets/fonts/Pretendard-Regular.woff2") format("woff2");
    font-display: swap;
  }

  body{
    font-family: 'Pretendard';
    //font-size: calc(10px + (16 - 4) * ((100vw - 320px) / (1920 - 320)));
    font-size:16px;
  }
`;
