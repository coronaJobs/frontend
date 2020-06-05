import React, { useState, useEffect } from "react";
import { GET_USER_PROFILE } from "../graphql/queries/users";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { DataProfile, PictureProfile, Loading, JobOffer } from "../containers";
import { Container, Row, Col } from "react-bootstrap";
import { EditProfileComponent, PostFormComponent, UpdateResumeComponent, DownloadResumeComponent } from "../components";

import "../assets/css/user/userProfile.css";
import "../assets/css/user/editUser.css";
import { CURRENT_USER } from "../graphql/queries/inner_queries";

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

  const currentUserQuery = useQuery(CURRENT_USER);
  useEffect(() => {
    if (!loading) {
      setCurrentName(name);
      setCurrentAddress(address);
      setCurrentMail(mail);
      setCurrentRut(rut);
      setCurrentPhone(phone);
    }
  }, [loading]);

  if (loading || currentUserQuery.loading) return <Loading />;
  const { name, address, role, mail, rut, phone, posts } = data.getUser;
  const currentUserId = currentUserQuery.data.currentUser ? currentUserQuery.data.currentUser.id : null;
  const currentUserRole = currentUserQuery.data.currentUser? currentUserQuery.data.currentUser.role : null;

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
        // <Container className="container UserProfile-box-margin" fluid>
        <Container fluid>
          <Row className="my-3 p-2 d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Últimas Ofertas</h3>
            {data.getUser.id === currentUserId ? formButton : null}
          </Row>
          <Row>
            {posts.length > 0 ? (
              posts.map((post, index) => <JobOffer key={index} post={post} />)
            ) : (
              // <p>No has publicado ofertas en CoronaJobs.</p>
              <p>Sin ofertas publicadas hasta el momento.</p>
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
      {/* <h3 className="py-3">Mi perfil</h3> */}
      <Container className="mt-3" fluid>
        <Row className="d-flex align-items-center">
          <Col>
            <div className="container">
              {loading ? (
                <Loading />
              ) : (
                <PictureProfile name={currentName} role={role.name} />
              )}
            </div>
          </Col>
          {/* <Col className="d-flex flex-column justify-content-between"> */}
          <Col className="d-flex flex-column">
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
            <Row className={`d-flex`}>
            {data.getUser.id === currentUserId ?
              <EditProfileComponent
                key='editProfileButton'
                dataUser={{
                  id: data.getUser.id,
                  name: currentName,
                  rut: currentRut,
                  mail: currentMail,
                  address: currentAddress,
                  phone: currentPhone,
                }}
                editUserUpdate={editUserUpdate}
              /> : null}
              {data.getUser.id === currentUserId && role && role.id === 2 ? <UpdateResumeComponent /> : null}
              {data.getUser.id !== currentUserId && role && role.id === 2 ? <DownloadResumeComponent /> : null}
            </Row>
          </Col>
        </Row>
      </Container>
      {content}
    </div>
  );
}

export default UserProfile;
