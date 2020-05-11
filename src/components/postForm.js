// React
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Bootstrap
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';

// Apollo & GraphQL
import { useApolloClient, useMutation, useQuery} from '@apollo/client';
import { CREATE_POST } from '../graphql/mutations/posts';

 function PostForm (props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [applicantLimit, setApplicantLimit] = useState(1); 
  const [validationError, setValidationError] = useState('');
  const [triggerRedirect, setTriggerRedirect] = useState(false);
  
  const [createPost] = useMutation(CREATE_POST, {
    onCompleted({ data }){
      console.log(data);
      setTriggerRedirect(true);
    },
    onError(error){
      console.log(error);
      setValidationError('Ha ocurrido un error. Por favor inténtelo de nuevo.')
    }
  });

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      createPost({variables: {
        name: name,
        description: description,
        applicantLimit: applicantLimit,
        ownerId: 1,
      }})
    }
  }

  const validateForm = () => {
    if (!name || !description) {
      setValidationError('Debes rellenar todos los campos para poder publicar una oferta.');
      return false;
    } else {
      setValidationError('');
      return true;
    }
  }

  return(
    !triggerRedirect ? (
    <Form>
      <p id="error-message">{validationError}</p>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Título del trabajo</Form.Label>
            <Form.Control type="name" onChange={(event)=>setName(event.target.value)} className="text-input"/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Cantidad de trabajadores</Form.Label>
            <Form.Control as="select" custom onChange={(event)=>setApplicantLimit(+event.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group>
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" rows="3" placeholder="Escribe la descripción del trabajo..." onChange={(event)=>setDescription(event.target.value)} className="text-input"/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onHandleSubmit} block className="signup-button">Registrar</Button>
    </Form>
    ) : <Redirect to={'/'} /> 
  )
}

export default function PostFormComponent (props) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return(
    <>
      <Button variant="primary" onClick={handleShow}>
        Publicar oferta de trabajo
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nueva publicación de trabajo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostForm userId={props.userId} />
        </Modal.Body>
      </Modal>
    </>
  )
}