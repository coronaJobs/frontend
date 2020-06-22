import React, { useState, useEffect } from "react";
import { GET_USER_PROFILE } from "../graphql/queries/users";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { DataProfile, PictureProfile, Loading, JobOffer } from "../containers";
import { Container, Row, Card, ButtonGroup, Col } from "react-bootstrap";
import {
  EditProfileComponent,
  PostFormComponent,
  UpdateResumeComponent,
  DownloadResumeComponent,
} from "../components";

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
  const { name, address, role, mail, rut, phone, posts, resumeUrl, finishedJobs, profilePicture } = data.getUser;
  const currentUserId = currentUserQuery.data.currentUser ? currentUserQuery.data.currentUser.id : null;
  // const currentUserRole = currentUserQuery.data.currentUser? currentUserQuery.data.currentUser.role : null;
  // const currentUserResumeUrl = currentUserQuery.data.currentUser? currentUserQuery.data.currentUser.resumeUrl : null;

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
              posts.map((post, index) => (
                <JobOffer key={index} post={post} role={"employer"} />
              ))
            ) : (
              <p>Sin ofertas publicadas hasta el momento.</p>
            )}
          </Row>
        </Container>
      );
      break;
    case "employee":
      content = (
        <Container className="container box-margin" fluid>
          {finishedJobs ? (
            <div>
              <div id="experience-container">
                <h4 className="mx-4">Mis experiencias</h4>
              </div>
              <Row className="m-3 p-2 d-flex justify-content-between align-items-center">
                {finishedJobs.length > 0 ? (
                  finishedJobs.map((job, index) => (
                    <JobOffer key={index} post={job} role={"employee"} />
                  ))
                ) : (
                  <p>No has realizado trabajos en CoronaJobs.</p>
                )}
              </Row>
            </div>
          ) : null}
        </Container>
      );
      break;
    default:
      formButton = null;
      break;
  }
  // console.log(data.getUser);
  return (
    <div className="container mt-5">
      <Container className="my-4" fluid>
        <Card>
          {/* Opción 1 */}
          <Card.Header>
            <h4> {currentName} </h4>
          </Card.Header>
          <Card.Body className="d-flex justify-content-around align-items-center">
            <PictureProfile
              role={role.name}
              canEdit={data.getUser.id === currentUserId}
              pictureUrl={profilePicture}
              rating={data.rating}
            />
            <DataProfile
              address={currentAddress}
              mail={currentMail}
              rut={currentRut}
              phone={currentPhone}
            />
            <ButtonGroup vertical>
              {data.getUser.id === currentUserId ? (
                <EditProfileComponent
                  //key="editProfileButton"
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
              ) : null}
              {data.getUser.id === currentUserId && role && role.id === 2 ? (
                <UpdateResumeComponent />
              ) : null}
              {role && role.id === 2 ? (
                <DownloadResumeComponent resumeUrl={resumeUrl} />
              ) : null}
            </ButtonGroup>
          </Card.Body>
          <div className="my-5"> {content} </div>
        </Card>
      </Container>
    </div>
  );
}

export default UserProfile;
