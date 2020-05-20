import { all } from "redux-saga/effects";
import loginWatcher from "./modules/auth/authSaga";
import { eventListWatcherSaga } from "./modules/events/eventList";
import { questionListWatcherSaga } from "./modules/questions/questionList";
import { scoreWatcherSaga } from "./modules/score/score";
import { sessionInfoWatcherSaga } from "./modules/auth/session";
import { userListWatcherSaga } from "./modules/users/userList";

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    eventListWatcherSaga(),
    questionListWatcherSaga(),
    scoreWatcherSaga(),
    sessionInfoWatcherSaga(),
    userListWatcherSaga(),
  ]);
}
