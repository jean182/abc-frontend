import { all } from "redux-saga/effects";
import loginWatcher from "./modules/auth/authSaga";
import { eventListWatcherSaga } from "./modules/events/eventList";

export default function* rootSaga() {
  yield all([loginWatcher(), eventListWatcherSaga()]);
}
