import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleActions, createAction } from "redux-actions";
import { currentUser } from "../../../api/userEndpoints";

export const FETCH_USER = "abc-frontend/sessionReducer/FETCH_USER";
export const FETCH_USER_SUCCESS =
  "abc-frontend/sessionReducer/FETCH_USER_SUCCESS";
export const FETCH_USER_FAIL = "abc-frontend/sessionReducer/FETCH_USER_FAIL";
export const CLEAR_USER_DATA = "abc-frontend/sessionReducer/CLEAR_USER_DATA";

export const getInitialState = () => {
  return {
    user: {},
    loading: false,
    error: null,
  };
};

// Reducer
const userReducer = handleActions(
  {
    [FETCH_USER]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [FETCH_USER_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        user: data,
        loading: false,
      };
    },
    [FETCH_USER_FAIL]: (state, action) => {
      const error = action.payload;
      return {
        ...state,
        error,
        loading: false,
      };
    },
    [CLEAR_USER_DATA]: (state) => {
      return {
        ...state,
        user: {},
        loading: false,
        error: null,
      };
    },
  },
  getInitialState()
);

export default userReducer;

// Action Creators

export const fetchUser = createAction(FETCH_USER);

export const fetchUserSuccess = createAction(FETCH_USER_SUCCESS);

export const fetchUserFail = createAction(FETCH_USER_FAIL);

export const clearUserData = createAction(CLEAR_USER_DATA);

// Selectors

export function getUserSession(state) {
  const { events } = state.sessionReducer.user;

  return events;
}

// Sagas
export function* fetchUserSaga() {
  try {
    const response = yield call(currentUser);
    yield put(fetchUserSuccess(response));
  } catch (error) {
    yield put(fetchUserFail(error.message));
  }
}

export function* sessionInfoWatcherSaga() {
  yield all([takeLatest(FETCH_USER, fetchUserSaga)]);
}
