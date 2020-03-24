import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/login/LoginPage";
import UserPage from "../pages/main/MainPage";

function AuthButton({ isAuthenticated, fakeAuth }) {
  const history = useHistory();

  return isAuthenticated ? (
    <p>
      <button
        type="button"
        onClick={() => {
          fakeAuth.signout(() => history.push("/login"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

AuthButton.defaultProps = {
  isAuthenticated: false,
};

AuthButton.propTypes = {
  fakeAuth: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isAuthenticated: PropTypes.bool,
};

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fakeAuth = {
    authenticate(cb) {
      setIsAuthenticated(true);
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      setIsAuthenticated(false);
      setTimeout(cb, 100);
    },
  };

  return (
    <Router>
      <AuthButton isAuthenticated={isAuthenticated} fakeAuth={fakeAuth} />
      <ul>
        {!isAuthenticated && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      <Switch>
        <Route path="/login">
          <LoginPage fakeAuth={fakeAuth} />
        </Route>
        <PrivateRoute path="/home" isAuthenticated={isAuthenticated}>
          <UserPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default AppRouter;
