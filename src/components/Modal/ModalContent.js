/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import FocusLock from "react-focus-lock";
import { snakeCase } from "lodash";

const ModalContent = ({
  ariaLabel,
  buttonRef,
  content,
  id,
  isOpen,
  modalRef,
  onClickAway,
  onClose,
  onKeyDown,
  subtitle,
  title,
}) => {
  const openClass = isOpen ? "show" : "";
  return (
    <FocusLock>
      <div
        id={id}
        className={`modal fade ${openClass}`}
        role="dialog"
        aria-labelledby={snakeCase(ariaLabel)}
        tabIndex="-1"
        onKeyDown={onKeyDown}
        onClick={onClickAway}
        style={{
          display: isOpen ? "block" : "none",
        }}
        {...(isOpen ? { "aria-modal": true } : { "aria-hidden": true })}
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-lg"
          ref={modalRef}
        >
          <div className="modal-content">
            <div className="modal-header bg-secondary text-white">
              <h1>{title}</h1>
              <h4>{subtitle}</h4>
              <button
                type="button"
                className="close text-white"
                aria-labelledby="close-modal"
                onClick={onClose}
                ref={buttonRef}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {content}
          </div>
        </div>
      </div>
    </FocusLock>
  );
};

ModalContent.defaultProps = {
  ariaLabel: "modalLabel",
};

ModalContent.propTypes = {
  ariaLabel: PropTypes.string,
  buttonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
  content: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modalRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
  onClickAway: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalContent;
