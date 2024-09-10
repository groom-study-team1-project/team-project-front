import React from "react";
import Modal from "react-modal";
// import { ModalOverlay, ModalContent } from "./Modal.style";

function ModalLayout({ isOpen, closeModal, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "2rem 1.5rem",
          borderRadius: "20px",
          maxWidth: "530px",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {children}
    </Modal>
  );
}

export default ModalLayout;
