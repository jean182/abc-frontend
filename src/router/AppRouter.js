import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/login/LoginPage";
import EventPage from "../pages/events/EventPage";
import translate from "../helpers/i18n";
import HomePage from "../pages/home/HomePage";
import { fetchUser } from "../redux/modules/auth/session";

export const AppRouter = ({ authorized, getUserInfo, token, user }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authorized);

  useEffect(() => {
    if (token !== null) setIsAuthenticated(true);
    if (token === null) setIsAuthenticated(false);
  }, [token]);

  useEffect(() => {
    if (isEmpty(user) && isAuthenticated) {
      getUserInfo();
    }
  }, [user, getUserInfo, isAuthenticated]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {isAuthenticated ? (
            <Redirect to={translate("routes.home")} />
          ) : (
            <LoginPage isAuthenticated={isAuthenticated} />
          )}
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
  getUserInfo: PropTypes.func.isRequired,
  token: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserInfo: fetchUser,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  token: state.clientReducer.token,
  user: state.sessionReducer.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
