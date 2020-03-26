import React from "react";
import PropTypes from "prop-types";
import { isEmpty, camelCase } from "lodash";
import t from "../helpers/i18n";

export default function Errors({ errors, objectKey }) {
  if (isEmpty(errors[objectKey])) {
    return <div className="valid-feedback">{`Valid ${objectKey}`}</div>;
  }
  return (
    <div className="invalid-feedback">
      {t(`errors.${camelCase(errors[objectKey].message)}`)}
    </div>
  );
}

Errors.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  objectKey: PropTypes.string.isRequired,
};
