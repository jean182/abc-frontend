import { handleActions, createAction } from "redux-actions";

const SET_TEXT_FILTER = "abc-frontend/filters/SET_TEXT_FILTER";
const FILTER_BY_STAGE = "abc-frontend/filters/FILTER_BY_STAGE";
const FILTER_BY_DATE = "abc-frontend/filters/FILTER_BY_DATE";
const FILTER_IF_HAS_DATE = "abc-frontend/filters/FILTER_IF_HAS_DATE";

const getInitialState = () => {
  return {
    text: "",
    stage: ["pending", "commission", "plenary"],
    approvalDate: [],
    "approvalDate?": [true, false],
  };
};

// Reducer
const filtersReducer = handleActions(
  {
    [SET_TEXT_FILTER]: (state, action) => {
      return {
        ...state,
        text: action.payload,
      };
    },
    [FILTER_BY_STAGE]: (state, action) => {
      const value = action.payload;
      const stages = value.split(",");
      return {
        ...state,
        stage: stages,
      };
    },
    [FILTER_BY_DATE]: (state, action) => {
      const value = action.payload;
      return {
        ...state,
        approvalDate: value,
      };
    },
    [FILTER_IF_HAS_DATE]: (state, action) => {
      const value = action.payload;
      return {
        ...state,
        "approvalDate?": value,
      };
    },
  },
  getInitialState()
);

export default filtersReducer;

// Action Creators

export const filterByText = createAction(SET_TEXT_FILTER);

export const filterByStage = createAction(FILTER_BY_STAGE);

export const filterByDate = createAction(FILTER_BY_DATE);

export const filterByIfHasDate = createAction(FILTER_IF_HAS_DATE);
