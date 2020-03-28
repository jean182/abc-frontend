import { handleActions, createAction } from "redux-actions";

export const SET_EVENT = "abc-frontend/eventReducer/SET_EVENT";
export const UNSET_EVENT = "abc-frontend/eventReducer/UNSET_EVENT";

export const getInitialState = () => {
  return {
    event: {},
  };
};

// Reducer
const eventReducer = handleActions(
  {
    [SET_EVENT]: (state, action) => {
      const event = action.payload;
      return {
        ...state,
        event,
      };
    },
    [UNSET_EVENT]: (state) => {
      return {
        ...state,
        event: {},
      };
    },
  },
  getInitialState()
);

export default eventReducer;

// Action Creators

export const setEvent = createAction(SET_EVENT);

export const unsetEvent = createAction(UNSET_EVENT);

// Selectors

export function showEvent(state) {
  const { event } = state.eventsReducer.event;

  return event;
}
