/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import translate from "../../helpers/i18n";

export default function ImpactQuestion(props) {
  const {
    checkBoxOptions,
    register,
    responseKeys,
    riskFactorScore,
    question,
  } = props;
  const { id, description } = question;
  const observations =
    riskFactorScore !== null && !isEmpty(riskFactorScore.observations)
      ? riskFactorScore.observations
      : [];
  return (
    <div className="border-bottom">
      <fieldset id={`group-${id}`}>
        <p>
          <strong>{description}</strong>
        </p>
        <p>{translate(`impactForm.question1`)}</p>
        <div className="toggle">
          {responseKeys.map((response, index) => {
            return (
              <React.Fragment key={`question-${id}-option-${index}`}>
                <input
                  id={`question-${id}-option-${index}`}
                  name={`question${id}`}
                  type="radio"
                  defaultChecked={
                    riskFactorScore
                      ? riskFactorScore.scale === response.value
                      : false
                  }
                  value={response.value}
                  ref={register({ required: true })}
                />
                <label htmlFor={`question-${id}-option-${index}`}>
                  {response.label}
                </label>
              </React.Fragment>
            );
          })}
        </div>
      </fieldset>
      <fieldset>
        <p>
          <strong>{translate("impactForm.questionGeneralImpactTitle")}</strong>
        </p>
        <p>{translate("impactForm.questionGeneralImpact")}</p>
        <div className="form-inline">
          {checkBoxOptions.map((option, index) => {
            let checked = false;
            if (
              riskFactorScore !== null &&
              !isEmpty(riskFactorScore.observations)
            ) {
              checked = observations.some(
                (observation) => observation.name === option
              );
            }
            return (
              <div
                className="form-check form-check-inline"
                key={`observation-${id}-${option}-${index}`}
              >
                <input
                  ref={register}
                  name={`generalImpact ${id}`}
                  className="form-check-input"
                  type="checkbox"
                  id={`observation-${id}-${option}-${index}`}
                  value={option}
                  defaultChecked={checked}
                />
                <label
                  className="form-check-label"
                  htmlFor={`observation-${id}-${option}-${index}`}
                >
                  {option}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor={`notes-${id}`}>
            {translate("impactForm.additionalNotes")}
          </label>
          <textarea
            ref={register}
            id={`notes-${id}`}
            className="form-control"
            name={`notes-${id}`}
            placeholder={translate("impactForm.additionalNotesPlaceholder")}
            defaultValue={
              riskFactorScore && riskFactorScore.notes
                ? riskFactorScore.notes
                : ""
            }
          />
        </div>
      </fieldset>
    </div>
  );
}

ImpactQuestion.defaultProps = {
  riskFactorScore: null,
};

ImpactQuestion.propTypes = {
  checkBoxOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  question: PropTypes.oneOfType([PropTypes.object]).isRequired,
  register: PropTypes.func.isRequired,
  responseKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  riskFactorScore: PropTypes.oneOfType([PropTypes.object]),
};
