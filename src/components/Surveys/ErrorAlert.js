import React from "react";
import PropTypes from "prop-types";
import { FaWindowClose } from "react-icons/fa";

export default function ErrorAlert({ message }) {
  return (
    <div
      className="card text-white bg-danger mb-3"
      style={{ maxWidth: "18rem" }}
    >
      <div className="card-body">
        <h5 className="card-title">{message}</h5>
        <p className="card-text">
          <FaWindowClose />
        </p>
      </div>
    </div>
  );
}

ErrorAlert.defaultProps = {
  message: "Error",
};

ErrorAlert.propTypes = {
  message: PropTypes.string,
};
