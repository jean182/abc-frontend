import React from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginForm({ fakeAuth }) {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/home" } };
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <form
      className="col-sm-6 bg-primary shadow-lg p-sm-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group row">
        <label
          htmlFor="email"
          className="col-sm-3 col-form-label text-capitalize text-white"
        >
          Usuario:
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            id="email"
            type="text"
            name="email"
            placeholder="Correo Electrónico"
            ref={register}
          />
        </div>
      </div>
      <div className="form-group row">
        <label
          htmlFor="password"
          className="col-sm-3 col-form-label text-capitalize text-white"
        >
          contraseña:
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            ref={register}
          />
        </div>
      </div>
      <div className="form-group row align-items-center">
        <div className="col-sm-6 col-form-label">
          <a className="text-white" href="https://facebook.com">
            Recuperar contraseña
          </a>
        </div>
        <div className="col-sm-6 text-sm-right">
          <button type="submit" className="btn btn-success">
            Ingresar
          </button>
        </div>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  fakeAuth: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default LoginForm;
