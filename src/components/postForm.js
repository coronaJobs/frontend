// React
import React, { useState } from "react";
import Select from "react-select";
import { Redirect } from "react-router-dom";

// Bootstrap
import { Button, Form, Row, Col, Modal } from "react-bootstrap";

// Apollo & GraphQL
import { useApolloClient, useQuery, useMutation } from "@apollo/client";
import { CREATE_POST } from "../graphql/mutations/posts";
import { GET_COMMUNES } from "./../graphql/queries/communes";

import "../assets/css/postForm.css";
function PostForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [applicantLimit, setApplicantLimit] = useState(1);
  const [validationError, setValidationError] = useState("");
  const [triggerRedirect, setTriggerRedirect] = useState(false);
  const [communeId, setCommuneId] = useState("");

  // get apollo client
  const client = useApolloClient();

  // get communes
  const { data, loading, error } = useQuery(GET_COMMUNES, {
    fetchPolicy: "cache-first",
  });

  const communes = [];

  if (!loading && !error) {
    const rawCommunes = data.getCommunes;
    rawCommunes.map((commune) => {
      communes.push({
        value: commune.id,
        label: commune.name,
        __typename: commune.__typename,
      });
    });
    client.cache.writeData({
      data: { getCommunes: communes },
    });
  }

  const handleCommuneChange = (event) => {
    if (event) {
      setCommuneId(event);
    } else {
      // nothing selected
      setCommuneId("");
    }
  };

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted({ data }) {
      props.closeModal();
      setTriggerRedirect(true);
    },
    onError(error) {
      setValidationError("Ha ocurrido un error. Por favor inténtelo de nuevo.");
      console.log(error);
      console.log(typeof communeId.value);
    },
  });

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      createPost({
        variables: {
          name: name,
          description: description,
          applicantLimit: applicantLimit,
          ownerId: +props.userId,
          communeId: communeId.value,
        },
      });
    }
  };

  const validateForm = () => {
    if (!name || !description || !communeId) {
      setValidationError(
        "Debes rellenar todos los campos para poder publicar una oferta."
      );
      return false;
    } else {
      setValidationError("");
      return true;
    }
  };

  return !triggerRedirect ? (
    <Form>
      <p id="error-message">{validationError}</p>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Título del trabajo</Form.Label>
            <Form.Control
              type="name"
              onChange={(event) => setName(event.target.value)}
              className="postForm-text-input"
            />
          </Form.Group>
          <Form.Group className="w-100">
            <Form.Label>Comuna del trabajo</Form.Label>
            <Select
              isMulti={false}
              className="basic-single w-75"
              classNamePrefix="select"
              isLoading={loading}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name="color"
              options={communes}
              placeholder="Selecciona una comuna"
              onChange={handleCommuneChange}
              noOptionsMessage={() => "No hay resultados"}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Cantidad de trabajadores</Form.Label>
            <Form.Control
              as="select"
              custom
              onChange={(event) => setApplicantLimit(+event.target.value)}
              className="postForm-dropdown"
            >
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
        <Form.Control
          as="textarea"
          rows="3"
          placeholder="Escribe la descripción del trabajo..."
          onChange={(event) => setDescription(event.target.value)}
          className="postForm-text-input"
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={onHandleSubmit}
        block
        className="signup-button"
      >
        Publicar
      </Button>
    </Form>
  ) : (
    <Redirect to={`/users/${props.userId}`} />
  );
}

export default function PostFormComponent(props) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button
        variant="outline-light"
        onClick={handleShow}
        className="postForm-button-pink"
      >
        Publicar oferta de trabajo
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nueva publicación de trabajo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostForm userId={props.userId} closeModal={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
