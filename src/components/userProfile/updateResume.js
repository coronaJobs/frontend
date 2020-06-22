// React
import React, { Fragment, useState } from "react";
import { useForm } from 'react-hook-form';

// Bootstrap & Toastify
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Apollo & GraphQL
import { useQuery, useMutation } from "@apollo/client";
import { CURRENT_USER } from "../../graphql/queries/inner_queries";
import { EDIT_USER, RESUME_ERROR } from "../../graphql/mutations/users";

// Axios
import axios from 'axios';


export default function UpdateResumeComponent() {
  const [showModal, setShowModal] = useState(false);
  const [newResume, setNewResume] = useState();
  const [newResumeMime, setNewResumeMime] = useState();
  const [newResumeName, setNewResumeName] = useState();
  const [validationError, setValidationError] = useState();

  const { register, handleSubmit, errors, formState } = useForm();
  // Read the formState before render to subscribe the form state through Proxy
  // const { touched } = formState;

  // TODO: Delete debug console logs
  const [cancelResumeUpload] = useMutation(RESUME_ERROR, {
    onCompleted({ resumeUploadError }) {
      console.log('CANCEL RESUME ERROR MUTATION COMPLETED');
      console.log(resumeUploadError);
      setValidationError('Error enviando el curriculum al servidor. Por favor inténtelo de nuevo.')
    },
    onError(error){
      console.log('ERROR CANCELLING RESUME');
      console.log(error);
    }
  });

  const [editUser] = useMutation(EDIT_USER, {
    onCompleted({ editUser }) {
      const parsedUrl = editUser.resumeUrl.split('?');
      const options = {
        params: {
          Key: newResume.name,
          ContentType: newResume.type,
        },
        headers: {
          'Content-Type': newResume.type,
          "x-amz-acl": "public-read",
        }
      };
      axios.put(
        parsedUrl[0],
        newResume,
        options
      ).then(function (response) {
        // console.log('CV UPLOADED CORRECTLY');
        // console.log(response);
        setShowModal(false);
        toast('Curriculum actualizado con éxito', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }).catch(function (error) {
        // console.log('ERROR UPLOADING CV');
        // console.log(error);
        cancelResumeUpload();
      });
    },
    onError() {
      setValidationError("Ha ocurrido un error. Por favor inténtelo de nuevo.");
    },
  });

  const currentUserQuery = useQuery(CURRENT_USER);
  const { currentUser } = currentUserQuery.data;

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const validateForm = () => {
    editUser({ variables: {
      id: currentUser.id,
      resumeUrl: newResumeMime,
    }});
  };

  return(
    <Fragment>
      <Button onClick={handleShow} className="editUser-button-pink my-1" variant="outline-light">
        Actualizar Curriculum
      </Button>
      <ToastContainer />
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
        <Modal.Title>Actualizar Curriculum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p id="error-message">{validationError}</p>
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
                    const mime = e.target.files[0] ? e.target.files[0].type : null
                    const filename = e.target.files[0] ? e.target.files[0].name : null
                    setNewResume(e.target.files[0]);
                    setNewResumeMime(mime);
                    setNewResumeName(filename);
                  }}
                />
                <Form.File.Label className="signup-file-input">Curriculum</Form.File.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.resume ? `${newResumeName} : ${errors.resume.message}` : null}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  {!errors.resume && newResume ? `${newResumeName} cargado con éxito` : null}
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
