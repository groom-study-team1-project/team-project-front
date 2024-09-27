import React from "react";
import styled from "styled-components";

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 50px;
  right: -60px;
  transform: translateX(-50%);
  width: 110px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  z-index: 100;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    right: 18px;
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent rgba(255, 255, 255, 0.5) transparent;
  }
`;

const DropdownMenuItem = styled.div`
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  margin: 5px 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 30px;
  }
`;

function ProfileMenu({ isOpen, onNavigate, onLogout }) {
  return (
    <div>
      <DropdownMenu isOpen={isOpen}>
        <DropdownMenuItem onClick={onNavigate}>마이페이지</DropdownMenuItem>
        <p style={{ borderTop: "0.5px solid rgba(0, 0, 0, 0.2)" }}></p>
        <DropdownMenuItem onClick={onLogout}>로그아웃</DropdownMenuItem>
      </DropdownMenu>
    </div>
  );
}

export default ProfileMenu;
