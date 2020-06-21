import React from "react";
// import { useParams } from "react-router-dom";
import { Button, Col } from "react-bootstrap";
// import DefaultPictureExp from '../../assets/images/experienceProfile-default.png';

function JobOffer({ post, role }) {
  return (
    <Col>
      <h6>{post.name}</h6>
      <p>{post.description}</p>
      {/* TODO: Arreglar color botón */}
      {role === "employer" ? (
        <Button variant="danger" disabled>
          Ver oferta
        </Button>
      ) : null}
      {/* <Image src={DefaultPictureExp} className='picture-profile'/> */}
    </Col>
  );
}

export default JobOffer;
