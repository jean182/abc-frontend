import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import t from "../../helpers/i18n";

export default function HeaderColumn({ column, onHeaderClick, sortValue }) {
  const orderTypes = ["desc", "asc", ""];
  const [orderType, setOrderType] = useState("");

  useEffect(() => {
    if (sortValue !== column.value) {
      setOrderType("");
    }
  }, [sortValue, column.value]);

  const next = (value) => {
    if (orderTypes.indexOf(value) === orderTypes.length - 1) {
      return orderTypes[0];
    }
    return orderTypes[orderTypes.indexOf(value) + 1];
  };

  const displayArrow = (value) => {
    if (value === "") return null;
    return value === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  const handleClick = () => {
    const nextValue = next(orderType);
    setOrderType(nextValue);
    onHeaderClick({ value: column.value, orderType: nextValue });
  };

  return (
    <div className="col">
      <button
        className="btn nav-link text-white"
        type="button"
        onClick={handleClick}
      >
        {t(`table.events.${column.value}`)}
        <span>{displayArrow(orderType)}</span>
      </button>
    </div>
  );
}

HeaderColumn.propTypes = {
  column: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  sortValue: PropTypes.string.isRequired,
};
