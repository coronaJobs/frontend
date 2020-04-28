import React, { useState } from 'react';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function SignUpComponent() {
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  // TODO: profile picture & CV

  const onHandleSubmit = () => {
    // TODO: backend call
    console.log(name);
  }

  return(
    <Container>
      
      <h1>Regístrate</h1>
      <Form>
        <Form.Group>
          <Form.Control type="name" placeholder="Nombre" onChange={(event)=>setName(event.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Control type="rut" placeholder="Rut" onChange={(event)=>setRut(event.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Control type="email" placeholder="Correo" onChange={(event)=>setEmail(event.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Control type="password" placeholder="Contraseña" onChange={(event)=>setPassword(event.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Control type="address" placeholder="Dirección" onChange={(event)=>setAddress(event.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Control type="phone" placeholder="Teléfono" onChange={(event)=>setPhone(event.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Selecciona un tipo de usuario:</Form.Label>
          <Row>
            <Col>
              <Form.Check type="radio" label="Empleador" />
            </Col>
            <Col>
              <Form.Check type="radio" label="Trabajador" />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onHandleSubmit} block>Registrar</Button>
         {/* TODO: validation */}
      </Form>
      <span><a>¿Ya tienes una cuenta? Ingresa aquí</a></span>
    </Container>
  )
}