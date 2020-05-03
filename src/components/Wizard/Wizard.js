/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { find } from "lodash";
import { FaCheckCircle } from "react-icons/fa";

export const Wizard = (props) => {
  const {
    addButtonText,
    cancelButtonText,
    formId,
    selectedEvent,
    wizardComponents,
  } = props;

  const [wizardState, setWizardState] = useState({
    wizardStep: 1,
  });

  const updateWizardState = (dataUpdated) => {
    setWizardState(dataUpdated);
  };

  const next = () => {
    const { wizardStep } = wizardState;
    if (wizardStep !== wizardComponents.length) {
      setWizardState({
        ...wizardState,
        wizardStep: wizardStep + 1,
      });
    }
  };

  const prev = () => {
    const { wizardStep } = wizardState;
    if (wizardStep !== 1) {
      setWizardState({
        ...wizardState,
        wizardStep: wizardStep - 1,
      });
    }
  };

  const closeWizard = () => {
    const { close } = props;
    close();
  };

  const submitWizard = (data, e) => {
    console.log(data);
    console.log(e);

    // const { dispatch, action } = props;
    // const balde = { data };
    // dispatch(action(balde));
    next();
    e.target.reset();
  };

  const wizardStepRender = () => {
    const { wizardStep } = wizardState;
    const component = find(wizardComponents, ["wizardStep", wizardStep]);

    return (
      <div className="modal-body">
        <div key={component.wizardStep}>
          <component.component
            selectedEvent={selectedEvent}
            stateData={{ ...wizardState }}
            submitWizard={submitWizard}
            updateWizardState={updateWizardState}
            {...(component.props || {})}
          />
        </div>
      </div>
    );
  };

  const buttonRender = () => {
    const { wizardStep } = wizardState;

    return (
      <div className="modal-footer">
        {wizardStep === 1 && (
          <button
            type="submit"
            className="btn btn-primary d-flex align-items-center"
            onSubmit={submitWizard}
            form={formId}
          >
            <FaCheckCircle />
            <span className="ml-2">{addButtonText}</span>
          </button>
        )}

        <button
          id="cancel-button"
          type="submit"
          onClick={closeWizard}
          className="btn btn-danger"
        >
          {cancelButtonText}
        </button>
        {wizardStep !== 1 && (
          <button type="button" className="btn btn-primary" onClick={prev}>
            Regresar
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {wizardStepRender()}
      {buttonRender()}
    </>
  );
};

Wizard.defaultProps = {
  addButtonText: "Agregar",
  cancelButtonText: "Cancelar",
};

Wizard.propTypes = {
  addButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  close: PropTypes.func.isRequired,
  formId: PropTypes.string.isRequired,
  selectedEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
  wizardComponents: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  // params: PropTypes.oneOfType([PropTypes.object]).isRequired,
  // action: PropTypes.func.isRequired,
  // dispatch: PropTypes.func.isRequired,
};

export default connect()(Wizard);
