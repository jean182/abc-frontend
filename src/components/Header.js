import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthButton from "../router/AuthButton";
import Logo from "../assets/logo-with-text.svg";

export default function Header({ isAuthenticated }) {
  return (
    <header className="navbar navbar-expand flex-column flex-md-row bd-navbar">
      <Link
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        to={isAuthenticated ? "/home" : "/"}
      >
        <img src={Logo} alt="logo" width="200" height="50" />
      </Link>
      <ul className="navbar-nav flex-row ml-sm-auto d-md-flex">
        {!isAuthenticated && (
          <li className="nav-item text-nowrap">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li className="nav-item text-nowrap">
            <AuthButton />
          </li>
        )}
      </ul>
    </header>
  );
}

Header.defaultProps = {
  isAuthenticated: false,
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
};
