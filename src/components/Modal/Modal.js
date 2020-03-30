import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ModalTrigger from "./ModalTrigger";
import ModalContent from "./ModalContent";
import ModalOverlay from "./ModalOverlay";

const Modal = (props) => {
  const {
    ariaLabel,
    children,
    buttonId,
    modalId,
    triggerStyles,
    triggerText,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const modalNode = useRef(null);
  const closeButtonNode = useRef(null);
  const openButtonNode = useRef(null);
  const escapeKey = "Escape";

  useEffect(() => {
    if (isOpen) {
      closeButtonNode.current.focus();
    } else {
      openButtonNode.current.focus();
    }
  }, [isOpen]);

  const toggleScrollLock = () =>
    document.querySelector("body").classList.toggle("modal-open");

  const onOpen = () => {
    setIsOpen(true);
    toggleScrollLock();
  };

  const onClose = () => {
    setIsOpen(false);
    toggleScrollLock();
  };

  const onKeyDown = (e) => {
    return e.key === escapeKey && onClose();
  };

  const onClickAway = (e) => {
    if (modalNode && modalNode.current.contains(e.target)) return;
    onClose();
  };

  return (
    <>
      <ModalContent
        ariaLabel={ariaLabel}
        buttonRef={closeButtonNode}
        id={modalId}
        modalRef={modalNode}
        isOpen={isOpen}
        content={children}
        onClickAway={onClickAway}
        onClose={onClose}
        onKeyDown={onKeyDown}
      />
      <ModalTrigger
        id={buttonId}
        onOpen={onOpen}
        text={triggerText}
        triggerStyles={triggerStyles}
        buttonRef={openButtonNode}
      />
      {isOpen && <ModalOverlay />}
    </>
  );
};

Modal.defaultProps = {
  triggerStyles: "btn btn-primary",
};

Modal.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  buttonId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  modalId: PropTypes.string.isRequired,
  triggerText: PropTypes.string.isRequired,
  triggerStyles: PropTypes.string,
};

export default Modal;
