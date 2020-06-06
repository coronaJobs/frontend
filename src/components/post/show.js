import React, { useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
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
  const [applicationMessage, setApplicationMessage] = useState("");
  const [createApplication] = useMutation(CREATE_APPLICATION, {
    onCompleted() {
      setApplicationMessage("¡Postulación realizada!");
    },
    onError() {
      setApplicationMessage(
        "No se pudo realizar postulación. Inténtelo más tarde."
      );
    },
  });
  const currentUserQuery = useQuery(CURRENT_USER);
  const { currentUser } = currentUserQuery.data;
  console.log(currentUser.id);
  const { data, loading, error } = useQuery(GET_USER_APPLICATIONS, {
    fetchPolicy: "network-only",
    variables: { id: currentUser.id },
  });
  if (loading) return <Loading />;
  console.log("HOLAAAA");
  console.log(data);
  const stateNames = {
    open: "Disponible",
    closed: "No disponible",
  };
  const handleApplication = () => {
    createApplication({ variables: { offerId: id } });
  };
  return (
    <>
      <Row>
        <Col className="postShow-main-description-col">
          <h1 className="postShow-name">{name}</h1>
          <p>{description.substring(0, 100) + "..."}</p>
          <p>Vacantes: {applicantLimit}</p>
          {currentUser.role.name === "employee" ? (
            <Button onClick={handleApplication}>Postular</Button>
          ) : null}
          <p>
            {currentUser.role.name === "employee" ? applicationMessage : null}
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
