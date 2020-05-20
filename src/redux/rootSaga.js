import { all } from "redux-saga/effects";
import loginWatcher from "./modules/auth/authSaga";
import { eventListWatcherSaga } from "./modules/events/eventList";
import { sessionInfoWatcherSaga } from "./modules/auth/session";
import { userListWatcherSaga } from "./modules/users/userList";
import { questionListWatcherSaga } from "./modules/questions/questionList";

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    eventListWatcherSaga(),
    sessionInfoWatcherSaga(),
    userListWatcherSaga(),
    questionListWatcherSaga(),
  ]);
}
