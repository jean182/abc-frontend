import React from "react";
import ReactDOM from "react-dom";

const ModalOverlay = () => {
  return ReactDOM.createPortal(
    <div className="modal-backdrop fade show" />,
    document.body
  );
};

export default ModalOverlay;
