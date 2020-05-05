import React, { useRef } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import Modal from "../Modal/Modal";
import ProbabilityForm from "./ProbabilityForm";
import ImpactForm from "./ImpactForm";

export default function FormsWrapper({ selectedEvent }) {
  const probabilityModal = useRef(null);
  const impactModal = useRef(null);
  if (isEmpty(selectedEvent))
    return (
      <div className="row py-3 sidebar-subtitle-borders border-primary">
        <p>Favor seleccione un evento</p>
      </div>
    );
  return (
    <div className="row py-3 sidebar-subtitle-borders border-primary">
      <div className="col">
        <Modal
          ariaLabel="Probability Form"
          buttonId="probability-form-button"
          modalId="probability-form-modal"
          subtitle="Califique los diferentes factores que componen la probabilidad del evento según las opciones dadas"
          title="Probabilidad"
          triggerStyles="btn btn-primary btn-block mb-3"
          triggerText="Probabilidad"
          ref={probabilityModal}
        >
          <ProbabilityForm selectedItem={selectedEvent} />
        </Modal>
        <Modal
          ariaLabel="Impact Form"
          buttonId="impact-form-button"
          modalId="impact-form-modal"
          title="Impacto"
          triggerStyles="btn btn-primary btn-block mt-3"
          triggerText="Impacto"
          ref={impactModal}
        >
          <ImpactForm selectedItem={selectedEvent} />
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
