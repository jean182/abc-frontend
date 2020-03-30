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

ModalTrigger.propTypes = {
  buttonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
  triggerStyles: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ModalTrigger;
