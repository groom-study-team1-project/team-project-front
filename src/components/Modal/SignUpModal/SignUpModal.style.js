import styled from "styled-components";
import { Logo } from "../Modal.style";

export const ProfileImgDiv = styled.div`
  text-align: center;
  padding-bottom: 16px;
`;

export const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  cursor: pointer;
`;

export const SignUpHeader = styled(Logo)`
  margin-bottom: 0;
`;

export const ErrorMsg = styled.div`
  color: red;
  font-weight: bold;
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 16px;
`;
