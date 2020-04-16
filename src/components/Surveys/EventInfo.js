import React from "react";
import PropTypes from "prop-types";

export default function EventInfo({
  expDescription,
  expNumber,
  procedureType,
  voteType,
}) {
  return (
    <div className="row bg-light align-items-center py-3">
      <div className="col-sm-8 pl-sm-5">
        <p className="text-truncate mb-0 text-primary font-weight-bold">
          <span className="text-dark">{`${expNumber}:`}</span>
          {expDescription}
        </p>
      </div>
      <div className="col-sm-4">
        <p className="mb-0 font-weight-light">
          <strong className="font-weight-bold">
            {"Tipo de procedimiento: "}
          </strong>
          {procedureType}
        </p>
        <p className="mb-0 font-weight-light">
          <strong className="font-weight-bold">Tipo de votación: </strong>
          {voteType}
        </p>
      </div>
    </div>
  );
}

EventInfo.defaultProps = {
  expDescription: "",
  expNumber: "",
  procedureType: "",
  voteType: "",
};

EventInfo.propTypes = {
  expDescription: PropTypes.string,
  expNumber: PropTypes.string,
  procedureType: PropTypes.string,
  voteType: PropTypes.string,
};
