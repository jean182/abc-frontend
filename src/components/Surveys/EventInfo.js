import React from "react";
import PropTypes from "prop-types";

export default function EventInfo({
  expDescription,
  expNumber,
  procedureType,
  voteType,
}) {
  return (
    <div className="row align-items-center modal-header--info">
      <div className="col-sm-8 pl-sm-5 pt-3 pb-3">
        <p className="mb-0 text-primary">
          <span className="text-dark font-weight-bold">{`${expNumber}:`}</span>
          {expDescription}
        </p>
      </div>
      <div className="col-sm-4 modal-header--types">
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
