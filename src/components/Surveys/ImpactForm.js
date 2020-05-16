/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import translate from "../../helpers/i18n";
import EventInfo from "./EventInfo";

const responseKeys = [
  "Muy bajo",
  "Bajo impacto",
  "Impacto intermedio",
  "Alto impacto",
  "Impacto extremo",
];

const selectOptions = [
  "Grupos financieros",
  "Conglomerados financieros",
  "Banca corporativa",
  "Banca de consumo",
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
  const { selectedItem } = props;
  const { description, procedureType, voteType } = selectedItem;
  const splitDescription = description.split(":");
  const {
    0: expNumber,
    [splitDescription.length - 1]: expDescription,
  } = splitDescription;
  const { register, handleSubmit } = useForm();

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
          id="impact-form"
          className="impact-form-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="my-1 mr-2" htmlFor="sectorSelect">
            Sector:
          </label>
          <select
            className="custom-select"
            id="sectorSelect"
            ref={register}
            name="sector"
          >
            {selectOptions.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <fieldset>
            <p>
              <strong>{translate("impactForm.questionOneTitle")}</strong>
            </p>
            <p>{translate("impactForm.questionOne")}</p>
            <div className="toggle">
              {responseKeys.map((response, index) => (
                <React.Fragment key={`impactQuestionOne-${index}`}>
                  <input
                    id={`impact-question-one-${index}`}
                    name="impactQuestionOne"
                    type="radio"
                    value={response}
                    ref={register({ required: true })}
                  />
                  <label htmlFor={`impact-question-one-${index}`}>
                    {response}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <p>
              <strong>{translate("impactForm.questionTwoTitle")}</strong>
            </p>
            <p>{translate("impactForm.questionTwo")}</p>
            <div className="toggle">
              {responseKeys.map((response, index) => (
                <React.Fragment key={`impactQuestionTwo-${index}`}>
                  <input
                    id={`impact-question-two-${index}`}
                    name="impactQuestionTwo"
                    type="radio"
                    value={response}
                    ref={register}
                  />
                  <label htmlFor={`impact-question-two-${index}`}>
                    {response}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <p>
              <strong>
                {translate("impactForm.questionGeneralImpactTitle")}
              </strong>
            </p>
            <p>{translate("impactForm.questionGeneralImpact")}</p>
            {checkBoxOptions.map((option, index) => {
              return (
                <div
                  className="form-check form-check-inline"
                  key={`${option}-${index}`}
                >
                  <input
                    ref={register}
                    name="generalImpact"
                    className="form-check-input"
                    type="checkbox"
                    id={`${option}-${index}`}
                    value={option}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`${option}-${index}`}
                  >
                    {option}
                  </label>
                </div>
              );
            })}
          </fieldset>
        </form>
        <div />
        <div className="modal-footer">
          <button type="submit" form="impact-form" className="btn btn-primary">
            {translate("impactForm.submit")}
          </button>
        </div>
      </div>
    </>
  );
}

ImpactForm.propTypes = {
  selectedItem: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
