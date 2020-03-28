import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { fetchEvents, showEvents } from "../../redux/modules/events/eventList";
import Loading from "../Shared/Loading";
import EventList from "./EventList";
import t from "../../helpers/i18n";

export function EventListContainer(props) {
  const { eventList, error, getEvents, loading } = props;

  useEffect(() => {
    if (isEmpty(eventList)) {
      getEvents();
    }
  }, [eventList, getEvents]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (eventList.length > 0) return <EventList eventList={eventList} />;
  return <div>{t("noData")}</div>;
}

EventListContainer.defaultProps = {
  eventList: [],
  error: null,
  loading: false,
};

EventListContainer.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  error: PropTypes.string,
  getEvents: PropTypes.func.isRequired,
  loading: PropTypes.bool,
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
  eventList: showEvents(state),
  error: state.eventsReducer.error,
  loading: state.eventsReducer.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);
