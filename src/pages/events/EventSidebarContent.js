import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
import PendingUsers from "../../components/PendingUsers";
import { showEvent } from "../../redux/modules/events/event";
import FormsWrapper from "../../components/Surveys/FormsWrapper";
import AuthButton from "../../router/AuthButton";
import AdminOptions from "./AdminOptions";
import Modal from "../../components/Modal/Modal";
import EventAverages from "./EventsAverage";
import { eventListFilterSelector } from "../../redux/modules/events/eventList";

function SidebarContent({ filteredEvents, selectedEvent, user }) {
  const { role } = user;
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
          <Link to="/inicio" className="btn btn-primary btn-block">
            <FaChevronCircleLeft />
            <span className="ml-2">Regresar al panel principal</span>
          </Link>
        </div>
      </div>
      {filteredEvents.length > 0 && (
        <Modal
          ariaLabel="Average Modal"
          buttonId="events-average-button"
          modalId="events-average-button-modal"
          title="Distribución de eventos según el promedio de impacto y de probabilidad"
          triggerStyles="btn btn-primary btn-block mb-3"
          triggerText="Promedios"
        >
          <EventAverages eventList={filteredEvents} />
        </Modal>
      )}
      {role === "Administrador" && <AdminOptions />}
      <AuthButton />
    </>
  );
}

SidebarContent.defaultProps = {
  filteredEvents: [],
  selectedEvent: {},
};

SidebarContent.propTypes = {
  filteredEvents: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  filteredEvents: eventListFilterSelector(state, state.filterReducer),
  selectedEvent: showEvent(state),
  user: state.sessionReducer.user,
});

export default connect(mapStateToProps)(SidebarContent);
