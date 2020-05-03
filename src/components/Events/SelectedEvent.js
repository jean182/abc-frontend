import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import t from "../../helpers/i18n";
import { showEvent } from "../../redux/modules/events/event";

export function SelectedEvent({ selectedEvent }) {
  const setInputValue = (obj, key) =>
    obj && !isEmpty(obj[key]) ? obj[key] : "";

  const approvalDate = (value) => {
    let parsedStringDate = "";
    if (value !== "") parsedStringDate = value.split("-");
    return parsedStringDate;
  };
  return (
    <div className="row mb-3 selected-event">
      <div className="col-sm-11 p-3 align-self-center selected-event">
        <input
          className="form-control bg-white mb-3 abc-input abc-no-input"
          placeholder={t("table.events.description")}
          type="text"
          value={setInputValue(selectedEvent, "description")}
          readOnly
        />
        <input
          className="form-control bg-white mt-3 abc-input abc-no-input"
          placeholder={t("table.events.proposedBy")}
          type="text"
          value={setInputValue(selectedEvent, "proposedBy")}
          readOnly
        />
      </div>
      <div className="col-sm-1 bg-light p-3 selected-event-date">
        <input
          className="form-control bg-white abc-input--date"
          placeholder={t("table.events.day")}
          type="text"
          value={
            approvalDate(setInputValue(selectedEvent, "approvalDate")).length >
            1
              ? approvalDate(setInputValue(selectedEvent, "approvalDate"))[2]
              : ""
          }
          readOnly
        />
        <input
          className="form-control bg-white abc-input--date"
          placeholder={t("table.events.month")}
          type="text"
          value={
            approvalDate(setInputValue(selectedEvent, "approvalDate")).length >
            1
              ? approvalDate(setInputValue(selectedEvent, "approvalDate"))[1]
              : ""
          }
          readOnly
        />
        <input
          className="form-control bg-white abc-input--date"
          placeholder={t("table.events.year")}
          type="text"
          value={
            approvalDate(setInputValue(selectedEvent, "approvalDate")).length >
            1
              ? approvalDate(setInputValue(selectedEvent, "approvalDate"))[0]
              : ""
          }
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
