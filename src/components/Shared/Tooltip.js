import React from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { truncate } from "lodash";

const Tooltip = (props) => {
  const { description } = props;

  return (
    <Tippy content={description} placement="right">
      <button className="btn--unstyled btn-tooltip" type="button">
        {truncate(description, { length: 10, separator: "" })}
      </button>
    </Tippy>
  );
};

Tooltip.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Tooltip;
