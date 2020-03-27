import { combineReducers } from "redux";
import authReducer from "./modules/auth";
import clientReducer from "./modules/client";
import eventsReducer from "./modules/events";

export default combineReducers({
  authReducer,
  clientReducer,
  eventsReducer,
});
