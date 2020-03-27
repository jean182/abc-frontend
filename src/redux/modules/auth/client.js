import { createSelector } from "reselect";
import { handleActions, createAction } from "redux-actions";

export const SET_CLIENT = "abc-frontend/auth/SET_CLIENT";
export const UNSET_CLIENT = "abc-frontend/auth/UNSET_CLIENT";

export const getInitialState = () => {
  return {
    token: null,
  };
};

// Reducer
const clientReducer = handleActions(
  {
    [SET_CLIENT]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        token: payload,
      };
    },
    [UNSET_CLIENT]: (state) => {
      return {
        ...state,
        token: null,
      };
    },
  },
  getInitialState()
);

export default clientReducer;

// Action Creators

export const setClient = createAction(SET_CLIENT);

export const unsetClient = createAction(UNSET_CLIENT);

const clientSelector = (state) => state.clientReducer;

export const getToken = createSelector(
  clientSelector,
  (client) => client.token
);
