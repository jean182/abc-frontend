import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { showEvent } from "../../redux/modules/events/event";
import ReduxSelectedEvent from "../Events/SelectedEvent";
import EmptyHomeScreen from "./EmptyHomeScreen";
import GraphicsContainer from "./GraphicsContainer";

export function PageContent({ selectedEvent }) {
  return (
    <>
      <ReduxSelectedEvent selectedEvent={selectedEvent} />
      {isEmpty(selectedEvent) ? (
        <EmptyHomeScreen />
      ) : (
        <GraphicsContainer selectedEvent={selectedEvent} />
      )}
    </>
  );
}

PageContent.defaultProps = {
  selectedEvent: {},
};

PageContent.propTypes = {
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = (state) => ({
  selectedEvent: showEvent(state),
});

export default connect(mapStateToProps)(PageContent);
