import React, { useState } from "react";
import PropTypes from "prop-types";
import { first } from "lodash";
import { useDispatch } from "react-redux";
import HeaderRow from "./HeaderRow";
import EventRow from "./EventRow";
import { setEvent, unsetEvent } from "../../redux/modules/events/event";
import SelectedEvent from "./SelectedEvent";

function EventList(props) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dispatch = useDispatch();
  const { eventList } = props;
  const columns = Object.keys(first(eventList))
    .map((col, index) => {
      return {
        id: index,
        value: col,
      };
    })
    .filter(
      ({ value }) =>
        value !== "id" && value !== "createdAt" && value !== "updatedAt"
    );

  const findMatchingEvent = (id) => {
    const matchingEvent =
      eventList.find((event) => event.id === Number(id)) || null;
    setSelectedEvent(matchingEvent);
    if (matchingEvent !== null) {
      dispatch(unsetEvent());
      dispatch(setEvent(matchingEvent));
    }
  };

  return (
    <>
      <SelectedEvent selectedEvent={selectedEvent} />
      <div className="row table-row title-header text-white bg-primary">
        <div className="col text-center">
          <h3>Administración de eventos</h3>
        </div>
      </div>
      <HeaderRow columns={columns} />
      {eventList.map((event) => {
        return (
          <EventRow
            columns={columns}
            key={event.id}
            row={event}
            select={findMatchingEvent}
          />
        );
      })}
    </>
  );
}

EventList.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
};

export default EventList;
