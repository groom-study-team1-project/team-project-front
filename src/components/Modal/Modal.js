import React from "react";
import Modal from "react-modal";

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
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "20px",
          maxWidth: "530px",
          maxHeight: "970px",
          overflow: "hidden",
          padding: 0,
        },
      }}
    >
      {children}
    </Modal>
  );
}

export default ModalLayout;
