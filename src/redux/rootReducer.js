import { combineReducers } from "redux";
import authReducer from "./modules/auth/auth";
import clientReducer from "./modules/auth/client";
import eventsReducer from "./modules/events/eventsReducer";
import filterReducer from "./modules/filters/filters";
import questionReducer from "./modules/questions/questionList";
import scoreReducer from "./modules/score/score";
import sessionReducer from "./modules/auth/session";
import usersReducer from "./modules/users/userList";

export default combineReducers({
  authReducer,
  clientReducer,
  eventsReducer,
  filterReducer,
  questionReducer,
  scoreReducer,
  sessionReducer,
  usersReducer,
});
