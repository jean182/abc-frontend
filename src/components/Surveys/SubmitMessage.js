import React from "react";
import PropTypes from "prop-types";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

export default function SubmitMessage({ loading, message, status }) {
  if (loading)
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (status === 200) return <SuccessAlert message={message} />;
  return <ErrorAlert message={message} />;
}

SubmitMessage.propTypes = {
  loading: PropTypes.bool.isRequired,
  status: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};
