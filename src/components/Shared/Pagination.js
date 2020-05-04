/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { usePagination } from "../../hooks";

const arrow = (type) =>
  type === "next" ? (
    <span aria-hidden="true">&raquo;</span>
  ) : (
    <span aria-hidden="true">&laquo;</span>
  );

function Pagination({ data, itemCount, onChange, resetPagination }) {
  const { items } = usePagination({
    count: Math.ceil(data.length / itemCount, 10),
    onChange,
    reset: resetPagination,
  });

  return (
    <nav aria-label="Paginator">
      <ul className="pagination">
        {items.map(({ page, type, selected, disabled, ...item }, index) => {
          let children;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = <span className="mx-2">...</span>;
          } else if (type === "page") {
            children = (
              <a type="button" className="page-link" {...item}>
                {page}
              </a>
            );
          } else {
            children = (
              <a className="page-link" type="button" {...item}>
                {arrow(type)}
              </a>
            );
          }

          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`page-item ${disabled ? "disabled" : ""} ${
                selected ? "active" : ""
              }`}
            >
              {children}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

Pagination.defaultProps = {
  resetPagination: false,
};

Pagination.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ).isRequired,
  itemCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  resetPagination: PropTypes.bool,
};

export default Pagination;
