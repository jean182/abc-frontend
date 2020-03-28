import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleActions, createAction } from "redux-actions";
import { getEvents } from "../../../api/eventsEndpoints";

export const FETCH_EVENTS = "abc-frontend/eventReducer/FETCH_EVENTS";
export const FETCH_EVENTS_SUCCESS =
  "abc-frontend/eventReducer/FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAIL = "abc-frontend/eventReducer/FETCH_EVENTS_FAIL";

export const getInitialState = () => {
  return {
    events: [],
    loading: false,
    error: null,
  };
};

// Reducer
const eventReducer = handleActions(
  {
    [FETCH_EVENTS]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [FETCH_EVENTS_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        events: data,
        loading: false,
      };
    },
    [FETCH_EVENTS_FAIL]: (state, action) => {
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

export default eventReducer;

// Action Creators

export const fetchEvents = createAction(FETCH_EVENTS);

export const fetchEventsSuccess = createAction(FETCH_EVENTS_SUCCESS);

export const fetchEventsFail = createAction(FETCH_EVENTS_FAIL);

// Selectors

export function showEvents(state) {
  const { events } = state.eventsReducer.eventList;

  return events;
}

// Sagas
export function* fetchEventsSaga() {
  try {
    const response = yield call(getEvents);
    yield put(fetchEventsSuccess(response));
  } catch (error) {
    yield put(fetchEventsFail(error.message));
  }
}

export function* eventListWatcherSaga() {
  yield all([takeLatest(FETCH_EVENTS, fetchEventsSaga)]);
}
