import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
// import DefaultPictureExp from '../../assets/images/experienceProfile-default.png';

function JobOffer({ post, role }) {
  return (
    <Col>
      <h6>{post.name}</h6>
      <p>{post.description}</p>
      {role === "employer" ? (
        <Link
          to={{
            pathname: `/posts/${post.id}`,
          }}
          variant="danger"
          className="login-button no-decoration"
        >
          Ver oferta
        </Link>
      ) : null}
    </Col>
  );
}

export default JobOffer;
