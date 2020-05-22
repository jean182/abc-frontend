import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEmpty, pickBy, identity } from "lodash";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import translate from "../../helpers/i18n";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../../redux/modules/users/userList";

function UserForm(props) {
  const {
    clearSelectedUser,
    createAction,
    deleteAction,
    selectedUser,
    updateAction,
  } = props;
  const { register, handleSubmit, errors } = useForm();
  const formRef = useRef(null);
  const onSubmit = (data, event) => {
    let userParams = {};
    if (isEmpty(selectedUser)) {
      userParams = {
        user: {
          ...data,
          passwordConfirmation: data.password,
        },
      };
      createAction({ user: userParams, swal: Swal });
      event.target.reset();
    } else {
      userParams = {
        id: selectedUser.id,
        user: {
          ...pickBy(data, identity),
        },
      };
      updateAction({ user: userParams, swal: Swal });
    }
  };

  const destroyUser = () => {
    deleteAction({ id: selectedUser.id, swal: Swal });
    clearSelectedUser();
  };

  useEffect(() => {
    if (!isEmpty(selectedUser)) {
      formRef.current.reset();
    }
  }, [selectedUser]);

  return (
    <Form
      id="user-form"
      className="user-form-container"
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
      autoComplete="off"
    >
      <div className="form-group">
        <label htmlFor="name">{translate("userForm.name")}</label>
        <Form.Control
          name="name"
          className={errors.name ? "is-invalid" : "valid"}
          ref={register({ required: true })}
          defaultValue={selectedUser ? selectedUser.name : ""}
          placeholder={translate("userForm.name")}
        />
        {errors.name && (
          <div className="invalid-feedback">
            {`${translate("userForm.name")} no puede estar vacio`}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="username">{translate("userForm.username")}</label>
        <Form.Control
          name="username"
          className={errors.username ? "is-invalid" : "valid"}
          defaultValue={selectedUser ? selectedUser.username : ""}
          ref={register({ required: true })}
          placeholder={translate("userForm.username")}
        />
        {errors.username && (
          <div className="invalid-feedback">
            {`${translate("userForm.username")} no puede estar vacio`}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">{translate("userForm.email")}</label>
        <Form.Control
          name="email"
          className={errors.email ? "is-invalid" : "valid"}
          type="email"
          defaultValue={
            selectedUser && selectedUser.email ? selectedUser.email : ""
          }
          ref={register({ required: true })}
          placeholder={translate("userForm.email")}
        />
        {errors.email && (
          <div className="invalid-feedback">
            {`${translate("userForm.email")} no puede estar vacio`}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">{translate("userForm.password")}</label>
        <Form.Control
          name="password"
          className={
            errors.password && isEmpty(selectedUser) ? "is-invalid" : "valid"
          }
          type="password"
          ref={register({ required: isEmpty(selectedUser) })}
          placeholder={translate("userForm.password")}
        />
        {errors.password && isEmpty(selectedUser) && (
          <div className="invalid-feedback">
            {`${translate("userForm.password")} no puede estar vacio`}
          </div>
        )}
      </div>
      <input
        type="submit"
        className="btn btn-priamry"
        value={
          isEmpty(selectedUser)
            ? translate("userForm.create")
            : translate("userForm.edit")
        }
      />
      {!isEmpty(selectedUser) && (
        <button
          type="button"
          className="ml-2 btn btn-danger"
          onClick={destroyUser}
        >
          {translate("userForm.delete")}
        </button>
      )}
    </Form>
  );
}

UserForm.propTypes = {
  clearSelectedUser: PropTypes.func.isRequired,
  createAction: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
  selectedUser: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updateAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createAction: createUser,
      deleteAction: deleteUser,
      updateAction: updateUser,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(UserForm);
