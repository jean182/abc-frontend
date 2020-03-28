import React from "react";
import translate from "../../helpers/i18n";

function EmptyHomeScreen() {
  return (
    <div className="row">
      <div className="col-sm">
        <div className="bg-light empty-container mb-3 d-flex justify-content-center align-items-center text-muted">
          <p>{translate("home.noDataMessageOne")}</p>
        </div>
      </div>
      <div className="col-sm">
        <div className="bg-light empty-container-2 mb-3 d-flex justify-content-center align-items-center text-muted">
          <p>{translate("home.noDataMessageTwo")}</p>
        </div>
        <div className="bg-light empty-container-2 d-flex justify-content-center align-items-center text-muted">
          <p>{translate("home.noDataMessageThree")}</p>
        </div>
      </div>
    </div>
  );
}

export default EmptyHomeScreen;
