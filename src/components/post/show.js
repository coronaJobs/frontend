import React, { useState } from "react";
import { Row, Col, Image, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { useQuery, useMutation } from "@apollo/client";

import DefaultPicture from "../../assets/images/conectar-home.jpg";
import { CURRENT_USER } from "../../graphql/queries/inner_queries";
import { GET_USER_APPLICATIONS } from "../../graphql/queries/applications";
import { CREATE_APPLICATION } from "../../graphql/mutations/applications";
import { Loading } from "../../containers";

export default function PostShowComponent(props) {
  const {
    name,
    description,
    applicantLimit,
    owner,
    state,
    commune,
    id,
  } = props.post;

  function checkApplied(postId, userApplications) {
    return userApplications.some(function (application) {
      return application.id === postId;
    });
  }
  // const [applicationMessage, setApplicationMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [createApplication] = useMutation(CREATE_APPLICATION, {
    onCompleted() {
      setIsApplied(true);
      setShowSuccessAlert(true);
    },
    onError() {
      setShowErrorAlert(true);
    },
  });
  const currentUserQuery = useQuery(CURRENT_USER);
  const { currentUser } = currentUserQuery.data;
  const { data, loading } = useQuery(GET_USER_APPLICATIONS, {
    fetchPolicy: "network-only",
    variables: { id: currentUser.id },
  });
  if (loading) return <Loading />;
  const stateNames = {
    open: "Disponible",
    closed: "No disponible",
  };
  const handleApplication = () => {
    createApplication({ variables: { offerId: id } });
  };
  const applicationButton = !checkApplied(id, data.getUser.applications) ? (
    <Button
      className="postShow-application-button"
      onClick={handleApplication}
      disabled={isApplied}
    >
      Postular
    </Button>
  ) : (
    <p className="postShow-applied-text">Ya has postulado a este trabajo</p>
  );
  return (
    <>
      <Row>
        <Col className="postShow-main-description-col">
          <h1 className="postShow-name">{name}</h1>
          <p>{description.substring(0, 100) + "..."}</p>
          <p>Vacantes: {applicantLimit}</p>
          {currentUser.role.name === "employee" ? applicationButton : null}
          {showSuccessAlert ? (
            <Alert
              variant="success"
              className="postShow-alert"
              onClose={() => setShowSuccessAlert(false)}
              dismissible
            >
              ¡Postulación realizada!
            </Alert>
          ) : null}
          {showErrorAlert ? (
            <Alert
              variant="danger"
              className="postShow-alert"
              onClose={() => setShowErrorAlert(false)}
              dismissible
            >
              No se pudo realizar postulación. Inténtelo más tarde.
            </Alert>
          ) : null}
        </Col>
        <Col className="postShow-image-col">
          <Image src={DefaultPicture} className="postShow-image" fluid />
        </Col>
      </Row>
      <Row className="postShow-secondary-description-row">
        <h3>Detalles</h3>
        <div>
          <h6>Descripción:</h6>
          <p>{description}</p>
        </div>
        <div>
          <ul>
            <li>Empleador: {owner.name}</li>
            <li>Estado: {stateNames[state.name]}</li>
            <li>Comuna: {commune.name}</li>
          </ul>
        </div>
      </Row>
    </>
  );
}

PostShowComponent.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    applicantLimit: PropTypes.number.isRequired,
    owner: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    commune: PropTypes.object.isRequired,
    applicants: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.number.isRequired,
  }),
};
