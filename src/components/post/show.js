import React, { useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import DefaultPicture from "../../assets/images/conectar-home.jpg";
import { CURRENT_USER } from "../../graphql/queries/inner_queries";

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
  } = props.post;

  const currentUserQuery = useQuery(CURRENT_USER);
  const { currentUser } = currentUserQuery.data;

  const stateNames = {
    open: "Disponible",
    closed: "No disponible",
  };

  const [selected, setSelected] = useState([]);
  const [fired, setFired] = useState([]);

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
    selected.map((applicant) => console.log(applicant));
  };

  return (
    <>
      <Row>
        <Col className="postShow-main-description-col">
          <h1 className="postShow-name">{name}</h1>
          <p>{description.substring(0, 100) + "..."}</p>
          <p>Vacantes: {applicantLimit}</p>
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
  }),
};
