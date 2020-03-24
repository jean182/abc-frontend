import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) => {
        return isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

PrivateRoute.defaultProps = {
  isAuthenticated: false,
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool,
};
