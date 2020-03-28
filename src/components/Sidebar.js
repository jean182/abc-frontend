import React, { useState } from "react";
import PropTypes from "prop-types";

function Sidebar({ children }) {
  const [toggle, setToggle] = useState(false);
  const [collapsedNav, setCollapsedNav] = useState("collapse");
  const handleClick = () => {
    setCollapsedNav("collapsing");
    setToggle((currenToggleState) => !currenToggleState);
    setCollapsedNav("collapse");
  };

  const collapsedButton = toggle ? "" : "collapsed";
  const show = toggle ? "show" : "";
  return (
    <div className="col-12 col-md-2 col-xl-2 bd-sidebar">
      <div className="d-flex justify-content-center align-items-center d-md-none my-3">
        <button
          className={`btn btn-link bd-search-docs-toggle d-md-none p-0 ml-3 ${collapsedButton}`}
          onClick={handleClick}
          type="button"
          data-toggle="collapse"
          data-target="#sidebar-abc"
          aria-controls="sidebar-abc"
          aria-expanded={toggle}
          aria-label="Toggle docs navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            role="img"
            focusable="false"
          >
            <title>Menu</title>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M4 7h22M4 15h22M4 23h22"
            />
          </svg>
        </button>
      </div>
      <nav
        className={`bd-links ${collapsedNav} ${show}`}
        id="sidebar-abc"
        aria-label="Main navigation"
      >
        {children}
      </nav>
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
