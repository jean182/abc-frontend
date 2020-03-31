import React, { useState } from "react";
import PropTypes from "prop-types";
import { first, orderBy } from "lodash";
import { useDispatch } from "react-redux";
import HeaderRow from "./HeaderRow";
import EventRow from "./EventRow";
import Pagination from "./Pagination";
import { setEvent, unsetEvent } from "../../redux/modules/events/event";
import { SelectedEvent } from "./SelectedEvent";
import translate from "../../helpers/i18n";

function EventList(props) {
  const [resetPagination, setResetPagination] = useState(false);
  const [range, setRange] = useState({
    start: 0,
    end: 10,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sortValue, setSortValue] = useState({
    value: "id",
    orderType: "asc",
  });
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

  const onChangePage = (_event, page) => {
    setResetPagination(false);
    setRange({
      start: 10 * (page - 1),
      end: 10 * page,
    });
  };

  const handleSort = (value) => {
    setResetPagination(true);
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
      <HeaderRow
        columns={columns}
        handleSort={handleSort}
        sortValue={sortValue.value}
      />
      {orderBy(eventList, [sortValue.value], [sortValue.orderType])
        .slice(range.start, range.end)
        .map((event) => {
          return (
            <EventRow
              columns={columns}
              key={event.id}
              row={event}
              select={findMatchingEvent}
            />
          );
        })}
      <div className="d-flex justify-content-between mt-3">
        <span className="page-items-count">
          {`${translate("pagination.showing")} ${
            range.start === 0 ? 1 : range.start + 1
          } - ${
            range.end <= eventList.length ? range.end : eventList.length
          } ${translate("pagination.of")} ${eventList.length} ${translate(
            "pagination.events"
          )}.`}
        </span>
        <Pagination
          resetPagination={resetPagination}
          data={eventList}
          itemCount={10}
          onChange={onChangePage}
        />
      </div>
    </>
  );
}

EventList.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
};

export default EventList;
