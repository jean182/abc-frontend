import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { first, isEmpty } from "lodash";
import Modal from "../Modal/Modal";
import ProbabilityForm from "./ProbabilityForm";
import ImpactForm from "./ImpactForm";
import {
  fetchScore,
  showScore,
  updateScore,
  createScore,
} from "../../redux/modules/score/score";

function FormsWrapper({
  createScoreInfo,
  currentUser,
  getScoreInfo,
  impactQuestions,
  probabilityQuestions,
  score,
  selectedEvent,
  updateScoreInfo,
}) {
  const probabilityModal = useRef(null);
  const impactModal = useRef(null);

  useEffect(() => {
    if (!isEmpty(selectedEvent) && !isEmpty(currentUser)) {
      const evaluation = first(selectedEvent.evaluations);
      getScoreInfo({ id: evaluation.id, userId: currentUser.id });
    }
  }, [getScoreInfo, selectedEvent, currentUser]);

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
              createScoreInfo={createScoreInfo}
              selectedItem={selectedEvent}
              currentUser={currentUser}
              riskFactors={probabilityQuestions}
              updateScoreInfo={updateScoreInfo}
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
              createScoreInfo={createScoreInfo}
              selectedItem={selectedEvent}
              currentUser={currentUser}
              riskFactors={impactQuestions}
              updateScoreInfo={updateScoreInfo}
              score={score}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createScoreInfo: createScore,
      getScoreInfo: fetchScore,
      updateScoreInfo: updateScore,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  score: showScore(state),
});

FormsWrapper.defaultProps = {
  currentUser: {},
  selectedEvent: {},
};

FormsWrapper.propTypes = {
  createScoreInfo: PropTypes.func.isRequired,
  currentUser: PropTypes.oneOfType([PropTypes.object]),
  getScoreInfo: PropTypes.func.isRequired,
  impactQuestions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  probabilityQuestions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object])
  ).isRequired,
  score: PropTypes.oneOfType([PropTypes.object]).isRequired,
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
  updateScoreInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormsWrapper);
