import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";
import { LOGOUT } from "../redux/modules/auth/auth";
import translate from "../helpers/i18n";

export default function AuthButton() {
  const history = useHistory();
  const dispatch = useDispatch();

  const terminateSession = () => {
    dispatch({ type: LOGOUT, history });
  };

  return (
    <button
      type="button"
      className="btn btn-primary btn-block"
      onClick={terminateSession}
    >
      <RiLogoutBoxLine />
      <span className="ml-2">{translate("sidebar.logout")}</span>
    </button>
  );
}
