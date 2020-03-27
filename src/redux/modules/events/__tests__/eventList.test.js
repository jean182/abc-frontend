import { takeLatest } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import * as api from "../../../../api/eventsEndpoints";
import eventListReducer, {
  FETCH_EVENTS,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
  fetchEventsSuccess,
  fetchEventsFail,
  showEvents,
  fetchEventsSaga,
  eventsReducerWatcherSaga,
} from "../eventList";

const events = [
  {
    id: 8,
    file_number: 20861,
    description:
      "Exp. 20.861: Adición de los artículos 36 bis, 53 inciso g, h y reforma del artículo 63 de la Ley No. 7472, de la Promoción de la Competencia y Defensa Efectiva del Consumidor, del 20 de diciembre 1994, publicada en la Gaceta No. 14 de 19 de enero de 1995",
    procedure_type: "Ordinario antes de reforma",
    vote_type: "Mayoria simple",
    proposed_by: "David Gourzong, Welmer Ramos y otros",
    approval_date: null,
    state: "Pendiente",
    created_at: "2019-10-15T17:31:22.000Z",
    updated_at: "2020-03-03T18:13:59.000Z",
  },
  {
    id: 9,
    file_number: 21177,
    description:
      "Exp. 21.177: Ley para determinar las comisiones de intercambio y adquirencia por las transacciones de compra con tarjetas de crédito y débito",
    procedure_type: "Ordinario antes de reforma",
    vote_type: "Mayoria simple",
    proposed_by: "Welmer Ramos",
    approval_date: null,
    state: "Pendiente",
    created_at: "2019-10-15T17:33:18.000Z",
    updated_at: "2020-03-03T18:13:59.000Z",
  },
];

const initialState = {
  events: [],
  loading: false,
  error: null,
};

// Reducer tests

describe("reducers", () => {
  describe("eventList", () => {
    let updatedState = {};
    it("provides the initial state", () => {
      expect(eventListReducer(undefined, {})).toEqual(initialState);
    });

    it("handles FETCH_EVENTS action", () => {
      updatedState = {
        loading: true,
      };
      expect(eventListReducer({}, { type: FETCH_EVENTS })).toEqual(
        updatedState
      );
    });

    it("handles FETCH_EVENTS_SUCCESS action", () => {
      updatedState = { ...initialState, events };
      expect(
        eventListReducer(
          { ...initialState, loading: true },
          {
            type: FETCH_EVENTS_SUCCESS,
            /*
            In this case the payload received is the response from the server
            data is the only attribute because it's the only one being taken
            from the response
            */
            payload: {
              data: events,
            },
          }
        )
      ).toEqual(updatedState);
    });

    it("handles FETCH_EVENTS_FAIL action", () => {
      updatedState = {
        ...initialState,
        error: "Request failed with status code 404",
      };
      expect(
        eventListReducer(
          { ...initialState, loading: true },
          {
            type: FETCH_EVENTS_FAIL,
            payload: "Request failed with status code 404",
          }
        )
      ).toEqual(updatedState);
    });
  });
});

describe("selectors", () => {
  const state = {
    eventsReducer: {
      ...initialState,
      events,
    },
  };
  describe("#showEvents", () => {
    describe("When events correctly load", () => {
      it("displays the list of events", () => {
        expect(showEvents(state)).toEqual(events);
      });
    });

    describe("When events are not present", () => {
      const wrongState = { dashboards: [] };
      it("throws an undefined type error", () => {
        expect(() => showEvents(wrongState)).toThrow(TypeError);
      });
    });
  });
});

describe("sagas", () => {
  describe("#fetchEventsSaga", () => {
    describe("Integration testing", () => {
      it("provides a value for the API call", () => {
        return expectSaga(fetchEventsSaga)
          .withReducer(eventListReducer)
          .provide([[matchers.call.fn(api.getEvents), { data: events }]])
          .put(fetchEventsSuccess({ data: events }))
          .hasFinalState({ ...initialState, events })
          .run();
      });

      it("provides a error for the API call", () => {
        const error = new Error("error");
        return expectSaga(fetchEventsSaga)
          .withReducer(eventListReducer)
          .provide([[matchers.call.fn(api.getEvents), throwError(error)]])
          .put(fetchEventsFail("error"))
          .hasFinalState({
            ...initialState,
            error: "error",
          })
          .run();
      });
    });

    describe("Unit testing", () => {
      let saga = testSaga(fetchEventsSaga);
      it("fetches dashboards", () => {
        saga
          .next()
          .call(api.getEvents)

          .next()
          .put(fetchEventsSuccess())

          .next()
          .isDone();
      });

      it("throws an error", () => {
        const error = new Error("error");
        saga = testSaga(fetchEventsSaga);
        saga
          .next()

          .throw(error)
          .put(fetchEventsFail("error"))

          .next()
          .isDone();
      });
    });
  });

  describe("eventsReducerWatcherSaga", () => {
    describe("Unit testing", () => {
      it("watches all the redux actions linked to event watcher saga", () => {
        const saga = testSaga(eventsReducerWatcherSaga);
        saga.next().all([takeLatest(FETCH_EVENTS, fetchEventsSaga)]);
        saga.next().isDone();
      });
    });
  });
});
