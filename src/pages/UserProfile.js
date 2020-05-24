<<<<<<< HEAD
import React from "react";
import { GET_USER_PROFILE } from "../graphql/queries/users";
import { useQuery } from "@apollo/client";
import "../assets/css/userProfile.css";
import { useParams } from "react-router-dom";
import { DataProfile, PictureProfile, Loading, JobOffer } from "../containers";
import { Container, Row, Col } from "react-bootstrap";
import { PostFormComponent } from "../components";

function UserProfile(props) {
=======
import React, { useState, useEffect } from "react";
import { GET_USER_PROFILE } from "../graphql/queries/users";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { DataProfile, PictureProfile, Loading, JobOffer } from "../containers";
import { Container, Row, Col } from "react-bootstrap";
import { EditProfileComponent, PostFormComponent } from "../components";

import "../assets/css/user/userProfile.css";
import "../assets/css/user/editUser.css";

function UserProfile() {
  const [currentName, setCurrentName] = useState();
  const [currentAddress, setCurrentAddress] = useState();
  const [currentMail, setCurrentMail] = useState();
  const [currentRut, setCurrentRut] = useState();
  const [currentPhone, setCurrentPhone] = useState();

>>>>>>> 35bd5a22b29f5b64ca84ee6ebcfb3f629f3003d5
  let { userId } = useParams();
  const { data, loading } = useQuery(GET_USER_PROFILE, {
    fetchPolicy: "network-only",
    variables: { id: parseInt(userId) },
  });
<<<<<<< HEAD
  if (loading) return <Loading />;
  const { name, address, role, mail, rut, phone, posts } = data.getUser;
=======

  useEffect(() => {
    if (!loading) {
      setCurrentName(name);
      setCurrentAddress(address);
      setCurrentMail(mail);
      setCurrentRut(rut);
      setCurrentPhone(phone);
    }
  }, [loading]);

  if (loading) return <Loading />;
  const { name, address, role, mail, rut, phone, posts } = data.getUser;

  const editUserUpdate = (data) => {
    const { newName, newAddress, newMail, newRut, newPhone } = data;
    setCurrentName(newName);
    setCurrentAddress(newAddress);
    setCurrentMail(newMail);
    setCurrentRut(newRut);
    setCurrentPhone(newPhone);
  };

>>>>>>> 35bd5a22b29f5b64ca84ee6ebcfb3f629f3003d5
  let formButton, content;
  switch (role.name) {
    case "employer":
      formButton = <PostFormComponent userId={userId} />;
<<<<<<< HEAD
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
=======
      // TODO: Query exclusiva para posts de empleador
      content = (
        <Container className="container UserProfile-box-margin" fluid>
          <div id="experience-container">
            <h3>Ofertas</h3>
            {formButton}
          </div>
          <Row>
            {posts.map((post, index) => (
              <JobOffer post={post} key={index} />
            ))}
>>>>>>> 35bd5a22b29f5b64ca84ee6ebcfb3f629f3003d5
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
<<<<<<< HEAD
      <h1 className="py-5">Mi perfil</h1>
=======
      <h1>Mi perfil</h1>
>>>>>>> 35bd5a22b29f5b64ca84ee6ebcfb3f629f3003d5
      <Container fluid>
        <Row>
          <Col>
            <div className="container">
              {loading ? (
                <Loading />
              ) : (
<<<<<<< HEAD
                <PictureProfile name={name} role={role.name} />
=======
                <PictureProfile name={currentName} role={role.name} />
>>>>>>> 35bd5a22b29f5b64ca84ee6ebcfb3f629f3003d5
              )}
            </div>
          </Col>
          <Col>
            <div className="container">
              {loading ? (
                <Loading />
              ) : (
                <DataProfile
<<<<<<< HEAD
                  address={address}
                  mail={mail}
                  rut={rut}
                  phone={phone}
                />
              )}
=======
                  address={currentAddress}
                  mail={currentMail}
                  rut={currentRut}
                  phone={currentPhone}
                />
              )}
              <EditProfileComponent
                dataUser={{
                  id: data.getUser.id,
                  name: currentName,
                  rut: currentRut,
                  mail: currentMail,
                  address: currentAddress,
                  phone: currentPhone,
                }}
                editUserUpdate={editUserUpdate}
              />
>>>>>>> 35bd5a22b29f5b64ca84ee6ebcfb3f629f3003d5
            </div>
          </Col>
        </Row>
      </Container>
      {content}
    </div>
  );
}

export default UserProfile;
