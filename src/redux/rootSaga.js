import { all } from "redux-saga/effects";
import loginWatcher from "./modules/auth/authSaga";
import { eventListWatcherSaga } from "./modules/events/eventList";
import { sessionInfoWatcherSaga } from "./modules/auth/session";

export default function* rootSaga() {
  yield all([loginWatcher(), eventListWatcherSaga(), sessionInfoWatcherSaga()]);
}
