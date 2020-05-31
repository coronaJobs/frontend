import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import DefaultPicture from "../../assets/images/conectar-home.jpg";

export default function PostFormComponent(props) {
  const {
    name,
    description,
    applicantLimit,
    owner,
    state,
    commune,
  } = props.post;
  const stateNames = {
    open: "Disponible",
    closed: "No disponible",
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

PostFormComponent.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    applicantLimit: PropTypes.number.isRequired,
    owner: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    commune: PropTypes.object.isRequired,
    applicants: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};
