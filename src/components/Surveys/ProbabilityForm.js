/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { first, get, isEmpty, omit } from "lodash";
import Swal from "sweetalert2";
import translate from "../../helpers/i18n";
import EventInfo from "./EventInfo";
import ProbabilityQuestion from "./ProbabilityQuestion";
import {
  getProcedureTypeValue,
  getVoteTypeValue,
} from "../../helpers/scale-helpers";
import {
  editProbabilityScore,
  newProbabilityScore,
} from "../../helpers/probability-form-helpers";

const responseKeys = [
  { label: "Totalmente en desacuerdo", value: 2 },
  { label: "En desacuerdo", value: 4 },
  { label: "Ni de acuerdo ni en desacuerdo", value: 6 },
  { label: "De acuerdo", value: 8 },
  { label: "Totalmente de acuerdo", value: 10 },
];

const riskFeelings = [
  "Muy baja probabilidad",
  "Baja probabilidad",
  "Probabilidad intermedia",
  "Alta probabilidad",
  "Muy alta probabilidad",
  "Extremadamente probable",
];

export default function ProbabilityForm(props) {
  const { register, handleSubmit } = useForm();
  const {
    createScoreInfo,
    currentUser,
    riskFactors,
    score,
    selectedItem,
    updateScoreInfo,
  } = props;
  const questions = riskFactors.filter(
    ({ description }) =>
      description !== "Tipo de votación" &&
      description !== "Tipo de procedimiento"
  );
  const nonEditableQuestions = riskFactors.filter(
    ({ description }) =>
      description === "Tipo de votación" ||
      description === "Tipo de procedimiento"
  );
  const { description, procedureType, voteType, evaluationIds } = selectedItem;
  const evaluationId = first(evaluationIds);
  const splitDescription = description.split(":");
  const {
    0: expNumber,
    [splitDescription.length - 1]: expDescription,
  } = splitDescription;
  const procedureTypeValue = getProcedureTypeValue(procedureType);
  const voteTypeValue = getVoteTypeValue(voteType);

  const onSubmit = (data) => {
    let scoreParams = {};
    const values = Object.values(omit(data, ["questionGlobal"]));
    const riskFeeling = get(data, "questionGlobal");
    if (!isEmpty(score)) {
      const editProbabilityScoreResult = editProbabilityScore(
        values,
        questions,
        nonEditableQuestions,
        score,
        procedureTypeValue,
        voteTypeValue
      );
      scoreParams = {
        score: {
          ...editProbabilityScoreResult,
          evaluationId,
          riskFeeling,
        },
      };
      delete scoreParams.score.riskFactorScores;
      updateScoreInfo({ id: score.id, score: scoreParams, swal: Swal });
    } else {
      const newProbabilityScoreResult = newProbabilityScore(
        values,
        questions,
        nonEditableQuestions,
        procedureTypeValue,
        voteTypeValue
      );
      scoreParams = {
        score: {
          ...newProbabilityScoreResult,
          userId: currentUser.id,
          evaluationId,
          riskFeeling,
          impactScale: 0,
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
          id="probability-form"
          className="probability-form-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          {questions
            .sort((a, b) => a.id - b.id)
            .map((question, index) => {
              const matchingRiskFactorScore = !isEmpty(score)
                ? score.riskFactorScores.find(
                    (risk) => risk.riskFactorId === question.id
                  )
                : null;
              return (
                <ProbabilityQuestion
                  key={question.id}
                  question={question}
                  register={register}
                  responseKeys={responseKeys}
                  riskFactorScore={matchingRiskFactorScore}
                  questionNumber={index}
                />
              );
            })}
          <fieldset>
            <p>
              <strong>
                {translate("probabilityForm.questionGlobalTitle")}
              </strong>
            </p>
            <p>{translate("probabilityForm.questionGlobal")}</p>
            <div className="toggle">
              {riskFeelings.map((response, index) => (
                <React.Fragment key={`questionGlobal-${index}`}>
                  <input
                    id={`questionGlobal-${index}`}
                    name="questionGlobal"
                    type="radio"
                    value={response}
                    defaultChecked={
                      score ? score.riskFeeling === response : false
                    }
                    ref={register({ required: true })}
                  />
                  <label htmlFor={`questionGlobal-${index}`}>{response}</label>
                </React.Fragment>
              ))}
            </div>
          </fieldset>
        </form>
      </div>
      <div className="modal-footer">
        <button
          type="submit"
          form="probability-form"
          className="btn btn-primary"
        >
          {translate("probabilityForm.submit")}
        </button>
      </div>
    </>
  );
}

ProbabilityForm.defaultProps = {
  score: null,
};

ProbabilityForm.propTypes = {
  createScoreInfo: PropTypes.func.isRequired,
  currentUser: PropTypes.oneOfType([PropTypes.object]).isRequired,
  score: PropTypes.oneOfType([PropTypes.object]),
  selectedItem: PropTypes.oneOfType([PropTypes.object]).isRequired,
  riskFactors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  updateScoreInfo: PropTypes.func.isRequired,
};
