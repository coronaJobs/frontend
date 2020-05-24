import React from "react";
import { GET_USER_PROFILE } from "../graphql/queries/users";
import { useQuery } from "@apollo/client";
import "../assets/css/userProfile.css";
import { useParams } from "react-router-dom";
import { DataProfile, PictureProfile, Loading, JobOffer } from "../containers";
import { Container, Row, Col } from "react-bootstrap";
import { PostFormComponent } from "../components";

function UserProfile(props) {
  let { userId } = useParams();
  const { data, loading } = useQuery(GET_USER_PROFILE, {
    fetchPolicy: "network-only",
    variables: { id: parseInt(userId) },
  });
  if (loading) return <Loading />;
  const { name, address, role, mail, rut, phone, posts } = data.getUser;
  let formButton, content;
  switch (role.name) {
    case "employer":
      formButton = <PostFormComponent userId={userId} />;
      content = (
        <Container className="container UserProfile-box-margin" fluid>
          <div id="experience-container">
            <h3>Últimas Ofertas</h3>
            {formButton}
          </div>
          <Row>
            {posts.length > 0 ? (
              posts.map((post, index) => <JobOffer key={index} post={post} />)
            ) : (
              <p>No has publicado ofertas en CoronaJobs.</p>
            )}
          </Row>
        </Container>
      );
      break;
    case "employee":
      formButton = null; // TODO: cuando esté listo lo de los trabajos realizados, colocarlos acá
      content = (
        <Container className="container box-margin" fluid>
          {formButton ? (
            <div id="experience-container">
              <h3>Mis experiencias</h3>
            </div>
          ) : null}
        </Container>
      );
      break;
    default:
      formButton = null;
      break;
  }
  return (
    <div className="container">
      <h1 className="py-5">Mi perfil</h1>
      <Container fluid>
        <Row>
          <Col>
            <div className="container">
              {loading ? (
                <Loading />
              ) : (
                <PictureProfile name={name} role={role.name} />
              )}
            </div>
          </Col>
          <Col>
            <div className="container">
              {loading ? (
                <Loading />
              ) : (
                <DataProfile
                  address={address}
                  mail={mail}
                  rut={rut}
                  phone={phone}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
      {content}
    </div>
  );
}

export default UserProfile;
