import React from "react";
import PropTypes from "prop-types";
import t from "../../helpers/i18n";

export default function HeaderRow({ columns }) {
  return (
    <div className="row table-row header text-white hide-col">
      {columns.map((column) => (
        <div key={column.id} className="col">
          {t(`table.events.${column.value}`)}
        </div>
      ))}
      <div className="col">{t("table.events.selection")}</div>
    </div>
  );
}

HeaderRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
};
