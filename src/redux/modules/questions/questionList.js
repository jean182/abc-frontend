import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleActions, createAction } from "redux-actions";
import { createSelector } from "reselect";
import { riskFactorsRequest } from "../../../api/scoreEndpoints";

export const FETCH_QUESTIONS = "abc-frontend/questionsReducer/FETCH_QUESTIONS";
export const FETCH_QUESTIONS_SUCCESS =
  "abc-frontend/questionsReducer/FETCH_QUESTIONS_SUCCESS";
export const FETCH_QUESTIONS_FAIL =
  "abc-frontend/questionsReducer/FETCH_QUESTIONS_FAIL";

export const getInitialState = () => {
  return {
    questionList: [],
    loading: false,
    error: null,
  };
};

// Reducer
const questionsReducer = handleActions(
  {
    [FETCH_QUESTIONS]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [FETCH_QUESTIONS_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        questionList: data,
        loading: false,
      };
    },
    [FETCH_QUESTIONS_FAIL]: (state, action) => {
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

export default questionsReducer;

// Action Creators

export const fetchQuestions = createAction(FETCH_QUESTIONS);

export const fetchQuestionsSuccess = createAction(FETCH_QUESTIONS_SUCCESS);

export const fetchQuestionsFail = createAction(FETCH_QUESTIONS_FAIL);

// Selectors

const showQuestions = (state) => state.questionReducer.questionList;

export const impactQuestionList = createSelector(
  [showQuestions],
  (questionList) =>
    questionList.filter(
      (impactQuestion) => impactQuestion.scoreType === "impact"
    )
);

export const probabilityQuestionList = createSelector(
  [showQuestions],
  (questionList) =>
    questionList.filter(
      (probabilityQuestion) => probabilityQuestion.scoreType === "probability"
    )
);

// Sagas
function* fetchQuestionsSaga() {
  try {
    const response = yield call(riskFactorsRequest);
    yield put(fetchQuestionsSuccess(response));
  } catch (error) {
    yield put(fetchQuestionsFail(error.message));
  }
}

export function* questionListWatcherSaga() {
  yield all([takeLatest(FETCH_QUESTIONS, fetchQuestionsSaga)]);
}
