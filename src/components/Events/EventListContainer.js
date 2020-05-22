import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import {
  fetchEvents,
  eventListFilterSelector,
} from "../../redux/modules/events/eventList";
import { showEvent } from "../../redux/modules/events/event";
import Loading from "../Shared/Loading";
import EventList from "./EventList";
import ReduxEventListFilters from "./EventListFilters";
import t from "../../helpers/i18n";
import { SelectedEvent } from "./SelectedEvent";

export function EventListContainer(props) {
  const {
    eventList,
    error,
    getEvents,
    loading,
    reduxEventList,
    selectedEvent,
  } = props;

  useEffect(() => {
    if (isEmpty(reduxEventList)) {
      getEvents();
    }
  }, [reduxEventList, getEvents]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <>
      <SelectedEvent selectedEvent={selectedEvent} />
      <ReduxEventListFilters />
      {isEmpty(eventList) ? (
        <div className="row align-rows-center table-row p-2 my-3 my-sm-0 table-row">
          <div className="col-sm my-1 my-sm-0">
            <span className="font-weight-bold">{t("noData")}</span>
          </div>
        </div>
      ) : (
        <EventList eventList={eventList} />
      )}
    </>
  );
}

EventListContainer.defaultProps = {
  eventList: [],
  error: null,
  reduxEventList: [],
};

EventListContainer.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  error: PropTypes.string,
  getEvents: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reduxEventList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  selectedEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getEvents: fetchEvents,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  eventList: eventListFilterSelector(state, state.filterReducer),
  error: state.eventsReducer.eventList.error,
  loading: state.eventsReducer.eventList.loading,
  reduxEventList: state.eventsReducer.eventList.events,
  selectedEvent: showEvent(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);
