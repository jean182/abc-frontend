import React from "react";
import PropTypes from "prop-types";

export default function SuccessAlert({ message }) {
  return (
    <div className="row bg-light align-items-center py-3">
      <p>{message}</p>
    </div>
  );
}

SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
};
