import styled from "styled-components";

export const ErrorMsg = styled.div`
  color: red;
  font-weight: bold;
  font-size: 12px;
  margin-top: 8px;
`;

export const ProfileImgDiv = styled.div`
  width: 300%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
`;

export const ProfileImgContainer = styled.div`
  width: 30%;
  max-width: 120px;
  aspect-ratio: 1 / 1;
  position: relative;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 50%;
  object-fit: cover;
  transform: ${({ $default }) => ($default ? "scale(1.2)" : "scale(1)")};
`;

export const CameraIcon = styled.img`
  position: absolute;
  bottom: 40%;
  right: 32%;
  cursor: pointer;
  width: 35%;
  height: 20%;
  min-width: 20px;
  min-height: 20px;
`;

export const ImageCancel = styled.button`
  width: 10%;
  padding: 1%;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.4);
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 1%;
`;
