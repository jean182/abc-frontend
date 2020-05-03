import React from "react";
import PropTypes from "prop-types";
import t from "../../helpers/i18n";

export default function EventRow({ columns, row, select }) {
  const onRowSelection = (event) => {
    select(event.target.value);
  };
  return (
    <div
      className="row align-rows-center table-row p-2 my-3 my-sm-0 table-row-row"
      type="button"
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
      <div className="col-sm d-flex justify-content-sm-center align-items-sm-center">
        <span className="d-sm-none font-weight-bold mr-2">
          {t("table.events.selection")}
        </span>
        <div className="form-check pl-0">
          <input
            type="radio"
            name="radio"
            value={row.id}
            aria-label="..."
            onChange={onRowSelection}
          />
        </div>
      </div>
    </div>
  );
}

EventRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  row: PropTypes.oneOfType([PropTypes.object]).isRequired,
  select: PropTypes.func.isRequired,
};
