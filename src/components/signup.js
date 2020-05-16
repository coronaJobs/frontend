import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';

import { CREATE_USER, LOGIN } from '../graphql/mutations/users';
import { IS_LOGGED_IN } from '../graphql/queries/inner_queries';
import { Redirect } from 'react-router-dom';
 

export default function SignUpComponent() {
  const client = useApolloClient();

  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState(1);
  const [validationError, setValidationError] = useState('');

  // TODO: profile picture & CV (proximo sprint)

  const { data } = useQuery(IS_LOGGED_IN);
  const { isLoggedIn } = data;

  const [login] = useMutation(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem('token', login);
      client.cache.writeData({
        data: {
          isLoggedIn: true,
        }
      });
    }
  });

  const [signUp] = useMutation(CREATE_USER, {
    onCompleted({ createUser }) {
      login({
        variables: {
          mail: createUser.mail,
          password: password,
        }
      });
      // client.cache.writeData({
      //   data: {
      //     currentUser: createUser,
      //   }
      // });
    },
    onError(error) {
      setValidationError('Error. Por favor inténtelo de nuevo.')
      console.log(error)
    }});

  // TODO: obtener roles (lista de roles) (no esta listo en backend)

  const validateForm = () => {
    if (!name || !rut || !mail || !password || !address || !phone) {
      setValidationError('Debes rellenar todos los campos para poder registrarte.');
      return false;
    } else {
      setValidationError('');
      return true;
    }
  }

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      signUp({ variables: { 
        name: name,
        rut: rut,
        mail: mail,
        password: password,
        address: address,
        phone: phone,
        role: role,
       }})
    }
  }

  return(
    !isLoggedIn ? (
      <div class="signup-background">
        <div class="signup-form-container">
          <h1>Regístrate</h1>
          <p id="signup-error-message">{validationError}</p>
          <Form>
            <Form.Group>
              <Form.Control type="name" placeholder="Nombre" onChange={(event)=>setName(event.target.value)} className="signup-text-input"/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="rut" placeholder="Rut" onChange={(event)=>setRut(event.target.value)} className="signup-text-input"/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="mail" placeholder="Correo" onChange={(event)=>setMail(event.target.value)} className="signup-text-input"/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Contraseña" onChange={(event)=>setPassword(event.target.value)} className="signup-text-input"/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="address" placeholder="Dirección" onChange={(event)=>setAddress(event.target.value)} className="signup-text-input"/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="phone" placeholder="Teléfono" onChange={(event)=>setPhone(event.target.value)} className="signup-text-input"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Selecciona un tipo de usuario:</Form.Label>
              <Row>
                <Col>
                  <Form.Check type="radio" label="Empleador" checked={role===1} onChange={()=>(setRole(1))} />
                </Col>
                <Col>
                  <Form.Check type="radio" label="Trabajador" checked={role===2} onChange={()=>(setRole(2))} />
                </Col>
              </Row>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onHandleSubmit} block className="signup-button">Registrar</Button>
          </Form>
          <span><a id="signup-login-link" href='/login'>¿Ya tienes una cuenta? Ingresa aquí</a></span>
        </div>
      </div>
    ) : <Redirect to="/" />
  )
}