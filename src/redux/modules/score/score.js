import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleActions, createAction } from "redux-actions";
import { isEmpty } from "lodash";
import {
  createScoreRequest,
  scoreRequest,
  updateScoreRequest,
} from "../../../api/scoreEndpoints";

export const FETCH_SCORE = "abc-frontend/scoreReducer/FETCH_SCORE";
export const FETCH_SCORE_SUCCESS =
  "abc-frontend/scoreReducer/FETCH_SCORE_SUCCESS";
export const FETCH_SCORE_FAIL = "abc-frontend/scoreReducer/FETCH_SCORE_FAIL";
export const CREATE_SCORE = "abc-frontend/scoreReducer/CREATE_SCORE";
export const CREATE_SCORE_SUCCESS =
  "abc-frontend/scoreReducer/CREATE_SCORE_SUCCESS";
export const CREATE_SCORE_FAIL = "abc-frontend/scoreReducer/CREATE_SCORE_FAIL";
export const UPDATE_SCORE = "abc-frontend/scoreReducer/UPDATE_SCORE";
export const UPDATE_SCORE_SUCCESS =
  "abc-frontend/scoreReducer/UPDATE_SCORE_SUCCESS";
export const UPDATE_SCORE_FAIL = "abc-frontend/scoreReducer/UPDATE_SCORE_FAIL";

export const getInitialState = () => {
  return {
    score: {},
    loading: false,
    error: null,
  };
};

// Reducer
const scoreReducer = handleActions(
  {
    [FETCH_SCORE]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [FETCH_SCORE_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      const score = isEmpty(data) ? {} : data;
      console.log(score);
      return {
        ...state,
        score,
        loading: false,
      };
    },
    [FETCH_SCORE_FAIL]: (state, action) => {
      const error = action.payload;
      return {
        ...state,
        error,
        loading: false,
      };
    },
    [CREATE_SCORE]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [CREATE_SCORE_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        score: data,
        loading: false,
      };
    },
    [CREATE_SCORE_FAIL]: (state, action) => {
      const error = action.payload;
      return {
        ...state,
        error,
        loading: false,
      };
    },
    [UPDATE_SCORE]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [UPDATE_SCORE_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        score: data,
        loading: false,
      };
    },
    [UPDATE_SCORE_FAIL]: (state, action) => {
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

export default scoreReducer;

// Action Creators

export const fetchScore = createAction(FETCH_SCORE);

export const fetchScoreSuccess = createAction(FETCH_SCORE_SUCCESS);

export const fetchScoreFail = createAction(FETCH_SCORE_FAIL);

export const createScore = createAction(CREATE_SCORE);

export const createScoreSuccess = createAction(CREATE_SCORE_SUCCESS);

export const createScoreFail = createAction(CREATE_SCORE_FAIL);

export const updateScore = createAction(UPDATE_SCORE);

export const updateScoreSuccess = createAction(UPDATE_SCORE_SUCCESS);

export const updateScoreFail = createAction(UPDATE_SCORE_FAIL);

// Selectors

export const showScore = (state) => state.scoreReducer.score;

// Sagas
export function* fetchScoreSaga(action) {
  const { id, userId } = action.payload;
  try {
    const response = yield call(scoreRequest, id, userId);
    yield put(fetchScoreSuccess(response));
  } catch (error) {
    yield put(fetchScoreFail(error.message));
  }
}

export function* createScoreSaga(action) {
  const { score, swal } = action.payload;
  try {
    const response = yield call(createScoreRequest, score);
    yield put(createScoreSuccess(response));
    yield call([swal, swal.fire], "Listo!", "Creado exitosamente", "success");
  } catch (error) {
    yield put(createScoreFail(error.message));
    yield call([swal, swal.fire], "Oops...", error.message, "error");
  }
}

export function* updateScoreSaga(action) {
  const { id, score, swal } = action.payload;
  try {
    console.log(score);
    const response = yield call(updateScoreRequest, id, score);
    yield put(updateScoreSuccess(response));
    yield call([swal, swal.fire], "Listo!", "Editado exitosamente", "success");
  } catch (error) {
    yield put(updateScoreFail(error.message));
    yield call([swal, swal.fire], "Oops...", error.message, "error");
  }
}

export function* scoreWatcherSaga() {
  yield all([
    takeLatest(FETCH_SCORE, fetchScoreSaga),
    takeLatest(CREATE_SCORE, createScoreSaga),
    takeLatest(UPDATE_SCORE, updateScoreSaga),
  ]);
}
