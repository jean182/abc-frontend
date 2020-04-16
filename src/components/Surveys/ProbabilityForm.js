/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import translate from "../../helpers/i18n";

const responseKeys = [
  "Totalmente en desacuerdo",
  "En desacuerdo",
  "Ni de acuerdo ni en desacuerdo",
  "De acuerdo",
  "Totalmente de acuerdo",
];

export default function ProbabilityForm(props) {
  const { selectedEvent } = props;
  const { description, procedureType, voteType } = selectedEvent;
  const splitDescription = description.split(":");
  const {
    0: expNumber,
    [splitDescription.length - 1]: expDescription,
  } = splitDescription;
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      <div className="row bg-light align-items-center py-3">
        <div className="col-sm-8 pl-sm-5">
          <p className="text-truncate mb-0 text-primary font-weight-bold">
            <span className="text-dark">{`${expNumber}:`}</span>
            {expDescription}
          </p>
        </div>
        <div className="col-sm-4">
          <p className="mb-0 font-weight-light">
            <strong className="font-weight-bold">
              {"Tipo de procedimiento: "}
            </strong>
            {procedureType}
          </p>
          <p className="mb-0 font-weight-light">
            <strong className="font-weight-bold">Tipo de votación: </strong>
            {voteType}
          </p>
        </div>
      </div>
      <form className="question-container" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <p>
            <strong>{translate("probabilityForm.questionOneTitle")}</strong>
          </p>
          <p>{translate("probabilityForm.questionOne")}</p>
          <div className="toggle">
            {responseKeys.map((response, index) => (
              <React.Fragment key={`questionOne-${index}`}>
                <input
                  id={`questionOne-${index}`}
                  name="questionOne"
                  type="radio"
                  value={response}
                  ref={register({ required: true })}
                />
                <label htmlFor={`questionOne-${index}`}>{response}</label>
              </React.Fragment>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <p>
            <strong>{translate("probabilityForm.questionTwoTitle")}</strong>
          </p>
          <p>{translate("probabilityForm.questionTwo")}</p>
          <div className="toggle">
            {responseKeys.map((response, index) => (
              <React.Fragment key={`questionTwo-${index}`}>
                <input
                  id={`questionTwo-${index}`}
                  name="questionTwo"
                  type="radio"
                  value={response}
                  ref={register({ required: true })}
                />
                <label htmlFor={`questionTwo-${index}`}>{response}</label>
              </React.Fragment>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <p>
            <strong>{translate("probabilityForm.questionThreeTitle")}</strong>
          </p>
          <p>{translate("probabilityForm.questionThree")}</p>
          <div className="toggle">
            {responseKeys.map((response, index) => (
              <React.Fragment key={`questionThree-${index}`}>
                <input
                  id={`questionThree-${index}`}
                  name="questionThree"
                  type="radio"
                  value={response}
                  ref={register({ required: true })}
                />
                <label htmlFor={`questionThree-${index}`}>{response}</label>
              </React.Fragment>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <p>
            <strong>{translate("probabilityForm.questionFourTitle")}</strong>
          </p>
          <p>{translate("probabilityForm.questionFour")}</p>
          <div className="toggle">
            {responseKeys.map((response, index) => (
              <React.Fragment key={`questionFour-${index}`}>
                <input
                  id={`questionFour-${index}`}
                  name="questionFour"
                  type="radio"
                  value={response}
                  ref={register({ required: true })}
                />
                <label htmlFor={`questionFour-${index}`}>{response}</label>
              </React.Fragment>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <p>
            <strong>{translate("probabilityForm.questionGlobalTitle")}</strong>
          </p>
          <p>{translate("probabilityForm.questionGlobal")}</p>
          <div className="toggle">
            {responseKeys.map((response, index) => (
              <React.Fragment key={`questionGlobal-${index}`}>
                <input
                  id={`questionGlobal-${index}`}
                  name="questionGlobal"
                  type="radio"
                  value={response}
                  ref={register({ required: true })}
                />
                <label htmlFor={`questionGlobal-${index}`}>{response}</label>
              </React.Fragment>
            ))}
          </div>
        </fieldset>

        <div className="d-flex justify-content-end mt-2">
          <button
            type="submit"
            className="btn btn-primary d-flex align-items-center"
          >
            <FaCheckCircle />
            <span className="ml-2">Guardar Probabilidad</span>
          </button>
        </div>
      </form>
    </>
  );
}

ProbabilityForm.propTypes = {
  selectedEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
