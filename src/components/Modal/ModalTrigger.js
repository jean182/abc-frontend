import React from "react";
import PropTypes from "prop-types";

const ModalTrigger = ({ buttonRef, triggerStyles, onOpen, text, id }) => (
  <button
    id={id}
    type="button"
    className={triggerStyles}
    data-toggle="modal"
    onClick={onOpen}
    ref={buttonRef}
    data-target="#modal-form"
  >
    {text}
  </button>
);

ModalTrigger.defaultProps = {
  buttonRef: null,
  id: "modal-button",
};

ModalTrigger.propTypes = {
  buttonRef: PropTypes.func,
  triggerStyles: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default ModalTrigger;
