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
    applicants,
  } = props.post;

  return (
    <>
      <Row>
        <Col className="postShow-main-description-col">
          <h1 className="postShow-name">{name}</h1>
          <p>{description}</p> {/* TODO: limitar cantidad de caracteres ... */}
          <p>
            Vacantes disponibles: {applicants.length}/{applicantLimit}
          </p>
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
            <li>Estado: {state.name}</li>
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
    applicants: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};
