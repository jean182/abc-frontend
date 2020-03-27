import React, { useState } from "react";
import PropTypes from "prop-types";
import { first } from "lodash";
import HeaderRow from "./HeaderRow";
import EventRow from "./EventRow";

function EventList(props) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { events } = props;
  const columns = Object.keys(first(events))
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
      events.find((event) => event.id === Number(id)) || null;
    setSelectedEvent(matchingEvent);
  };

  return (
    <div className="row-striped">
      {selectedEvent && selectedEvent.description}
      <div className="row table-row title-header text-white bg-primary">
        <div className="col text-center">
          <h3>Administración de eventos</h3>
        </div>
      </div>
      <HeaderRow columns={columns} />
      {events.map((event) => {
        return (
          <EventRow
            columns={columns}
            key={event.id}
            row={event}
            select={findMatchingEvent}
          />
        );
      })}
    </div>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};

export default EventList;
