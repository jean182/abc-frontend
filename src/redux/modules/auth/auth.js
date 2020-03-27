import { handleActions, createAction } from "redux-actions";

export const LOGIN = "abc-frontend/auth/LOGIN";
export const LOGIN_SUCCESS = "abc-frontend/auth/LOGIN_SUCCESS";
export const LOGIN_FAIL = "abc-frontend/auth/LOGIN_FAIL";
export const LOGOUT = "abc-frontend/auth/LOGOUT";
export const LOGOUT_SUCCESS = "abc-frontend/auth/LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "abc-frontend/auth/LOGOUT_FAIL";

export const getInitialState = () => {
  return {
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
  };
};

// Reducer
const authReducer = handleActions(
  {
    [LOGIN]: (state) => {
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: "Logging in..." }],
        errors: [],
      };
    },
    [LOGIN_SUCCESS]: (state) => {
      return {
        ...state,
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      };
    },
    [LOGIN_FAIL]: (state, action) => {
      return {
        ...state,
        errors: state.errors.concat([
          {
            body: action.error.toString(),
          },
        ]),
        messages: [],
        requesting: false,
        successful: false,
      };
    },
    [LOGOUT]: (state) => {
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: [],
      };
    },
  },
  getInitialState()
);

export default authReducer;

// Action Creators

export const login = createAction(LOGIN);

export const loginSucceed = createAction(LOGIN_SUCCESS);

export const loginFail = createAction(LOGIN_FAIL);

export const logout = createAction(LOGOUT);
