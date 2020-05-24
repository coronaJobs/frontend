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

>>>>>>> 01ca2ae01ebcba699ad63b2e80ef15f333081869
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

>>>>>>> 01ca2ae01ebcba699ad63b2e80ef15f333081869
  let formButton, content;
  switch (role.name) {
    case "employer":
      formButton = <PostFormComponent userId={userId} />;
      // TODO: Query exclusiva para posts de empleador
      content = (
        <Container className="container UserProfile-box-margin" fluid>
          <div id="experience-container">
            <h3>Ofertas</h3>
            {formButton}
          </div>
          <Row>
<<<<<<< HEAD
            {posts.map((post) => (
              <JobOffer post={post} />
=======
            {posts.map((post, index) => (
              <JobOffer post={post} key={index} />
>>>>>>> 01ca2ae01ebcba699ad63b2e80ef15f333081869
            ))}
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
      <h1>Mi perfil</h1>
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
>>>>>>> 01ca2ae01ebcba699ad63b2e80ef15f333081869
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
>>>>>>> 01ca2ae01ebcba699ad63b2e80ef15f333081869
            </div>
          </Col>
        </Row>
      </Container>
      {content}
    </div>
  );
}

export default UserProfile;
