import React from "react";
import styled from "styled-components";

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 70px;
  right: 20px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  z-index: 100;
`;

const DropdownMenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

function ProfileMenu({ isOpen, onNavigate, onLogout }) {
  return (
    <div>
      <DropdownMenu isOpen={isOpen}>
        <DropdownMenuItem onClick={onNavigate}>마이페이지</DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>로그아웃</DropdownMenuItem>
      </DropdownMenu>
    </div>
  );
}

export default ProfileMenu;
