// React
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

// Bootstrap
import { Button, Form } from "react-bootstrap";

// Apollo & GraphQL
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../graphql/queries/inner_queries";

// Custom Hooks
import { useLogin } from "../hooks";

export default function LoginComponent() {
  const { data } = useQuery(IS_LOGGED_IN);
  const { isLoggedIn } = data;

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [validForm, setValidForm] = useState(false);

  const { register, handleSubmit, errors, formState } = useForm();
  // Read the formState before render to subscribe the form state through Proxy
  const { touched } = formState;

  const { error } = useLogin(mail, password, validForm);

  useEffect(() => {
    if (error) {
      if (error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED") {
        setValidationError("Credenciales inválidas");
      } else {
        setValidationError("Error. Intente de nuevo.");
      }
      setValidForm(false);
    }
  }, [error]);
  const validateForm = () => setValidForm(true);

  return !isLoggedIn ? (
    <div className="login-background">
      <div className="login-form-container">
        <h1>Inicia sesión</h1>
        <p id="login-error-message">{validationError}</p>
        <Form onSubmit={handleSubmit(validateForm)}>
          <Form.Group>
            <Form.Control
              name="mail"
              ref={register({
                required: "Correo requerido",
                pattern: {
                  value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                  message: "Correo inválido",
                },
              })}
              type="mail"
              placeholder="Correo"
              onChange={(event) => {
                setMail(event.target.value);
              }}
              className="login-text-input"
              isInvalid={(touched.mail && mail === "") || errors.mail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.mail ? errors.mail.message : null}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="password"
              ref={register({
                required: "Contraseña requerida",
              })}
              type="password"
              placeholder="Contraseña"
              onChange={(event) => setPassword(event.target.value)}
              className="login-text-input"
              isInvalid={
                (touched.password && password === "") || errors.password
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.password ? errors.password.message : null}
            </Form.Control.Feedback>
          </Form.Group>
          {/* TODO: Cambiar color botón al hacer click */}
          <Button
            variant="primary"
            block
            className="login-button no-decoration"
            type="submit"
          >
            Ingresar
          </Button>
        </Form>
        <span>
          <a id="login-signup-link" href="/signup">
            ¿No tienes una cuenta? Regístrate aquí
          </a>
        </span>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
