import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { bindActionCreators } from "redux";
import Swal from "sweetalert2";
import Modal from "../../components/Modal/Modal";
import EventForm from "../../components/Surveys/EventForm";
import { showEvent } from "../../redux/modules/events/event";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "../../redux/modules/events/eventList";

function AdminOptions({
  createAction,
  deleteAction,
  selectedEvent,
  updateAction,
}) {
  const eventCreateModalRef = useRef(null);
  const eventEditModalRef = useRef(null);

  const destroyUser = () => {
    deleteAction({ id: selectedEvent.id, swal: Swal });
  };

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
        <>
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
          <button
            type="button"
            className="btn btn-primary btn-block mb-3"
            onClick={destroyUser}
          >
            Deshabilitar Evento
          </button>
        </>
      )}
    </>
  );
}

AdminOptions.propTypes = {
  createAction: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
  selectedEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updateAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createAction: createEvent,
      deleteAction: deleteEvent,
      updateAction: updateEvent,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  selectedEvent: showEvent(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOptions);
