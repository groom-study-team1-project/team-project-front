import React from 'react';
import styled, { keyframes, css } from "styled-components";  const vibration = keyframes`  0% {     transform: rotate(1deg);   }   50% {     transform: rotate(-1deg);   }   100% {     transform: rotate(1deg);   } `;  export const ErrMsg = styled.div`   margin-top: 8px;   font-size: 12px;   color: red; `;
