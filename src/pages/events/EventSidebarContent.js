import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PendingUsers from "../../components/PendingUsers";
import { showEvent } from "../../redux/modules/events/event";

function SidebarContent({ selectedEvent }) {
  return (
    <>
      <div className="row py-3 border-primary sidebar-subtitle-borders">
        <div className="col font-weight-bold sidebar-subtitle">
          Calificación de eventos de riesgo legislativo con impacto en la banca
        </div>
      </div>
      <PendingUsers selectedEvent={selectedEvent} />
    </>
  );
}

SidebarContent.defaultProps = {
  selectedEvent: {},
};

SidebarContent.propTypes = {
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = (state) => ({
  selectedEvent: showEvent(state),
});

export default connect(mapStateToProps)(SidebarContent);
