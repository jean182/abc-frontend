import React from "react";
import PropTypes from "prop-types";
import HeaderColumn from "./HeaderColumn";

export default function HeaderRow({ columns, handleSort, sortValue }) {
  return (
    <div className="row table-row header text-white hide-col">
      {columns.map((column) => (
        <HeaderColumn
          key={column.id}
          column={column}
          onHeaderClick={handleSort}
          sortValue={sortValue}
        />
      ))}
    </div>
  );
}

HeaderRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  handleSort: PropTypes.func.isRequired,
  sortValue: PropTypes.string.isRequired,
};
