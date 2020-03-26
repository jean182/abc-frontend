import { delay, put } from "redux-saga/effects";
import jwtDecode from "jwt-decode";
import { LOGOUT } from "./auth";

export default function* expiration(token) {
  const expirationTime = new Date(0);
  expirationTime.setUTCSeconds(jwtDecode(token).exp);
  const currentTime = new Date();
  const remainingTime = expirationTime - currentTime;
  yield delay(remainingTime);
  yield put(LOGOUT);
}
