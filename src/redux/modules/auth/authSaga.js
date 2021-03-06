import { cancel, cancelled, call, fork, put, take } from "redux-saga/effects";
import axiosConfig from "../../../api/config";
import { UNSET_CLIENT, setClient, unsetClient } from "./client";
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./auth";
import { clearUserData } from "./session";
import { loginUserRequest } from "../../../api/userEndpoints";
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
} from "../../../helpers/local-storage";
import translate from "../../../helpers/i18n";

function* logout(history) {
  yield put(clearUserData());
  yield put(unsetClient());
  yield call(removeAuthToken);
  history.push("/");
}

function* loginFlow(email, password, history, from) {
  let token;
  try {
    const request = { auth: { email, password } };
    const { data } = yield call(loginUserRequest, request);
    token = data.jwt;
    setAuthToken(token);
    yield put(setClient(token));

    yield put({ type: LOGIN_SUCCESS });

    axiosConfig.interceptors.request.use((config) => {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = token ? `Bearer ${token}` : "";

      return config;
    });

    history.replace(from);
  } catch (error) {
    yield put({ type: LOGIN_FAIL, error, history });
  } finally {
    if (yield cancelled()) {
      history.push(translate("routes.login"));
    }
  }

  return token;
}

function* loginWatcher() {
  while (true) {
    const token = yield call(getAuthToken);
    let task = null;
    if (!token) {
      const { payload } = yield take(LOGIN);
      const { email, password, history, from } = payload;

      task = yield fork(loginFlow, email, password, history, from);
    }

    axiosConfig.interceptors.request.use((config) => {
      const currentToken = getAuthToken();
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = currentToken
        ? `Bearer ${currentToken}`
        : "";

      return config;
    });

    const action = yield take([UNSET_CLIENT, LOGIN_FAIL, LOGOUT]);

    if (action.type === UNSET_CLIENT && task !== null) yield cancel(task);

    yield call(logout, action.history);
  }
}

export default loginWatcher;
