import { combineReducers } from "redux";
import authReducer from "./modules/auth/auth";
import clientReducer from "./modules/auth/client";
import eventsReducer from "./modules/events";

export default combineReducers({
  authReducer,
  clientReducer,
  eventsReducer,
});
