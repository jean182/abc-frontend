import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchEvents, showEvents } from "../../redux/modules/events";
import Loading from "../Shared/Loading";
import EventList from "./EventList";

function EventListContainer(props) {
  const { events, error, getEvents, loading } = props;

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  if (loading) return <Loading />;
  if (error) return <Loading />;
  if (events.length > 0) return <EventList events={events} />;
  return null;
}

EventListContainer.defaultProps = {
  events: [],
  error: null,
  loading: false,
};

EventListContainer.propTypes = {
  events: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
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
  events: showEvents(state),
  error: state.eventsReducer.error,
  loading: state.eventsReducer.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);
