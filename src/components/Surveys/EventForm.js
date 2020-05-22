import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import translate from "../../helpers/i18n";

const procedureTypeOptions = [
  { id: 1, label: "Ordinario antes de reforma", value: "ordinary_before" },
  { id: 2, label: "Ordinario luego de reforma", value: "ordinary_after" },
  { id: 3, label: "208 bis", value: "two_hundred_eight" },
  { id: 4, label: "Dispensa de trámite", value: "waiver_procedure" },
];

const stageOptions = [
  { id: 1, label: "Pendiente de asignar", value: "pending" },
  { id: 2, label: "En comisión", value: "commission" },
  { id: 3, label: "En plenario", value: "plenary" },
];

const voteTypeOptions = [
  { id: 1, label: "Mayoría Calificada", value: "qualified_majority" },
  { id: 2, label: "Mayoría Simple", value: "simple_majority" },
];

function EventForm(props) {
  const { action, close, selectedEvent } = props;
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data, event) => {
    let eventParams = {};
    if (isEmpty(selectedEvent)) {
      eventParams = {
        event: {
          ...data,
          state: "current",
        },
      };
      action({ event: eventParams, swal: Swal });
    } else {
      eventParams = {
        id: selectedEvent.id,
        event: {
          ...data,
          state: "current",
        },
      };
      action({ event: eventParams, swal: Swal });
    }
    event.target.reset();
    close();
  };

  return (
    <Form
      id={`event-${isEmpty(selectedEvent) ? "create" : "edit"}-form`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="fileNumber">
            {translate("eventForm.fileNumber")}
          </label>
          <Form.Control
            name="fileNumber"
            className={errors.fileNumber ? "is-invalid" : "valid"}
            type="number"
            ref={register({ required: true })}
            defaultValue={selectedEvent ? selectedEvent.fileNumber : ""}
          />
          {errors.fileNumber && (
            <div className="invalid-feedback">
              {`${translate("eventForm.fileNumber")} no puede estar vacio`}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">
            {translate("eventForm.description")}
          </label>
          <Form.Control
            as="textarea"
            name="description"
            className={errors.description ? "is-invalid" : "valid"}
            type="textarea"
            defaultValue={selectedEvent ? selectedEvent.description : ""}
            ref={register({ required: true })}
          />
          {errors.description && (
            <div className="invalid-feedback">
              {`${translate("eventForm.description")} no puede estar vacio`}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="proposedBy">
            {translate("eventForm.proposedBy")}
          </label>
          <input
            name="proposedBy"
            className="form-control"
            defaultValue={selectedEvent ? selectedEvent.proposedBy : ""}
            ref={register}
          />
        </div>
        <div className="form-group">
          <label htmlFor="approvalDate">
            {translate("eventForm.approvalDate")}
          </label>
          <input
            name="approvalDate"
            className="form-control"
            type="date"
            defaultValue={selectedEvent ? selectedEvent.approvalDate : ""}
            ref={register}
            placeholder={translate("eventForm.approvalDate")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="procedureType">
            {translate("eventForm.procedureType")}
          </label>
          <select
            className="custom-select"
            name="procedureType"
            ref={register({ required: true })}
            defaultValue={selectedEvent ? selectedEvent.procedureType : ""}
          >
            {procedureTypeOptions.map((option) => {
              return (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="voteType">{translate("eventForm.voteType")}</label>
          <select
            className="custom-select"
            name="voteType"
            ref={register({ required: true })}
            defaultValue={selectedEvent ? selectedEvent.voteType : ""}
          >
            {voteTypeOptions.map((option) => {
              return (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="stage">{translate("eventForm.stage")}</label>
          <select
            className="custom-select"
            name="stage"
            ref={register({ required: true })}
            defaultValue={selectedEvent ? selectedEvent.stage : ""}
          >
            {stageOptions.map((option) => {
              return (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <input
          type="submit"
          className="btn btn-primary"
          value={
            isEmpty(selectedEvent)
              ? translate("eventForm.create")
              : translate("eventForm.edit")
          }
        />
      </div>
    </Form>
  );
}

EventForm.propTypes = {
  action: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  selectedEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default EventForm;
