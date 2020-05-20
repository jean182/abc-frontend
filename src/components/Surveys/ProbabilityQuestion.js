/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import translate from "../../helpers/i18n";

export default function ProbabilityQuestion(props) {
  const {
    register,
    responseKeys,
    riskFactorScore,
    question,
    questionNumber,
  } = props;
  const { id, description } = question;
  return (
    <fieldset id={`group-${id}`}>
      <p>
        <strong>{description}</strong>
      </p>
      <p>{translate(`probabilityForm.question${questionNumber}`)}</p>
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
  );
}

ProbabilityQuestion.defaultProps = {
  riskFactorScore: null,
};

ProbabilityQuestion.propTypes = {
  question: PropTypes.oneOfType([PropTypes.object]).isRequired,
  questionNumber: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
  responseKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  riskFactorScore: PropTypes.oneOfType([PropTypes.object]),
};
