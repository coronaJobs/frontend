// React
import React, { Fragment, useState } from "react";
import { useForm } from 'react-hook-form';

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// Apollo & GraphQL
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../../graphql/queries/inner_queries";

export default function UpdateResumeComponent() {
  const [showModal, setShowModal] = useState(false);
  const [newResume, setNewResume] = useState();

  const { register, handleSubmit, errors, formState } = useForm();
  // Read the formState before render to subscribe the form state through Proxy
  // const { touched } = formState;

  const currentUserQuery = useQuery(CURRENT_USER);
  const { currentUser } = currentUserQuery.data;

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const validateForm = () => {};

  return(
    <Fragment>
      <Button onClick={handleShow} className="editUser-button-pink">
        Actualizar Curriculum
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
        <Modal.Title>Actualizar Curriculum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(validateForm)}>
            <Form.Group>
              <Form.File
                id="resume-file"
                className="signup-file-input"
                custom
              >
                <Form.File.Input
                  name="resume"
                  ref={register({
                    pattern: {
                      value: /^.*\.(pdf|PDF)$/,
                      message: "Formato de archivo inválido."
                    }
                  })}
                  isValid={!errors.resume && newResume}
                  isInvalid={!!errors.resume}
                  onChange={(e)=>{
                    const filename = e.currentTarget.value.split(/[\\,/]/).pop();
                    setNewResume(filename);
                  }}
                />
                <Form.File.Label className="signup-file-input">Curriculum</Form.File.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.resume ? `${newResume} : ${errors.resume.message}` : null}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  {!errors.resume && newResume ? `${newResume} cargado con éxito` : null}
                </Form.Control.Feedback>
              </Form.File>
            </Form.Group>
            {newResume ? 
              <Button
                variant="primary"
                block
                className="signup-button"
                type="submit"
              >
                Enviar Cambios
              </Button>
            : null
            }
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}
