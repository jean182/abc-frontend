import React from "react";
import { isEmpty } from "lodash";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../redux/modules/auth/auth";
import Errors from "./Errors";
import translate from "../helpers/i18n";

function LoginForm() {
  const history = useHistory();
  const location = useLocation();
  const serverErrors = useSelector((state) => state.authReducer.errors);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const { from } = location.state || {
    from: { pathname: translate("routes.home") },
  };

  const onSubmit = (data) => {
    dispatch(login({ ...data, history, from }));
  };

  return (
    <form
      className={`needs-validation ${
        !isEmpty(errors) ? "was-validated" : ""
      }col-sm-7 bg-primary shadow-lg login`}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {serverErrors.length > 0 &&
        serverErrors.map((error) => (
          <span key={error.time} className="text-danger">
            {error.body}
          </span>
        ))}
      <div className="login--header">
        <h3>Bienvenido a la plataforma de Riesgo Legislativo</h3>
        <h4>Calificación de eventos con impacto en la banca</h4>
      </div>
      <div className="login--inputs-container">
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
              required
              pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$"
              ref={register({
                required: "required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalidEmail",
                },
              })}
            />
            {errors.email && <Errors errors={errors} objectKey="email" />}
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
              required
              minLength="6"
              ref={register({
                required: "Required",
                minLength: { value: 6, message: "minLength" },
              })}
            />
            {errors.password && <Errors errors={errors} objectKey="password" />}
          </div>
        </div>
        <div className="form-group row align-items-center">
          <div className="col-sm-6 col-form-label login--pass-recover">
            <a
              className="text-white"
              href="https://www.facebook.com/AsociacionBancariaCostarricense/"
            >
              Recuperar contraseña
            </a>
          </div>
          <div className="col-sm-6 text-sm-right">
            <button type="submit" className="btn btn--login">
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
