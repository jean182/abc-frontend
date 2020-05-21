import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaChartBar } from "react-icons/fa";
import PendingUsers from "../../components/PendingUsers";
import { showEvent } from "../../redux/modules/events/event";
import FormsWrapper from "../../components/Surveys/FormsWrapper";
import AuthButton from "../../router/AuthButton";
import AdminOptions from "./AdminOptions";

function SidebarContent({ selectedEvent, user }) {
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
            <FaChartBar />
            <span className="ml-2">Panel principal</span>
          </Link>
        </div>
      </div>
      {role === "Administrador" && <AdminOptions />}
      <AuthButton />
    </>
  );
}

SidebarContent.defaultProps = {
  selectedEvent: {},
};

SidebarContent.propTypes = {
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  selectedEvent: showEvent(state),
  user: state.sessionReducer.user,
});

export default connect(mapStateToProps)(SidebarContent);
