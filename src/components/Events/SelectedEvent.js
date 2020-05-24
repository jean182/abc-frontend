import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import t from "../../helpers/i18n";
import { monthYearOrDay } from "../../helpers/date-helpers";
import { showEvent } from "../../redux/modules/events/event";

export function SelectedEvent({ selectedEvent }) {
  const setInputValue = (obj, key) =>
    obj && !isEmpty(obj[key]) ? obj[key] : "";

  const description = setInputValue(selectedEvent, "description");
  const proposedBy = setInputValue(selectedEvent, "proposedBy");
  const day = monthYearOrDay(selectedEvent.approvalDate, "day");
  const month = monthYearOrDay(selectedEvent.approvalDate, "month");
  const year = monthYearOrDay(selectedEvent.approvalDate, "year");
  return (
    <div className="row mb-3 selected-event">
      <div className="col-sm-11 p-3 align-self-center selected-event">
        <input
          data-testid="read-only-description"
          className="form-control bg-white mb-3 abc-input abc-no-input"
          placeholder={t("table.events.description")}
          type="text"
          value={description}
          readOnly
        />
        <input
          data-testid="read-only-proposedBy"
          className="form-control bg-white mt-3 abc-input abc-no-input"
          placeholder={t("table.events.proposedBy")}
          type="text"
          value={proposedBy}
          readOnly
        />
      </div>
      <div className="col-sm-1 bg-light p-3 selected-event-date">
        <input
          data-testid="read-only-approvalDate-day"
          className="form-control bg-white abc-input--date"
          placeholder={t("table.events.day")}
          type="text"
          value={day}
          readOnly
        />
        <input
          data-testid="read-only-approvalDate-month"
          className="form-control bg-white abc-input--date"
          placeholder={t("table.events.month")}
          type="text"
          value={month}
          readOnly
        />
        <input
          data-testid="read-only-approvalDate-year"
          className="form-control bg-white abc-input--date"
          placeholder={t("table.events.year")}
          type="text"
          value={year}
          readOnly
        />
      </div>
    </div>
  );
}

SelectedEvent.defaultProps = {
  selectedEvent: {},
};

SelectedEvent.propTypes = {
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = (state) => ({
  selectedEvent: showEvent(state),
});

export default connect(mapStateToProps)(SelectedEvent);
