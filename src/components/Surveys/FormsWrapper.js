import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import Modal from "../Modal/Modal";
import ProbabilityForm from "./ProbabilityForm";

export default function FormsWrapper({ selectedEvent }) {
  if (isEmpty(selectedEvent)) return null;
  return (
    <div className="row py-3 sidebar-subtitle-borders border-primary">
      <div className="col">
        <Modal
          ariaLabel="Probability Form"
          buttonId="probability-form-button"
          modalId="probability-form-modal"
          triggerText="Probabilidad"
        >
          <ProbabilityForm selectedEvent={selectedEvent} />
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
