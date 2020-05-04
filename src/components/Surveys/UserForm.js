import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEmpty, pickBy, identity } from "lodash";
import { useForm } from "react-hook-form";
import translate from "../../helpers/i18n";
import { createUser, updateUser } from "../../redux/modules/users/userList";

function UserForm(props) {
  const { createAction, selectedUser, updateAction } = props;
  const { register, handleSubmit } = useForm();
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
      createAction(userParams);
      event.target.reset();
    } else {
      userParams = {
        id: selectedUser.id,
        user: {
          ...pickBy(data, identity),
        },
      };
      updateAction(userParams);
    }
  };

  useEffect(() => {
    if (!isEmpty(selectedUser)) {
      formRef.current.reset();
    }
  }, [selectedUser]);

  return (
    <form
      id="user-form"
      className="user-form-container"
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
    >
      <div className="form-group">
        <label htmlFor="name">{translate("userForm.name")}</label>
        <input
          name="name"
          className="form-control"
          ref={register({ required: isEmpty(selectedUser) })}
          defaultValue={selectedUser ? selectedUser.name : ""}
          placeholder={translate("userForm.name")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">{translate("userForm.username")}</label>
        <input
          name="username"
          className="form-control"
          defaultValue={selectedUser ? selectedUser.username : ""}
          ref={register({ required: isEmpty(selectedUser) })}
          placeholder={translate("userForm.username")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">{translate("userForm.email")}</label>
        <input
          name="email"
          className="form-control"
          type="email"
          defaultValue={
            selectedUser && selectedUser.email ? selectedUser.email : ""
          }
          ref={register({ required: isEmpty(selectedUser) })}
          placeholder={translate("userForm.email")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">{translate("userForm.password")}</label>
        <input
          name="password"
          className="form-control"
          type="password"
          ref={register({ required: isEmpty(selectedUser) })}
          placeholder={translate("userForm.password")}
        />
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
    </form>
  );
}

UserForm.propTypes = {
  createAction: PropTypes.func.isRequired,
  selectedUser: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updateAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createAction: createUser,
      updateAction: updateUser,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(UserForm);
