// React
import React, { Fragment, useState } from "react";
import { useForm } from 'react-hook-form';

// Apollo & GraphQL
import { useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER } from "../../graphql/queries/inner_queries";
import { EDIT_USER, PROFILE_PICTURE_ERROR } from "../../graphql/mutations/users";

// CSS & Bootstrap
import "../../assets/css/user/userProfile.css";
import { Col, Button, Form, Image, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Axios
import axios from 'axios';

// Others
import DefaultPicture from "../../assets/images/userProfile-default.png";
import RatingStars from "../ratingStars";

function PictureProfile(props) {
  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState();
  const [newImagePreview, setNewImagePreview] = useState();
  const [newImageMime, setNewImageMime] = useState();
  const [newImageName, setNewImageName] = useState();
  const [validationError, setValidationError] = useState();
  const [imageSrc, setImgSrc] = useState(props.pictureUrl ? props.pictureUrl.split("?")[0] : null);

  const { handleSubmit } = useForm();

  const [cancelProfilePicUpload] = useMutation(PROFILE_PICTURE_ERROR, {
    onCompleted({ profilePictureUploadError }) {
      console.log('CANCEL PROFILE PIC MUTATION COMPLETED');
      console.log(profilePictureUploadError);
      setValidationError('Error enviando la foto al servidor. Por favor inténtelo de nuevo.')
    },
    onError(error){
      console.log('ERROR CANCELLING PICTURE');
      console.log(error);
    }
  });

  const [editUser] = useMutation(EDIT_USER, {
    onCompleted({ editUser }) {
      const parsedUrl = editUser.profilePicture.split('?');
      const options = {
        params: {
          Key: newImage.name,
          ContentType: newImage.type,
        },
        headers: {
          'Content-Type': newImage.type,
          "x-amz-acl": "public-read",
        }
      };
      axios.put(
        parsedUrl[0],
        newImage,
        options
      ).then(function (response) {
        console.log('PICTURE UPLOADED CORRECTLY');
        console.log(response);
        setImgSrc(response.config.url);
        setShowModal(false);
        // toast('Foto actualizada con éxito', {
        //   position: "top-center",
        //   autoClose: false,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // })
      }).catch(function (error) {
        // console.log('ERROR UPLOADING PICTURE');
        // console.log(error);
        cancelProfilePicUpload();
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
      profilePicture: newImageMime,
    }});
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="center d-flex flex-column">
        <span>{props.role === "employer" ? "Empleador" : "Trabajador"}</span>
        <Image
          src={props.pictureUrl ? imageSrc : DefaultPicture}
          className="pictureProfile-picture-profile my-1"
        />
        <RatingStars rating={props.rating}></RatingStars>
        {props.canEdit ? (
          <Button
            variant="outline-light"
            className="editUser-button-pink mt-4"
            onClick={handleShow}
          >
            Editar foto
          </Button>
        ) : null}
      </div>
      <Modal show={showModal} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Editar foto de perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <Image
              src={newImage ? newImagePreview : DefaultPicture}
              className="pictureProfile-picture-profile mb-5 mt-1"
            />
            <p id="error-message">{validationError}</p>
            <Form onSubmit={handleSubmit(validateForm)}>
              <Form.Group>
                <Form.File
                  onChange={(e)=>{
                    if (e.target.files && e.target.files[0]) {
                      const mime = e.target.files[0].type
                      const filename = e.target.files[0].name
                      setNewImagePreview(URL.createObjectURL(e.target.files[0]))
                      setNewImage(e.target.files[0]);
                      setNewImageMime(mime);
                      setNewImageName(filename);
                    }
                  }}
                  accept="image/jpeg"
                />
              </Form.Group>
              {newImage ? (
                <Button
                  variant="primary"
                  block
                  className="signup-button"
                  type="submit"
                >
                  Enviar Foto
                </Button>
              ) : null}
            </Form>
          </Col>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default PictureProfile;
