import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../graphql/mutations/users';
 


export default function SignUpComponent() {
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('employer');
  // TODO: profile picture & CV

  const [signUp, {data}] = useMutation(CREATE_USER, {
    onCompleted(data) {
      console.log(data)},
    onError(error) {
      console.log(error)
    }});

  // TODO: obtener roles (lista de roles)
  // 

  const onHandleSubmit = (event) => {
    // TODO: backend call
    event.preventDefault();
    console.log(name);
    signUp({ variables: { 
      name: name,
      rut: rut,
      mail: mail,
      password: password,
      address: address,
      phone: phone,
      roleId: role,
     }})
  }

  return(
    <div class="background">
      <div class="form-container">
        <h1>Regístrate</h1>
        <Form>
          <Form.Group>
            <Form.Control type="name" placeholder="Nombre" onChange={(event)=>setName(event.target.value)} className="text-input"/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="rut" placeholder="Rut" onChange={(event)=>setRut(event.target.value)} className="text-input"/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="mail" placeholder="Correo" onChange={(event)=>setMail(event.target.value)} className="text-input"/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" placeholder="Contraseña" onChange={(event)=>setPassword(event.target.value)} className="text-input"/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="address" placeholder="Dirección" onChange={(event)=>setAddress(event.target.value)} className="text-input"/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="phone" placeholder="Teléfono" onChange={(event)=>setPhone(event.target.value)} className="text-input"/>
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
          {/* TODO: validation */}
        </Form>
        <span><a id="login-link">¿Ya tienes una cuenta? Ingresa aquí</a></span>
      </div>
    </div>
  )
}