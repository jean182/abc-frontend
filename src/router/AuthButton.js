import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../redux/modules/auth/auth";

export default function AuthButton() {
  const history = useHistory();
  const dispatch = useDispatch();

  const terminateSession = () => {
    dispatch({ type: LOGOUT, history });
  };

  return (
    <button
      type="button"
      className="btn btn-link nav-link"
      onClick={terminateSession}
    >
      Sign out
    </button>
  );
}
