import React from "react";
import { Link } from "react-router-dom";
import CurrentUser from "../../components/CurrentUser";
import translate from "../../helpers/i18n";

function HomeSidebarContent() {
  return (
    <>
      <div className="row py-3 border-primary sidebar-subtitle-borders">
        <div className="col font-weight-bold sidebar-subtitle">
          Calificación de eventos de riesgo legislativo con impacto en la banca
        </div>
      </div>
      <CurrentUser />
      <div className="my-3">
        <Link
          to={translate("routes.events")}
          className="btn btn-primary btn-lg btn-block"
        >
          Eventos
        </Link>
      </div>
    </>
  );
}

export default HomeSidebarContent;
