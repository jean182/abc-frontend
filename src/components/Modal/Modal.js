import React, { Component } from "react";
import PropTypes from "prop-types";
import ModalTrigger from "./ModalTrigger";
import ModalContent from "./ModalContent";
import ModalOverlay from "./ModalOverlay";

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.escapeKey = "Escape";
  }

  onOpen = () => {
    this.setState({ isOpen: true }, () => {
      this.closeButtonNode.focus();
    });
    this.toggleScrollLock();
  };

  onClose = () => {
    this.setState({ isOpen: false });
    this.openButtonNode.focus();
    this.toggleScrollLock();
  };

  onKeyDown = (e) => {
    e.stopPropagation();
    return e.key === this.escapeKey && this.onClose();
  };

  onClickAway = (e) => {
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.onClose();
  };

  toggleScrollLock = () =>
    document.querySelector("body").classList.toggle("modal-open");

  render() {
    const { ariaLabel, children, triggerStyles, triggerText } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <ModalContent
          ariaLabel={ariaLabel}
          buttonRef={(n) => {
            this.closeButtonNode = n;
          }}
          modalRef={(n) => {
            this.modalNode = n;
          }}
          isOpen={isOpen}
          content={children}
          onClickAway={this.onClickAway}
          onClose={this.onClose}
          onKeyDown={this.onKeyDown}
        />
        <ModalTrigger
          onOpen={this.onOpen}
          text={triggerText}
          triggerStyles={triggerStyles}
          buttonRef={(n) => {
            this.openButtonNode = n;
          }}
        />
        {isOpen && <ModalOverlay />}
      </>
    );
  }
}

Modal.defaultProps = {
  triggerStyles: "btn btn-primary",
};

Modal.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  triggerText: PropTypes.string.isRequired,
  triggerStyles: PropTypes.string,
};

export default Modal;
