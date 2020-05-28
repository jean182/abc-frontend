import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { first, isEmpty, orderBy } from "lodash";
import HeaderRow from "../Shared/Table/HeaderRow";
import TableRow from "../Shared/Table/TableRow";
import { setEvent, unsetEvent } from "../../redux/modules/events/event";

function EventList(props) {
  const { eventList, selectedEvent } = props;
  const [selectedRow, setSelectedRow] = useState(
    isEmpty(selectedEvent) ? 0 : selectedEvent.id
  );
  const [sortValue, setSortValue] = useState({
    value: "id",
    orderType: "asc",
  });
  const dispatch = useDispatch();
  const columns = Object.keys(first(eventList))
    .map((col, index) => {
      return {
        id: index,
        value: col,
      };
    })
    .filter(
      ({ value }) =>
        value !== "id" &&
        value !== "createdAt" &&
        value !== "updatedAt" &&
        value !== "approvalDate?" &&
        value !== "impactAverage" &&
        value !== "probabilityAverage" &&
        value !== "evaluationIds" &&
        value !== "state"
    );

  const handleSort = (value) => {
    if (value.orderType !== "") {
      setSortValue(value);
    } else {
      setSortValue({
        value: "id",
        orderType: "asc",
      });
    }
  };

  const findMatchingEvent = (id) => {
    const matchingEvent =
      eventList.find((event) => event.id === Number(id)) || null;
    if (selectedRow === matchingEvent.id) {
      dispatch(unsetEvent());
      setSelectedRow(0);
    } else {
      setSelectedRow(Number(id));
      dispatch(unsetEvent());
      dispatch(setEvent(matchingEvent));
    }
  };

  return (
    <>
      <div className="row table-row title-header text-white bg-primary">
        <div className="col text-center">
          <h3 data-testid="event-list-title">Administración de eventos</h3>
        </div>
      </div>
      <HeaderRow
        columns={columns}
        dataItem="events"
        handleSort={handleSort}
        sortValue={sortValue.value}
      />
      <div className="table-wrapper">
        {orderBy(eventList, [sortValue.value], [sortValue.orderType]).map(
          (event) => {
            return (
              <TableRow
                columns={columns}
                dataItem="events"
                key={event.id}
                row={event}
                select={findMatchingEvent}
                selected={selectedRow === event.id}
              />
            );
          }
        )}
      </div>
    </>
  );
}

EventList.defaultProps = {
  selectedEvent: {},
};

EventList.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
};

export default EventList;
