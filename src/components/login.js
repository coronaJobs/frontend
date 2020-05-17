// React
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Bootstrap
import { Button, Form } from 'react-bootstrap';

// Apollo & GraphQL
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../graphql/queries/inner_queries';

// Custom Hooks
import { useLogin } from '../hooks';


export default function LoginComponent() {
  const { data } = useQuery(IS_LOGGED_IN);
  const { isLoggedIn } = data;

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  
  const [validForm, setValidForm] = useState(false);

  const { error } = useLogin(mail, password, validForm);

  useEffect(() => { setValidationError(error) }, [error]);

  const validateForm = () => {
    if (!mail || !password) {
      setValidationError('Debes rellenar todos los campos para poder iniciar sesión.');
      setValidForm(false);
    } else {
      setValidationError();
      setValidForm(true);
    }
  }

  return(
    !isLoggedIn ? (
      <div className="login-background">
        <div className="login-form-container">
          <h1>Inicia sesión</h1>
          <p id="login-error-message">{validationError}</p>
          <Form>
            <Form.Group>
              <Form.Control type="mail" placeholder="Correo" onChange={(event)=>setMail(event.target.value)} className="login-text-input"/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Contraseña" onChange={(event)=>setPassword(event.target.value)} className="login-text-input"/>
            </Form.Group>
            {/* TODO: Cambiar color botón al hacer click */}
            <Button
              variant="primary"
              onClick={validateForm}
              block
              className="login-button"
            >
              Ingresar
            </Button>
          </Form>
          <span><a id="login-signup-link" href='/signup'>¿No tienes una cuenta? Regístrate aquí</a></span>
        </div>
      </div>
    ) : <Redirect to="/" />
  );
};
