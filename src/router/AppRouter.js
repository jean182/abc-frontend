import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/login/LoginPage";
import EventPage from "../pages/events/EventPage";
import Header from "../components/Header";
import translate from "../helpers/i18n";
import HomePage from "../pages/home/HomePage";

export const AppRouter = ({ authorized, token }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authorized);

  useEffect(() => {
    if (token !== null) setIsAuthenticated(true);
    if (token === null) setIsAuthenticated(false);
  }, [token]);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Switch>
        <Route path={translate("routes.login")}>
          <LoginPage />
        </Route>
        <PrivateRoute
          path={translate("routes.home")}
          isAuthenticated={isAuthenticated}
        >
          <HomePage />
        </PrivateRoute>
        <PrivateRoute
          path={translate("routes.events")}
          isAuthenticated={isAuthenticated}
        >
          <EventPage />
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
