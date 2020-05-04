import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleActions, createAction } from "redux-actions";
import { currentUser } from "../../../api/userEndpoints";

export const FETCH_USER = "abc-frontend/eventReducer/FETCH_USER";
export const FETCH_USER_SUCCESS =
  "abc-frontend/eventReducer/FETCH_USER_SUCCESS";
export const FETCH_USER_FAIL = "abc-frontend/eventReducer/FETCH_USER_FAIL";

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
  },
  getInitialState()
);

export default userReducer;

// Action Creators

export const fetchUser = createAction(FETCH_USER);

export const fetchUserSuccess = createAction(FETCH_USER_SUCCESS);

export const fetchUserFail = createAction(FETCH_USER_FAIL);

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
