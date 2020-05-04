import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


export default function LoginComponent() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState(''); 
  

  const validateForm = () => {
    if (!mail || !password) {
      setValidationError('Debes rellenar todos los campos para poder registrarte.');
      return false;
    } else {
      setValidationError('');
      return true;
    }
  }

  const onHandleSubmit = () => {
    if (validateForm()){
      // hermanito mio llamate al login
      console.log('llamando login');
    } 
  }

  return(
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
          <Button variant="primary" type="submit" onClick={onHandleSubmit} block className="login-button">Ingresar</Button>
        </Form>
        <span><a id="signup-link" href='/signup'>¿No tienes una cuenta? Regístrate aquí</a></span>
      </div>
    </div>
  )
}