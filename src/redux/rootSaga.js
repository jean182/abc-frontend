import { all } from "redux-saga/effects";
import loginWatcher from "./modules/authSaga";

export default function* rootSaga() {
  yield all([loginWatcher()]);
}
