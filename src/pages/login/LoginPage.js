import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";

function LoginPage({ isAuthenticated }) {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <div className="container h-100 mt-2">
        <div className="row h-100 justify-content-center align-items-center">
          <LoginForm />
        </div>
      </div>
    </>
  );
}

LoginPage.defaultProps = {
  isAuthenticated: false,
};

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default LoginPage;
