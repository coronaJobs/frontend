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

  let { userId } = useParams();
  const { data, loading } = useQuery(GET_USER_PROFILE, {
    fetchPolicy: "network-only",
    variables: { id: parseInt(userId) },
  });

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
                <PictureProfile name={currentName} role={role.name} />
              )}
            </div>
          </Col>
          <Col>
            <div className="container">
              {loading ? (
                <Loading />
              ) : (
                <DataProfile
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
            </div>
          </Col>
        </Row>
      </Container>
      {content}
    </div>
  );
}

export default UserProfile;
