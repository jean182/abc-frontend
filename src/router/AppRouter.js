import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AuthButton from "./AuthButton";
import LoginPage from "../pages/login/LoginPage";
import UserPage from "../pages/main/MainPage";

export const AppRouter = ({ authorized, token }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authorized);

  useEffect(() => {
    if (token !== null) setIsAuthenticated(true);
    if (token === null) setIsAuthenticated(false);
  }, [token]);

  return (
    <Router>
      <AuthButton isAuthenticated={isAuthenticated} />
      <ul>
        {!isAuthenticated && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/home">Home</Link>
          </li>
        )}
      </ul>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/home" isAuthenticated={isAuthenticated}>
          <UserPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

AppRouter.defaultProps = {
  authorized: false,
  token: null,
};

AppRouter.propTypes = {
  authorized: PropTypes.bool,
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: state.clientReducer.token,
});

export default connect(mapStateToProps)(AppRouter);
