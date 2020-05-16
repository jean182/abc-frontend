import React from "react";
import PropTypes from "prop-types";
import t from "../../../helpers/i18n";
import Tooltip from "../Tooltip";

export default function TableRow({ columns, dataItem, row, select, selected }) {
  const onRowSelectionClick = () => {
    select(row.id);
  };

  const onRowSelectionKeyPress = (event) => {
    if (event.key === "Enter") select(row.id);
  };

  const parseValue = (key, value) => {
    switch (key) {
      case "procedureType":
        return t(`eventsEnum.${key}.${value}`);
      case "voteType":
        return t(`eventsEnum.${key}.${value}`);
      case "state":
        return t(`eventsEnum.${key}.${value}`);
      case "stage":
        return t(`eventsEnum.${key}.${value}`);
      default:
        return value;
    }
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
        const isDescription = value === "description";
        const translatedValue = t(`table.${dataItem}.${value}`);
        if (isDescription) {
          return (
            <div key={`${value}-${row.id}`} className="col-sm my-1 my-sm-0">
              <span className="d-sm-none font-weight-bold">
                {`${translatedValue}: `}
              </span>
              <div className="d-none d-md-block">
                <Tooltip description={row[value]} />
              </div>
              <div className="d-md-none">{row[value]}</div>
            </div>
          );
        }
        return (
          <div key={`${value}-${row.id}`} className="col-sm my-1 my-sm-0">
            <span className="d-sm-none font-weight-bold">
              {`${translatedValue}: `}
            </span>
            {parseValue(value, row[value])}
          </div>
        );
      })}
    </div>
  );
}

TableRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  dataItem: PropTypes.string.isRequired,
  row: PropTypes.oneOfType([PropTypes.object]).isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};
