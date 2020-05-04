import React, { useRef } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import translate from "../../helpers/i18n";

const procedureTypeOptions = [
  { id: 1, label: "Ordinario antes de reforma", value: "ordinary_before" },
  { id: 2, label: "Ordinario luego de reforma", value: "ordinary_after" },
  { id: 3, label: "208 bis", value: "two_hundred_eight" },
  { id: 4, label: "Dispensa de trámite", value: "waiver_procedure" },
];

const voteTypeOptions = [
  { id: 1, label: "Mayoría Calificada", value: "qualified_majority" },
  { id: 2, label: "Mayoría Simple", value: "simple_majority" },
];

function EventForm(props) {
  const { action, selectedEvent } = props;
  const { register, handleSubmit } = useForm();
  const formRef = useRef(null);
  const onSubmit = (data, event) => {
    let eventParams = {};
    if (isEmpty(selectedEvent)) {
      eventParams = {
        event: {
          ...data,
          state: "pending",
        },
      };
      action(eventParams);
    } else {
      eventParams = {
        id: selectedEvent.id,
        event: {
          ...data,
          state: "pending",
        },
      };
      action(eventParams);
    }
    event.target.reset();
  };

  return (
    <form
      id={`event-${isEmpty(selectedEvent) ? "create" : "edit"}-form`}
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
    >
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="fileNumber">
            {translate("eventForm.fileNumber")}
          </label>
          <input
            name="fileNumber"
            className="form-control"
            type="number"
            ref={register({ required: true })}
            defaultValue={selectedEvent ? selectedEvent.fileNumber : ""}
            placeholder={translate("eventForm.fileNumber")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">
            {translate("eventForm.description")}
          </label>
          <input
            name="description"
            className="form-control"
            defaultValue={selectedEvent ? selectedEvent.description : ""}
            ref={register({ required: true })}
            placeholder={translate("eventForm.description")}
          />
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
            placeholder={translate("eventForm.proposedBy")}
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
      </div>
      <div className="modal-footer">
        <input
          type="submit"
          className="btn btn-priamry"
          value={
            isEmpty(selectedEvent)
              ? translate("eventForm.create")
              : translate("eventForm.edit")
          }
        />
      </div>
    </form>
  );
}

EventForm.propTypes = {
  action: PropTypes.func.isRequired,
  selectedEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default EventForm;
