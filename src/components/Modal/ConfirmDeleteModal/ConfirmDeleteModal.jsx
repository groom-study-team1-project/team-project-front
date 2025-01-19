import React from "react";
import PropTypes from "prop-types";
import { ModalBackground, ModalContainer, ModalTitle, ModalDescription, ModalActions, ModalButton } from "./ConfirmDeleteModal.style";

function ConfirmDeleteModal({ isVisible, onClose, onConfirm }) {
    if (!isVisible) return null;

    return (
        <ModalBackground onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalTitle>삭제하시겠습니까?</ModalTitle>
                <ModalDescription>이 작업은 되돌릴 수 없습니다.</ModalDescription>
                <ModalActions>
                    <ModalButton onClick={onClose}>취소</ModalButton>
                    <ModalButton onClick={onConfirm} confirm>
                        확인
                    </ModalButton>
                </ModalActions>
            </ModalContainer>
        </ModalBackground>
    );
}

ConfirmDeleteModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
