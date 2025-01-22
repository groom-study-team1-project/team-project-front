import React from 'react';
import styled from "styled-components";  export const ProfileImg = styled.img`   width: 100%;   height: 100%;   cursor: pointer;   border-radius: 50%;   object-fit: cover;   transform: ${({ $default }) => ($default ? "scale(2)" : "scale(1)")};   position: absolute;   top: 0;   left: 0; `;
