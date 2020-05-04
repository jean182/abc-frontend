import React, { Component } from "react";
import PropTypes from "prop-types";
import ModalTrigger from "./ModalTrigger";
import ModalContent from "./ModalContent";
import ModalOverlay from "./ModalOverlay";

class Modal extends Component {
  static toggleScrollLock() {
    document.querySelector("body").classList.toggle("modal-open");
  }

  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.escapeKey = "Escape";
  }

  onOpen = (event) => {
    event.stopPropagation();

    this.setState({ isOpen: true }, () => {
      this.closeButtonNode.focus();
    });
    Modal.toggleScrollLock();
  };

  onClose = () => {
    this.setState({ isOpen: false });
    this.openButtonNode.focus();
    Modal.toggleScrollLock();
  };

  onKeyDown = (e) => {
    e.stopPropagation();
    return e.key === this.escapeKey && this.onClose();
  };

  onClickAway = (e) => {
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.onClose();
  };

  render() {
    const {
      ariaLabel,
      children,
      buttonId,
      modalId,
      subtitle,
      title,
      triggerStyles,
      triggerText,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        {isOpen && (
          <>
            <ModalContent
              ariaLabel={ariaLabel}
              buttonRef={(n) => {
                this.closeButtonNode = n;
              }}
              id={modalId}
              modalRef={(n) => {
                this.modalNode = n;
              }}
              isOpen={isOpen}
              content={children}
              onClickAway={this.onClickAway}
              onClose={this.onClose}
              onKeyDown={this.onKeyDown}
              subtitle={subtitle}
              title={title}
            />
            <ModalOverlay />
          </>
        )}
        <ModalTrigger
          id={buttonId}
          onOpen={this.onOpen}
          text={triggerText}
          triggerStyles={triggerStyles}
          buttonRef={(n) => {
            this.openButtonNode = n;
          }}
        />
      </>
    );
  }
}

Modal.defaultProps = {
  title: "",
  subtitle: "",
  triggerStyles: "btn btn-primary",
};

Modal.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  buttonId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  modalId: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  triggerText: PropTypes.string.isRequired,
  triggerStyles: PropTypes.string,
};

export default Modal;
