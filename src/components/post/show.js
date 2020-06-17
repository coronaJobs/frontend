import React, { useState } from "react";
import { Row, Col, Image, Form, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { useQuery, useMutation } from "@apollo/client";

import DefaultPicture from "../../assets/images/conectar-home.jpg";
import { CURRENT_USER } from "../../graphql/queries/inner_queries";
import { GET_USER_APPLICATIONS } from "../../graphql/queries/applications";
import {
  CREATE_APPLICATION,
  ACCEPT_APPLICANT,
} from "../../graphql/mutations/applications";
import {
  START_JOB,
  CANCEL_JOB,
  FINISH_JOB,
} from "../../graphql/mutations/posts";
import { Loading } from "../../containers";

export default function PostShowComponent(props) {
  const {
    name,
    description,
    applicantLimit,
    owner,
    state,
    commune,
    applicants,
    employees,
    id,
  } = props.post;
  function checkApplied(postId, userApplications) {
    return userApplications.some(function (application) {
      return application.id === postId;
    });
  }
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlertEmployer, setShowSuccessAlertEmployer] = useState(
    false
  );
  const [showErrorAlertEmployer, setShowErrorAlertEmployer] = useState(false);
  const [selected, setSelected] = useState([]);
  const [fired, setFired] = useState([]);
  const [isApplied, setIsApplied] = useState(false);
  const currentUserQuery = useQuery(CURRENT_USER);
  const { currentUser } = currentUserQuery.data;

  const stateNames = {
    open: "Disponible",
    closed: "No disponible",
    finished: "Terminada",
    cancelled: "Cancelada",
    initialized: "Iniciada",
  };

  const [createApplication] = useMutation(CREATE_APPLICATION, {
    onCompleted() {
      setIsApplied(true);
      setShowSuccessAlert(true);
    },
    onError() {
      setShowErrorAlert(true);
    },
  });

  const [acceptApplicant] = useMutation(ACCEPT_APPLICANT, {
    onCompleted() {
      setShowSuccessAlertEmployer(true);
    },
    onError() {
      setShowErrorAlertEmployer(true);
    },
  });

  const [startJob] = useMutation(START_JOB, {
    onCompleted() {},
    onError() {},
  });

  const [cancelJob] = useMutation(CANCEL_JOB, {
    onCompleted() {},
    onError() {},
  });

  const [finishJob] = useMutation(FINISH_JOB, {
    onCompleted() {},
    onError() {},
  });

  const { data, loading } = useQuery(GET_USER_APPLICATIONS, {
    fetchPolicy: "network-only",
    variables: { id: currentUser.id },
  });
  if (loading) return <Loading />;

  const handleApplicant = (event, applicant) => {
    if (selected.includes(applicant)) {
      let newSelected = selected;
      newSelected.pop(applicant);
      setSelected([...newSelected]);
    } else {
      setSelected([...selected, applicant]);
    }
  };

  const handleWorker = (event, employee) => {
    if (fired.includes(employee)) {
      let newFired = fired;
      newFired.pop(employee);
      setFired([...newFired]);
    } else {
      setFired([...fired, employee]);
    }
  };

  const onHandleAccept = () => {
    selected.map((applicant) =>
      acceptApplicant({ variables: { offerId: id, applicantId: applicant } })
    );
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

  const handleStart = () => {
    startJob({ variables: { jobId: id } });
  };

  const handleCancel = () => {
    cancelJob({ variables: { jobId: id } });
  };

  const handleFinish = () => {
    finishJob({ variables: { jobId: id } });
  };
  return (
    <>
      <Row>
        <Col className="postShow-main-description-col">
          <h1 className="postShow-name">{name}</h1>
          <p>{description.substring(0, 100) + "..."}</p>
          <p>Vacantes: {applicantLimit}</p>
          {state.name === "open" && currentUser.role.name === "employer" ? (
            <div>
              <Button
                className="postShow-application-button mx-2"
                onClick={handleStart}
              >
                Iniciar trabajo
              </Button>
              <Button
                className="postShow-application-button mx-2"
                onClick={handleCancel}
              >
                Cancelar trabajo
              </Button>
            </div>
          ) : null}
          {state.name === "initialized" &&
          currentUser.role.name === "employer" ? (
            <div>
              <Button
                className="postShow-application-button mx-2"
                onClick={handleFinish}
              >
                Finalizar trabajo
              </Button>
            </div>
          ) : null}
          {currentUser.role.name === "employee" ? applicationButton : null}
          {showSuccessAlert || showSuccessAlertEmployer ? (
            <Alert
              variant="success"
              className="postShow-alert"
              onClose={() =>
                currentUser.role.name === "employee"
                  ? setShowSuccessAlert(false)
                  : setShowSuccessAlertEmployer(false)
              }
              dismissible
            >
              {currentUser.role.name === "employee"
                ? "¡Postulación realizada!"
                : "Postulantes aceptados"}
            </Alert>
          ) : null}
          {showErrorAlert || showErrorAlertEmployer ? (
            <Alert
              variant="danger"
              className="postShow-alert"
              onClose={() =>
                currentUser.role.name === "employee"
                  ? setShowErrorAlert(false)
                  : setShowErrorAlertEmployer(false)
              }
              dismissible
            >
              {currentUser.role.name === "employee"
                ? "No se pudo realizar postulación. Inténtelo más tarde."
                : "No se pudieron aceptar los postulantes"}
            </Alert>
          ) : null}
        </Col>
        <Col className="postShow-image-col">
          <Image src={DefaultPicture} className="postShow-image" fluid />
        </Col>
      </Row>
      <Row>
        <Col className="postShow-secondary-description-row">
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
          {employees.length > 0 && owner.id === currentUser.id ? (
            <div className="py-5">
              <h3>Trabajadores actuales</h3>
              {employees.map((employee, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={employee.name}
                  checked={fired.includes(employee.id)}
                  onChange={(event) => handleWorker(event, employee.id)}
                />
              ))}
            </div>
          ) : null}
        </Col>
        {applicants.length > 0 && owner.id === currentUser.id ? (
          <Col>
            <h3 className="pt-4">Postulantes pendientes</h3>
            {applicants.map((applicant, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={applicant.name}
                checked={selected.includes(applicant.id)}
                onChange={(event) => handleApplicant(event, applicant.id)}
              />
            ))}
            <Button
              variant="primary"
              type="submit"
              onClick={onHandleAccept}
              className="signup-button"
            >
              Actualizar postulantes
            </Button>
          </Col>
        ) : null}
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
    employees: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.number.isRequired,
  }),
};
