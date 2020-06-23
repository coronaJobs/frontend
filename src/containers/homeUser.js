import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/queries/posts";
import { GET_USER_PROFILE } from "../graphql/queries/users";
import { Loading } from "../containers";
import DefaultPicture from "../assets/images/maletin.png";
import { Spinner, Container, Row, Col, Image } from "react-bootstrap";
import { PostFormComponent } from "../components";

function HomeUser(props) {
  let posts;
  const { data, loading } = useQuery(
    props.currentUser.role.name === "employee"
      ? GET_ALL_POSTS
      : GET_USER_PROFILE,
    {
      fetchPolicy: "network-only",
      variables:
        props.currentUser.role.name === "employee"
          ? null
          : { id: parseInt(props.currentUser.id) },
    }
  );
  if (loading) return <Loading />;
  posts =
    props.currentUser.role.name === "employer"
      ? data.getUser.posts
      : data.getAllPosts;

  let lgColumns;
  if (posts.length === 1) {
    lgColumns = 2;
  } else {
    lgColumns = 4;
  }
  return (
    <div>
      {loading ? (
        <Spinner animation="grow" variant="danger" />
      ) : posts.length > 0 ? (
        <div>
          <Container className="d-flex flex-column align-items-center">
            <h2 className="mt-4">
              {props.currentUser.role.name === "employee"
                ? "Ofertas de trabajo"
                : "Mis ofertas de trabajo"}
            </h2>
            <p>
              {props.currentUser.role.name === "employee"
                ? "Revisa las distintas ofertas de trabajo disponibles."
                : "Ofertas de trabajo vigentes."}
            </p>
            <Row
              xs={1}
              md={2}
              lg={lgColumns}
              className="mb-5 d-flex justify-content-center"
            >
              {posts.map((post, index) => (
                <Col key={"profile-" + index.toString()} className="center">
                  <Image
                    src={DefaultPicture}
                    className="homeUser-post-picture"
                  />
                  <h3>{post.name}</h3>
                  <p>{post.description}</p>
                  <p className="italic-style">
                    {post.commune ? post.commune.name : null}
                  </p>
                  <Link
                    className="homeUser-application-button strong-color some-space"
                    to={{
                      pathname: `/posts/${post.id}`,
                    }}
                  >
                    {" "}
                    Postular{" "}
                  </Link>
                </Col>
              ))}
            </Row>
            <hr />
          </Container>
        </div>
      ) : (
        <div className="center margin-container">
          <h2>
            {props.currentUser.role.name === "employee"
              ? "Ofertas de trabajo"
              : "Mis ofertas de trabajo"}
          </h2>
          <p>
            {props.currentUser.role.name === "employee"
              ? "No hay ofertas de trabajo disponibles actualmente."
              : "No tienes ofertas de trabajo. Si necesitas añadir ofertas, haz click en 'Publicar oferta de trabajo'."}
          </p>
          {props.currentUser.role.name === "employer" ? (
            <PostFormComponent userId={props.currentUser.id} />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default HomeUser;
