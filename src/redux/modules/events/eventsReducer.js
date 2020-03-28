import { combineReducers } from "redux";
import event from "./event";
import eventList from "./eventList";

/* istanbul ignore next */
const eventsReducer = combineReducers({
  event,
  eventList,
});

export default eventsReducer;
