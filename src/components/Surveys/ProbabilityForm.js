/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import translate from "../../helpers/i18n";
import EventInfo from "./EventInfo";
import ProbabilityQuestion from "./ProbabilityQuestion";
import {
  getProcedureTypeValue,
  getVoteTypeValue,
} from "../../helpers/scale-helpers";

const responseKeys = [
  { label: "Totalmente en desacuerdo", value: 2 },
  { label: "En desacuerdo", value: 4 },
  { label: "Ni de acuerdo ni en desacuerdo", value: 6 },
  { label: "De acuerdo", value: 8 },
  { label: "Totalmente de acuerdo", value: 10 },
];

export default function ProbabilityForm(props) {
  const { register, handleSubmit } = useForm();
  const { riskFactors, score, selectedItem } = props;
  console.log(riskFactors);
  const questions = riskFactors.filter(
    ({ description }) =>
      description !== "Tipo de votación" &&
      description !== "Tipo de procedimiento"
  );
  const { description, procedureType, voteType } = selectedItem;
  const splitDescription = description.split(":");
  const {
    0: expNumber,
    [splitDescription.length - 1]: expDescription,
  } = splitDescription;
  const procedureTypeValue = getProcedureTypeValue(procedureType);
  const voteTypeValue = getVoteTypeValue(voteType);
  console.log(procedureTypeValue);
  console.log(voteTypeValue);

  const onSubmit = (data, e) => {
    console.log(data);
    console.log(e);
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
          {questions.map((question, index) => {
            const matchingRiskFactorScore = score
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
              {responseKeys.map((response, index) => (
                <React.Fragment key={`questionGlobal-${index}`}>
                  <input
                    id={`questionGlobal-${index}`}
                    name="questionGlobal"
                    type="radio"
                    value={response.value}
                    ref={register({ required: true })}
                  />
                  <label htmlFor={`questionGlobal-${index}`}>
                    {response.label}
                  </label>
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
  score: PropTypes.oneOfType([PropTypes.object]),
  selectedItem: PropTypes.oneOfType([PropTypes.object]).isRequired,
  riskFactors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
};
