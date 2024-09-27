import React, { useState } from "react";
import {
  ModalBackground,
  ModalContainer,
  ModalHeader,
  ModalInput,
  ModalActions,
} from "./PasswordChange.style";

const PasswordChange = ({ setIsModalOpen }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const closeModal = () => setIsModalOpen(false);

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      console.log("비밀번호가 변경되었습니다:", newPassword);
      closeModal();
    } else {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <>
      <ModalBackground>
        <ModalContainer>
          <ModalHeader>비밀번호 변경</ModalHeader>
          <ModalInput
            type="password"
            placeholder="현재 비밀번호"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <ModalInput
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <ModalInput
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <ModalActions>
            <button onClick={handlePasswordChange}>확인</button>
            <button className="cancel" onClick={closeModal}>
              취소
            </button>
          </ModalActions>
        </ModalContainer>
      </ModalBackground>
    </>
  );
};

export default PasswordChange;
