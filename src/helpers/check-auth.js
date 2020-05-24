import jwtDecode from "jwt-decode";
import { setClient } from "../redux/modules/auth/client";
import { getAuthToken, removeAuthToken } from "./local-storage";

export default function checkAuthorization({ dispatch }) {
  const token = getAuthToken();

  if (token) {
    const decodedToken = jwtDecode(token);
    const { exp } = decodedToken;

    // if the token has expired return false
    if (Date.now() >= exp * 1000) {
      removeAuthToken();
      return false;
    }

    // otherwise, dispatch the token to our setClient action
    // which will update our redux state with the token and return true
    dispatch(setClient(token));
    return true;
  }

  return false;
}
