import React from "react";
import Modal from "../../components/Modal/Modal";
import UserAdministration from "../../components/Users/UserAdministration";

function AdminOptions() {
  return (
    <>
      <button type="button" className="btn btn-primary btn-block">
        Promedios
      </button>
      <Modal
        ariaLabel="User Form Modal"
        buttonId="user-form-button"
        modalId="user-form-modal"
        title="Administrar Usuarios"
        triggerStyles="btn btn-primary btn-block mb-3"
        triggerText="Usuarios"
      >
        <UserAdministration />
      </Modal>
    </>
  );
}

export default AdminOptions;
