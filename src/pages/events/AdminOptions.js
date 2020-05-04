import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { bindActionCreators } from "redux";
import Modal from "../../components/Modal/Modal";
import EventForm from "../../components/Surveys/EventForm";
import { showEvent } from "../../redux/modules/events/event";
import { createEvent, updateEvent } from "../../redux/modules/events/eventList";

function AdminOptions({ createAction, selectedEvent, updateAction }) {
  const eventCreateModalRef = useRef(null);
  const eventEditModalRef = useRef(null);
  return (
    <>
      <Modal
        ariaLabel="Event Create Form Modal"
        buttonId="event-create-form-button"
        modalId="event-create-form-modal"
        title="Crear Nuevo Evento"
        triggerStyles="btn btn-primary btn-block mb-3"
        triggerText="Crear nuevo evento"
        ref={eventCreateModalRef}
      >
        <EventForm
          close={() => eventCreateModalRef.current.onClose()}
          selectedEvent={{}}
          action={createAction}
        />
      </Modal>
      {!isEmpty(selectedEvent) && (
        <Modal
          ariaLabel="Event Edit Form Modal"
          buttonId="event-edit-form-button"
          modalId="event-edit-form-modal"
          title="Editar Evento"
          triggerStyles="btn btn-primary btn-block mb-3"
          triggerText="Editar evento"
          ref={eventEditModalRef}
        >
          <EventForm
            close={() => eventEditModalRef.current.onClose()}
            selectedEvent={selectedEvent}
            action={updateAction}
          />
        </Modal>
      )}
    </>
  );
}

AdminOptions.propTypes = {
  createAction: PropTypes.func.isRequired,
  selectedEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updateAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createAction: createEvent,
      updateAction: updateEvent,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  selectedEvent: showEvent(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOptions);
