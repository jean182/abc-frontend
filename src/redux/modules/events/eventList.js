import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleActions, createAction } from "redux-actions";
import {
  createEventRequest,
  getEvents,
  updateEventRequest,
} from "../../../api/eventsEndpoints";
import { setEvent } from "./event";

export const FETCH_EVENTS = "abc-frontend/eventReducer/FETCH_EVENTS";
export const FETCH_EVENTS_SUCCESS =
  "abc-frontend/eventReducer/FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAIL = "abc-frontend/eventReducer/FETCH_EVENTS_FAIL";
export const CREATE_EVENT = "abc-frontend/eventReducer/CREATE_EVENT";
export const CREATE_EVENT_SUCCESS =
  "abc-frontend/eventReducer/CREATE_EVENT_SUCCESS";
export const CREATE_EVENT_FAIL = "abc-frontend/eventReducer/CREATE_EVENT_FAIL";
export const UPDATE_EVENT = "abc-frontend/eventReducer/UPDATE_EVENT";
export const UPDATE_EVENT_SUCCESS =
  "abc-frontend/eventReducer/UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAIL = "abc-frontend/eventReducer/UPDATE_EVENT_FAIL";

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
    [CREATE_EVENT]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [CREATE_EVENT_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      const events = [...state.events, data];
      return {
        ...state,
        events,
        loading: false,
      };
    },
    [CREATE_EVENT_FAIL]: (state, action) => {
      const error = action.payload;
      return {
        ...state,
        error,
        loading: false,
      };
    },
    [UPDATE_EVENT]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [UPDATE_EVENT_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      const events = state.events.map((event) => {
        if (event.id === data.id) {
          return data;
        }
        return event;
      });
      return {
        ...state,
        events,
        loading: false,
      };
    },
    [UPDATE_EVENT_FAIL]: (state, action) => {
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

export const createEvent = createAction(CREATE_EVENT);

export const createEventSuccess = createAction(CREATE_EVENT_SUCCESS);

export const createEventFail = createAction(CREATE_EVENT_FAIL);

export const updateEvent = createAction(UPDATE_EVENT);

export const updateEventSuccess = createAction(UPDATE_EVENT_SUCCESS);

export const updateEventFail = createAction(UPDATE_EVENT_FAIL);

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

export function* createEventSaga(action) {
  const { event, swal } = action.payload;
  try {
    const response = yield call(createEventRequest, event);
    yield put(createEventSuccess(response));
    swal.fire("Listo!", "Creado exitosamente", "success");
  } catch (error) {
    yield put(createEventFail(error.message));
    swal.fire("Oops...", error.message, "error");
  }
}

export function* updateEventSaga(action) {
  const { event, swal } = action.payload;
  try {
    const { id } = event;
    const response = yield call(updateEventRequest, id, event);
    yield put(updateEventSuccess(response));
    yield put(setEvent(response.data));
    swal.fire("Listo!", "Editado exitosamente", "success");
  } catch (error) {
    yield put(updateEventFail(error.message));
    swal.fire("Oops...", error.message, "error");
  }
}

export function* eventListWatcherSaga() {
  yield all([
    takeLatest(FETCH_EVENTS, fetchEventsSaga),
    takeLatest(CREATE_EVENT, createEventSaga),
    takeLatest(UPDATE_EVENT, updateEventSaga),
  ]);
}
