import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { first, isEmpty, orderBy } from "lodash";
import HeaderRow from "../Shared/Table/HeaderRow";
import TableRow from "../Shared/Table/TableRow";
import Pagination from "../Shared/Pagination";
import { setEvent, unsetEvent } from "../../redux/modules/events/event";
import translate from "../../helpers/i18n";

function EventList(props) {
  const { eventList, selectedEvent } = props;
  const [resetPagination, setResetPagination] = useState(false);
  const [range, setRange] = useState({
    start: 0,
    end: 10,
  });
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
      {orderBy(eventList, [sortValue.value], [sortValue.orderType])
        .slice(range.start, range.end)
        .map((event) => {
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

EventList.defaultProps = {
  selectedEvent: {},
};

EventList.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
};

export default EventList;
