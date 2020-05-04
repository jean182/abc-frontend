import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleActions, createAction } from "redux-actions";
import {
  allUsers,
  createUserRequest,
  updateUserRequest,
} from "../../../api/userEndpoints";

export const FETCH_USERS = "abc-frontend/usersReducer/FETCH_USERS";
export const FETCH_USERS_SUCCESS =
  "abc-frontend/usersReducer/FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAIL = "abc-frontend/usersReducer/FETCH_USERS_FAIL";
export const CREATE_USER = "abc-frontend/usersReducer/CREATE_USER";
export const CREATE_USER_SUCCESS =
  "abc-frontend/usersReducer/CREATE_USER_SUCCESS";
export const CREATE_USER_FAIL = "abc-frontend/usersReducer/CREATE_USER_FAIL";
export const UPDATE_USER = "abc-frontend/usersReducer/UPDATE_USER";
export const UPDATE_USER_SUCCESS =
  "abc-frontend/usersReducer/UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "abc-frontend/usersReducer/UPDATE_USER_FAIL";

export const getInitialState = () => {
  return {
    userList: [],
    loading: false,
    error: null,
  };
};

// Reducer
const usersReducer = handleActions(
  {
    [FETCH_USERS]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [FETCH_USERS_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        userList: data,
        loading: false,
      };
    },
    [FETCH_USERS_FAIL]: (state, action) => {
      const error = action.payload;
      return {
        ...state,
        error,
        loading: false,
      };
    },
    [CREATE_USER]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [CREATE_USER_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      const userList = [...state.userList, data];
      return {
        ...state,
        userList,
        loading: false,
      };
    },
    [CREATE_USER_FAIL]: (state, action) => {
      const error = action.payload;
      return {
        ...state,
        error,
        loading: false,
      };
    },
    [UPDATE_USER]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [UPDATE_USER_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      const userList = state.userList.map((user) => {
        if (user.id === data.id) {
          return data;
        }
        return user;
      });
      return {
        ...state,
        userList,
        loading: false,
      };
    },
    [UPDATE_USER_FAIL]: (state, action) => {
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

export default usersReducer;

// Action Creators

export const fetchUsers = createAction(FETCH_USERS);

export const fetchUsersSuccess = createAction(FETCH_USERS_SUCCESS);

export const fetchUsersFail = createAction(FETCH_USERS_FAIL);

export const createUser = createAction(CREATE_USER);

export const createUserSuccess = createAction(CREATE_USER_SUCCESS);

export const createUserFail = createAction(CREATE_USER_FAIL);

export const updateUser = createAction(UPDATE_USER);

export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS);

export const updateUserFail = createAction(UPDATE_USER_FAIL);

// Selectors

export function showUsers(state) {
  const { userList } = state.usersReducer;

  return userList;
}

// Sagas
export function* fetchUsersSaga() {
  try {
    const response = yield call(allUsers);
    yield put(fetchUsersSuccess(response));
  } catch (error) {
    yield put(fetchUsersFail(error.message));
  }
}

export function* createUserSaga(action) {
  try {
    const user = action.payload;
    const response = yield call(createUserRequest, user);
    yield put(createUserSuccess(response));
  } catch (error) {
    yield put(createUserFail(error.message));
  }
}

export function* updateUserSaga(action) {
  try {
    const user = action.payload;
    const { id } = user;
    const response = yield call(updateUserRequest, id, user);
    yield put(updateUserSuccess(response));
  } catch (error) {
    yield put(updateUserFail(error.message));
  }
}

export function* userListWatcherSaga() {
  yield all([
    takeLatest(FETCH_USERS, fetchUsersSaga),
    takeLatest(CREATE_USER, createUserSaga),
    takeLatest(UPDATE_USER, updateUserSaga),
  ]);
}
