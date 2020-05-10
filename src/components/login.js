// React
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Bootstrap
import { Button, Form } from 'react-bootstrap';

// Apollo & GraphQL
import { useApolloClient, useMutation, useQuery} from '@apollo/client';
import { LOGIN } from '../graphql/mutations/users';
import { IS_LOGGED_IN } from '../graphql/queries/inner_queries';


export default function LoginComponent() {
  const client = useApolloClient();

  const { data } = useQuery(IS_LOGGED_IN);
  const { isLoggedIn } = data;

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState(''); 
  
  const [login] = useMutation(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem('token', login);

			client.cache.writeData({
				data: {
					isLoggedIn: true,
				}
      });
    },
    onError(error) {
      console.log(error);
      setValidationError('Correo o contraseña inválidos.');
    }});

  const validateForm = () => {
    if (!mail || !password) {
      setValidationError('Debes rellenar todos los campos para poder iniciar sesión.');
      return false;
    } else {
      setValidationError('');
      return true;
    }
  }

  const onHandleSubmit = () => {
    if (validateForm()){
      login({
        variables:{
          mail: mail,
          password: password,
        }
      });
    } 
  }

  return(
    !isLoggedIn ? (
      <div class="login-background">
        <div class="login-form-container">
          <h1>Inicia sesión</h1>
          <p id="error-message">{validationError}</p>
          <Form>
            <Form.Group>
              <Form.Control type="mail" placeholder="Correo" onChange={(event)=>setMail(event.target.value)} className="text-input"/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Contraseña" onChange={(event)=>setPassword(event.target.value)} className="text-input"/>
            </Form.Group>
            {/* TODO: Cambiar color botón al hacer click */}
            <Button variant="primary" onClick={onHandleSubmit} block className="login-button">Ingresar</Button>
          </Form>
          <span><a id="signup-link" href='/signup'>¿No tienes una cuenta? Regístrate aquí</a></span>
        </div>
      </div>
    ) : <Redirect to="/" />
  );
};
