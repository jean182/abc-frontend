import { all } from "redux-saga/effects";
import loginWatcher from "./modules/auth/authSaga";
import { eventListWatcherSaga } from "./modules/events/eventList";
import { sessionInfoWatcherSaga } from "./modules/auth/session";
import { userListWatcherSaga } from "./modules/users/userList";

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    eventListWatcherSaga(),
    sessionInfoWatcherSaga(),
    userListWatcherSaga(),
  ]);
}
