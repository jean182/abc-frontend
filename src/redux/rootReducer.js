import { combineReducers } from "redux";
import authReducer from "./modules/auth";
import clientReducer from "./modules/client";

export default combineReducers({
  authReducer,
  clientReducer,
});
