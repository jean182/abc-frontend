/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { first, isEmpty } from "lodash";
import Swal from "sweetalert2";
import translate from "../../helpers/i18n";
import EventInfo from "./EventInfo";
import ImpactQuestion from "./ImpactQuestion";
import {
  editImpactScore,
  newImpactScore,
} from "../../helpers/impact-form-helpers";

const responseKeys = [
  { label: "Muy bajo", value: 1 },
  { label: "Bajo impacto", value: 2 },
  { label: "Impacto intermedio", value: 3 },
  { label: "Alto impacto", value: 6 },
  { label: "Muy alto impacto", value: 8 },
  { label: "Impacto extremo", value: 10 },
];

const checkBoxOptions = [
  "No aplica",
  "Reputacional",
  "Legal",
  "Sobre utilidades",
  "Sobre capital",
  "Riesgo de cumplimiento",
];

export default function ImpactForm(props) {
  const {
    createScoreInfo,
    currentUser,
    riskFactors,
    score,
    selectedItem,
    updateScoreInfo,
  } = props;
  const questions = riskFactors.filter(({ description }) =>
    description.includes("Real")
  );
  const nonEditableQuestions = riskFactors.filter(({ description }) =>
    description.includes("Potencial")
  );
  const { description, procedureType, voteType, evaluationIds } = selectedItem;
  const id = first(evaluationIds);
  const splitDescription = description.split(":");
  const {
    0: expNumber,
    [splitDescription.length - 1]: expDescription,
  } = splitDescription;
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    let scoreParams = {};
    const values = Object.values(data);

    if (!isEmpty(score)) {
      const editImpactScoreResult = editImpactScore(
        values,
        questions,
        nonEditableQuestions,
        score
      );
      scoreParams = {
        score: {
          ...editImpactScoreResult,
          userId: currentUser.id,
          evaluationId: id,
          // Until scale is provided
          impactScale: 5,
        },
      };
      delete scoreParams.score.riskFactorScores;
      updateScoreInfo({ id: score.id, score: scoreParams, swal: Swal });
    } else {
      const newImpactScoreResult = newImpactScore(
        values,
        questions,
        nonEditableQuestions,
        score
      );
      scoreParams = {
        score: {
          ...newImpactScoreResult,
          userId: currentUser.id,
          evaluationId: id,
          // Until scale is provided
          impactScale: 5,
        },
      };
      createScoreInfo({ score: scoreParams, swal: Swal });
    }
  };

  return (
    <>
      <div className="modal-body">
        <EventInfo
          expDescription={expDescription}
          expNumber={expNumber}
          procedureType={procedureType}
          voteType={voteType}
        />
        <form
          id="impact-form"
          className="impact-form-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          {questions.map((question) => {
            const matchingRiskFactorScore = !isEmpty(score)
              ? score.riskFactorScores.find(
                  (risk) => risk.riskFactorId === question.id
                )
              : null;
            return (
              <ImpactQuestion
                checkBoxOptions={checkBoxOptions}
                key={question.id}
                question={question}
                register={register}
                responseKeys={responseKeys}
                riskFactorScore={matchingRiskFactorScore}
              />
            );
          })}
        </form>
      </div>
      <div className="modal-footer">
        <button type="submit" form="impact-form" className="btn btn-primary">
          {translate("impactForm.submit")}
        </button>
      </div>
    </>
  );
}

ImpactForm.defaultProps = {
  score: null,
};

ImpactForm.propTypes = {
  createScoreInfo: PropTypes.func.isRequired,
  currentUser: PropTypes.oneOfType([PropTypes.object]).isRequired,
  score: PropTypes.oneOfType([PropTypes.object]),
  selectedItem: PropTypes.oneOfType([PropTypes.object]).isRequired,
  riskFactors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  updateScoreInfo: PropTypes.func.isRequired,
};
