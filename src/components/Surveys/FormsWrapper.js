import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { first, isEmpty } from "lodash";
import Modal from "../Modal/Modal";
import ProbabilityForm from "./ProbabilityForm";
import ImpactForm from "./ImpactForm";
import { scoreRequest } from "../../api/scoreEndpoints";

export default function FormsWrapper({
  currentUser,
  impactQuestions,
  probabilityQuestions,
  selectedEvent,
}) {
  const probabilityModal = useRef(null);
  const impactModal = useRef(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (!isEmpty(selectedEvent) && !isEmpty(currentUser)) {
      const fetchScore = async () => {
        try {
          const evaluation = first(selectedEvent.evaluations);
          const result = await scoreRequest(evaluation.id, currentUser.id);
          setScore(result.data);
        } catch (err) {
          setScore({});
        }
      };

      fetchScore();
    }
  }, [selectedEvent, currentUser]);

  if (isEmpty(selectedEvent))
    return (
      <div className="row py-3 sidebar-subtitle-borders border-primary">
        <p>Seleccione un evento</p>
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
          {probabilityQuestions.length > 0 ? (
            <ProbabilityForm
              selectedItem={selectedEvent}
              currentUser={currentUser}
              riskFactors={probabilityQuestions}
              score={score}
            />
          ) : (
            <div className="modal-body">
              <p>Lo sentimos, a ocurrido un error</p>
            </div>
          )}
        </Modal>
        <Modal
          ariaLabel="Impact Form"
          buttonId="impact-form-button"
          modalId="impact-form-modal"
          subtitle="Califique los diferentes factores que componen el impacto del evento según las opciones dadas"
          title="Impacto"
          triggerStyles="btn btn-primary btn-block mt-3"
          triggerText="Impacto"
          ref={impactModal}
        >
          {impactQuestions.length > 0 && (
            <ImpactForm
              selectedItem={selectedEvent}
              currentUser={currentUser}
              riskFactors={impactQuestions}
              score={score}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}

FormsWrapper.defaultProps = {
  currentUser: {},
  selectedEvent: {},
};

FormsWrapper.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.object]),
  impactQuestions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  probabilityQuestions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object])
  ).isRequired,
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
};
