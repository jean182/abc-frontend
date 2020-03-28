import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { showEvent } from "../../redux/modules/events/event";
import EmptyHomeScreen from "./EmptyHomeScreen";

export function ChartsContainer({ selectedEvent }) {
  if (isEmpty(selectedEvent)) return <EmptyHomeScreen />;

  return (
    <div className="row py-3 sidebar-subtitle-borders border-primary">
      <div className="col">
        <p className="font-weight-bold mb-0">{selectedEvent.description}</p>
      </div>
    </div>
  );
}

ChartsContainer.defaultProps = {
  selectedEvent: {},
};

ChartsContainer.propTypes = {
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = (state) => ({
  selectedEvent: showEvent(state),
});

export default connect(mapStateToProps)(ChartsContainer);
