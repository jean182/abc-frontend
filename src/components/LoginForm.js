import React from "react";
import { isEmpty } from "lodash";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../redux/modules/auth/auth";
import translate from "../helpers/i18n";

function handleEmailErrors(errors) {
  const { message } = errors.email;
  return message === "invalidEmail" ? (
    <div className="invalid-login-txt">
      {`${translate("loginForm.invalidEmail")}`}
    </div>
  ) : (
    <div className="invalid-login-txt">
      {`${translate("loginForm.emptyEmail")}`}
    </div>
  );
}

function handlePasswordErrors(errors) {
  const { message } = errors.password;
  return message === "Required" ? (
    <div className="invalid-login-txt">
      {`${translate("loginForm.emptyPassword")}`}
    </div>
  ) : (
    <div className="invalid-login-txt">
      {`${translate("loginForm.invalidPassword")}`}
    </div>
  );
}

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
    <>
      {serverErrors.length > 0 && (
        <span className="server-error">Contraseña Incorrecta</span>
      )}
      <form
        className={`needs-validation ${
          !isEmpty(errors) ? "was-validated" : ""
        }col-sm-7 bg-primary shadow-lg login`}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
              {errors.email && handleEmailErrors(errors)}
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
              {errors.password && handlePasswordErrors(errors)}
            </div>
          </div>
          <div className="form-group row align-items-center">
            <div className="col-sm-12 text-sm-right">
              <button type="submit" className="btn btn--login">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
