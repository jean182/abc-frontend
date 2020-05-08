import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleActions, createAction } from "redux-actions";
import {
  allUsers,
  createUserRequest,
  deleteUserRequest,
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
export const DELETE_USER = "abc-frontend/usersReducer/DELETE_USER";
export const DELETE_USER_SUCCESS =
  "abc-frontend/usersReducer/DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "abc-frontend/usersReducer/DELETE_USER_FAIL";

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
    [DELETE_USER]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [DELETE_USER_SUCCESS]: (state, action) => {
      const id = action.payload;
      const userList = state.userList.filter((user) => user.id !== id);
      return {
        ...state,
        userList,
        loading: false,
      };
    },
    [DELETE_USER_FAIL]: (state, action) => {
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

export const deleteUser = createAction(DELETE_USER);

export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS);

export const deleteUserFail = createAction(DELETE_USER_FAIL);

// Selectors

export function showUsers(state) {
  const { userList } = state.usersReducer;

  return userList;
}

// Sagas
function* fetchUsersSaga() {
  try {
    const response = yield call(allUsers);
    yield put(fetchUsersSuccess(response));
  } catch (error) {
    yield put(fetchUsersFail(error.message));
  }
}

function* createUserSaga(action) {
  const { user, swal } = action.payload;
  try {
    const response = yield call(createUserRequest, user);
    yield put(createUserSuccess(response));
    yield call([swal, swal.fire], "Listo!", "Creado exitosamente", "success");
  } catch (error) {
    yield put(createUserFail(error.message));
    yield call([swal, swal.fire], "Oops...", error.message, "error");
  }
}

function* updateUserSaga(action) {
  const { user, swal } = action.payload;
  try {
    const { id } = user;
    const response = yield call(updateUserRequest, id, user);
    yield put(updateUserSuccess(response));
    yield call([swal, swal.fire], "Listo!", "Editado exitosamente", "success");
  } catch (error) {
    yield put(updateUserFail(error.message));
    yield call([swal, swal.fire], "Oops...", error.message, "error");
  }
}

function* deleteUserSaga(action) {
  const { id, swal } = action.payload;
  try {
    yield call(deleteUserRequest, id);
    yield put(deleteUserSuccess(id));
    yield call(
      [swal, swal.fire],
      "Listo!",
      "El usuario a sido deshabilitado exitosamente",
      "success"
    );
  } catch (error) {
    yield put(deleteUserFail(error.message));
    yield call([swal, swal.fire], "Oops...", error.message, "error");
  }
}

export function* userListWatcherSaga() {
  yield all([
    takeLatest(FETCH_USERS, fetchUsersSaga),
    takeLatest(CREATE_USER, createUserSaga),
    takeLatest(DELETE_USER, deleteUserSaga),
    takeLatest(UPDATE_USER, updateUserSaga),
  ]);
}
