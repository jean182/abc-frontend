import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isNaN } from "lodash";
import {
  filterByStage,
  filterByDate,
  filterByIfHasDate,
} from "../../redux/modules/filters/filters";
import translate from "../../helpers/i18n";
import { getDates } from "../../helpers/date-helpers";

const ExpenseListFilters = (props) => {
  const handleDateChange = (event) => {
    const { value } = event.target;
    const timestamp = Date.parse(value);

    let date = "";
    if (isNaN(timestamp) === false) {
      date = new Date(timestamp);
    }
    if (date === "") {
      props.dispatch(filterByIfHasDate([true, false]));
      props.dispatch(filterByDate([]));
    } else {
      const dates = getDates(new Date("2019-06-01"), date);
      props.dispatch(filterByIfHasDate([true]));
      props.dispatch(filterByDate(dates));
    }
  };

  return (
    <div className="row mb-3">
      <div className="col">
        <label htmlFor="dateFilter">
          {translate("eventFilters.approvalDate")}
        </label>
        <input
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

ExpenseListFilters.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ExpenseListFilters);
