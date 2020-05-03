import React from "react";
import PropTypes from "prop-types";
import t from "../../helpers/i18n";

export default function EventRow({ columns, row, select, selected }) {
  const onRowSelectionClick = () => {
    select(row.id);
  };

  const onRowSelectionKeyPress = (event) => {
    if (event.key === "Enter") select(row.id);
  };

  const selectedClass = selected ? " row-selected" : "";
  return (
    <div
      className={`row align-rows-center table-row p-2 my-3 my-sm-0 table-row${selectedClass}`}
      onClick={onRowSelectionClick}
      onKeyPress={onRowSelectionKeyPress}
      role="button"
      tabIndex={0}
    >
      {columns.map(({ value }) => {
        const truncate = value === "description" ? " text-truncate" : "";
        const translatedValue = t(`table.events.${value}`);
        return (
          <div
            key={`${value}-${row.id}`}
            className={`col-sm my-1 my-sm-0${truncate}`}
          >
            <span className="d-sm-none font-weight-bold">
              {`${translatedValue}: `}
            </span>
            {row[value]}
          </div>
        );
      })}
    </div>
  );
}

EventRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  row: PropTypes.oneOfType([PropTypes.object]).isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};
