import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../../components/LoginForm";
import Logo from "../../assets/logo-with-text.svg";

function LoginPage({ fakeAuth }) {
  return (
    <div>
      <img src={Logo} alt="logo" width="200" height="50" />

      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <LoginForm fakeAuth={fakeAuth} />
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  fakeAuth: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default LoginPage;
