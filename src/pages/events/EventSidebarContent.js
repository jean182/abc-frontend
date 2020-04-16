import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
import PendingUsers from "../../components/PendingUsers";
import { showEvent } from "../../redux/modules/events/event";
import FormsWrapper from "../../components/Surveys/FormsWrapper";

function SidebarContent({ selectedEvent }) {
  return (
    <>
      <div className="row py-3 border-primary sidebar-subtitle-borders">
        <div className="col font-weight-bold sidebar-subtitle">
          Calificación de eventos de riesgo legislativo con impacto en la banca
        </div>
      </div>
      <PendingUsers selectedEvent={selectedEvent} />
      <FormsWrapper selectedEvent={selectedEvent} />
      <div className="row py-3 sidebar-subtitle-borders border-primary">
        <div className="col">
          <Link to="/inicio" className="btn btn-primary">
            <FaChevronCircleLeft />
            <span className="ml-2">Regresar al panel principal</span>
          </Link>
        </div>
      </div>
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
