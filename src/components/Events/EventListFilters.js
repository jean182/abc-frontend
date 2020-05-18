import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isValid, parseISO } from "date-fns";
import {
  filterByStage,
  filterByDate,
  filterByIfHasDate,
} from "../../redux/modules/filters/filters";
import translate from "../../helpers/i18n";
import { getIsoDatesFromInterval } from "../../helpers/date-helpers";

export const EventListFilters = (props) => {
  const handleDateChange = (event) => {
    const { value } = event.target;
    const date = parseISO(value);

    if (isValid(date)) {
      const dates = getIsoDatesFromInterval(parseISO("2019-06-01"), date);
      props.dispatch(filterByIfHasDate([true]));
      props.dispatch(filterByDate(dates));
    } else {
      props.dispatch(filterByIfHasDate([true, false]));
      props.dispatch(filterByDate([]));
    }
  };

  return (
    <div className="row mb-3">
      <div className="col">
        <label htmlFor="approvalDateFilter">
          {translate("eventFilters.approvalDate")}
        </label>
        <input
          id="approvalDateFilter"
          name="dateFilter"
          type="date"
          className="form-control"
          onChange={handleDateChange}
        />
      </div>
      <div className="col">
        <label htmlFor="stageFilter">{translate("eventFilters.stage")}</label>
        <select
          className="custom-select"
          id="stageFilter"
          name="stageFilter"
          onChange={(event) => {
            props.dispatch(filterByStage(event.target.value));
          }}
        >
          <option value="pending,commission,plenary">
            Seleccione una opción
          </option>
          <option value="pending">
            {translate("eventsEnum.stage.pending")}
          </option>
          <option value="commission">
            {translate("eventsEnum.stage.commission")}
          </option>
          <option value="plenary">
            {translate("eventsEnum.stage.plenary")}
          </option>
        </select>
      </div>
    </div>
  );
};

EventListFilters.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(EventListFilters);
