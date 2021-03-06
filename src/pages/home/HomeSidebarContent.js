import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MdEventNote } from "react-icons/md";
import CurrentUser from "../../components/CurrentUser";
import AuthButton from "../../router/AuthButton";
import AdminOptions from "./AdminOptions";
import translate from "../../helpers/i18n";

function HomeSidebarContent({ user }) {
  const { role } = user;
  return (
    <>
      <div className="row py-3 border-primary sidebar-subtitle-borders">
        <div className="col sidebar-subtitle">
          Calificación de eventos de riesgo legislativo con impacto en la banca
        </div>
      </div>
      <CurrentUser />
      <div className="my-3">
        <Link
          to={translate("routes.events")}
          className="btn btn-primary btn-md btn-block"
        >
          <MdEventNote />
          <span className="ml-2">Eventos</span>
        </Link>
      </div>
      {role === "Administrador" && <AdminOptions />}
      <AuthButton />
    </>
  );
}

HomeSidebarContent.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.sessionReducer.user,
});

export default connect(mapStateToProps)(HomeSidebarContent);
