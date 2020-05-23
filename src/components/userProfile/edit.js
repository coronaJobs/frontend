import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { EDIT_USER } from "../../graphql/mutations/users";

function EditProfileForm(props) {
  const { id, name, rut, mail, address, phone } = props.dataUser;
  const [newName, setNewName] = useState(name);
  const [newRut, setNewRut] = useState(rut);
  const [newMail, setNewMail] = useState(mail);
  // const [newPassword, setNewPassword] = useState('');
  const [newAddress, setNewAddress] = useState(address);
  const [newPhone, setNewPhone] = useState(phone);
  const [validationError, setValidationError] = useState();

  const [editUser] = useMutation(EDIT_USER, {
    onCompleted({ data }) {
      props.closeModal();
      props.editUserUpdate({
        newName: newName,
        newAddress: newAddress,
        newMail: newMail,
        newRut: newRut,
        newPhone: newPhone,
      });
    },
    onError(error) {
      setValidationError("Ha ocurrido un error. Por favor inténtelo de nuevo.");
    },
  });

  const onHandleSubmit = (event) => {
    event.preventDefault();
    editUser({
      variables: {
        id: id,
        name: newName,
        rut: newRut,
        mail: newMail,
        address: newAddress,
        phone: newPhone,
      },
    });
  };
  return (
    <div>
      <p id="error-message">{validationError}</p>
      <Form>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="name"
            placeholder={newName}
            onChange={(event) => setNewName(event.target.value)}
            className="editUser-text-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rut</Form.Label>
          <Form.Control
            type="rut"
            placeholder={newRut}
            onChange={(event) => setNewRut(event.target.value)}
            className="editUser-text-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="mail"
            placeholder={newMail}
            onChange={(event) => setNewMail(event.target.value)}
            className="editUser-text-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="address"
            placeholder={newAddress}
            onChange={(event) => setNewAddress(event.target.value)}
            className="editUser-text-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="phone"
            placeholder={newPhone}
            onChange={(event) => setNewPhone(event.target.value)}
            className="editUser-text-input"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={onHandleSubmit}
          block
          className="editUser-button-pink"
        >
          Enviar
        </Button>
      </Form>
    </div>
  );
}

export default function EditProfileComponent(props) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button onClick={handleShow} className="editUser-button-pink">
        Editar perfil
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar perfil de usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfileForm
            dataUser={props.dataUser}
            editUserUpdate={props.editUserUpdate}
            closeModal={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
