import React, { useRef, useEffect } from "react";
import { ModalBackground, Modal } from "./EditDeleteModal.style"; // 모달 스타일 import
import { useSelector } from "react-redux";
const ModalComponent = ({ isVisible, onClose, onEdit, onDelete }) => {
  const modalRef = useRef(null);
  const { isMobile } = useSelector((state) => state.screenSize);
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // 모달 외부 클릭 시 모달 닫기
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if (!isVisible) return null; // 모달이 보이지 않을 때는 렌더링하지 않음

  return (
    <ModalBackground>
      <Modal ref={modalRef} $isMobile={isMobile}>
        <div onClick={onEdit}>수정</div>
        <hr />
        <div onClick={onDelete}>삭제</div>
      </Modal>
    </ModalBackground>
  );
};

export default ModalComponent;
