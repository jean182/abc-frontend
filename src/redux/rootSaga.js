import { all } from "redux-saga/effects";
import loginWatcher from "./modules/auth/authSaga";
import { eventsReducerWatcherSaga } from "./modules/events";

export default function* rootSaga() {
  yield all([loginWatcher(), eventsReducerWatcherSaga()]);
}
