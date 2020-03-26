import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../redux/modules/auth";

export default function AuthButton(props) {
  const { isAuthenticated } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const terminateSession = () => {
    dispatch({ type: LOGOUT, history });
  };

  return isAuthenticated ? (
    <p>
      <button type="button" onClick={terminateSession}>
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
  isAuthenticated: PropTypes.bool,
};
