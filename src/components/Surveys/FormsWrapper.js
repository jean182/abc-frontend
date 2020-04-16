import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import Modal from "../Modal/Modal";
import ProbabilityForm from "./ProbabilityForm";
import ImpactForm from "./ImpactForm";

export default function FormsWrapper({ selectedEvent }) {
  if (isEmpty(selectedEvent)) return null;
  return (
    <div className="row py-3 sidebar-subtitle-borders border-primary">
      <div className="col">
        <Modal
          ariaLabel="Probability Form"
          buttonId="probability-form-button"
          modalId="probability-form-modal"
          triggerStyles="btn btn-primary btn-block mb-3"
          triggerText="Probabilidad"
        >
          <ProbabilityForm selectedEvent={selectedEvent} />
        </Modal>
        <Modal
          ariaLabel="Impact Form"
          buttonId="impact-form-button"
          modalId="impact-form-modal"
          triggerStyles="btn btn-primary btn-block mt-3"
          triggerText="Impacto"
        >
          <ImpactForm selectedEvent={selectedEvent} />
        </Modal>
      </div>
    </div>
  );
}

FormsWrapper.defaultProps = {
  selectedEvent: {},
};

FormsWrapper.propTypes = {
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
};
