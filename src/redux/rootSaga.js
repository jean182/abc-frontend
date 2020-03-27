import { all } from "redux-saga/effects";
import loginWatcher from "./modules/authSaga";
import { eventsReducerWatcherSaga } from "./modules/events";

export default function* rootSaga() {
  yield all([loginWatcher(), eventsReducerWatcherSaga()]);
}
