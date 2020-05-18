// React
import React, { useState } from 'react';

// Bootstrap
import { Button, Form, Modal } from 'react-bootstrap';


function EditProfileForm(props) {
  
  const { name, address, mail, rut, phone } = props.dataUser;
  const [newName, setNewName] = useState(name);
  const [newRut, setNewRut] = useState(rut);
  const [newMail, setNewMail] = useState(mail);
  const [newPassword, setNewPassword] = useState('');
  const [newAddress, setNewAddress] = useState(address);
  const [newPhone, setNewPhone] = useState(phone);
  const [validationError, setValidationError] = useState();

  const onHandleSubmit =(props) => {
    console.log('submited!')
  }
  return(
    <div>
      <p id="error-message">{validationError}</p>
      <Form>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="name" placeholder={newName} onChange={(event)=>setNewName(event.target.value)} className="text-input"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Rut</Form.Label>
          <Form.Control type="rut" placeholder={newRut} onChange={(event)=>setNewRut(event.target.value)} className="text-input"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Correo</Form.Label>
          <Form.Control type="mail" placeholder={newMail} onChange={(event)=>setNewMail(event.target.value)} className="text-input"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder={newPassword} onChange={(event)=>setNewPassword(event.target.value)} className="text-input"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="address" placeholder={newAddress} onChange={(event)=>setNewAddress(event.target.value)} className="text-input"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="phone" placeholder={newPhone} onChange={(event)=>setNewPhone(event.target.value)} className="text-input"/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onHandleSubmit} block className="signup-button">Registrar</Button>
      </Form>
    </div>
  )
}

export default function EditProfileComponent (props){
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return(
       <>
      <Button variant="outline-light" onClick={handleShow} className="background-pink">
        Editar perfil
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar perfil de usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfileForm dataUser={props.dataUser} closeModal={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  )
}