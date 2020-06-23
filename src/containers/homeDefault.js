/* eslint-disable react/no-unescaped-entities */
import React from "react";
import PictureOne from "../assets/images/publicar-home.jpg";
import PictureTwo from "../assets/images/editar-home.jpg";
import PictureThree from "../assets/images/conectar-home.jpg";
import DefaultPicture from "../assets/images/userProfile-default.png";
import { PencilSquare, FileRichtext, Link } from "react-bootstrap-icons";
import { Container, Row, Col, Image } from "react-bootstrap";

function HomeDefault() {
  return (
    <div>
      <div className="App">
        <Container className="center">
          <Row className="App-message">
            <Col>
              <h1 className="mx-5 px-5 homeDefault-invitation-text">
                Conectamos instituciones con personas dispuestas a suplir las
                necesidades generadas por el COVID-19
              </h1>
            </Col>
          </Row>
          <Row className="some-space">
            <Col>
              <span>
                <a
                  className="homeDefault-signup-button strong-color some-space"
                  href="/signup"
                >
                  Regístrate aquí
                </a>
              </span>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="margin-container">
        <Container>
          <Row>
            <Col>
              <div className="center">
                <div>
                  <FileRichtext color="royalblue" size={96} />
                </div>
                <h3>Publica tu oferta</h3>
                <p>
                  Publica tu oferta de trabajo para que trabajadores puedan
                  postular.
                </p>
              </div>
            </Col>
            <Col>
              <div className="center">
                <div>
                  <PencilSquare color="royalblue" size={96} />
                </div>
                <h3>Edita tu perfil</h3>
                <p>
                  Completa tu perfil con tus habilidades y experiencias para que
                  te contraten.
                </p>
              </div>
            </Col>
            <Col>
              <div className="center">
                <div>
                  <Link color="royalblue" size={96} />
                </div>
                <h3>¡Conectados!</h3>
                <p>
                  Ya estás listo para explorar las ofertas o perfiles de
                  trabajadores para crear redes de contacto.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="margin-container">
        <Container className="expand-container">
          <Row className="homeDefault-background-gray blue-container">
            <Col>
              <Image src={PictureOne} className="homeDefault-image" />
            </Col>
            <Col className="margin-column">
              <h2>Publica tu oferta de trabajo</h2>
              <p>
                Crea una publicación con tu oferta de trabajo para que los
                trabajadores puedan verla y postular. Accede al perfil de los
                postulantes para ver si cumplen los requisitos, comunícate con
                ellos por el foro, y ponte de acuerdo para llevar a cabo el
                trabajo.
              </p>
            </Col>
          </Row>
          <Row className="blue-container">
            <Col className="margin-column">
              <h2>Crea tu perfil</h2>
              <p>
                Y asegúrate de incluir todas tus habilidades e intereses, para
                que los empleadores puedan hacerse una idea integral respecto a
                ti.
              </p>
            </Col>
            <Col>
              <Image src={PictureTwo} className="homeDefault-image" />
            </Col>
          </Row>
          <Row className="homeDefault-background-gray blue-container">
            <Col>
              <Image src={PictureThree} className="homeDefault-image" />
            </Col>
            <Col className="margin-column">
              <h2>Conexión rápida y fácil</h2>
              <p>
                Una vez el empleador haya aceptado postulantes para su oferta,
                podrá ponerse en contacto con ellos para comenzar el trabajo.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container>
          <h2 className="center blue">Testimonios CoronaJobs</h2>
          <Row>
            <Col>
              <div className="center">
                <Image
                  src={
                    "https://ca.slack-edge.com/T01249XKG5R-U012GN6QMQR-e0343547465a-512"
                  }
                  className="homeDefault-profile-picture "
                />
                <h5 className="blue">Rafaela Karachon</h5>
                <p>
                  "Desde que existe CoronaJobs puedo encontrar trabajos
                  puntuales de forma rápida y sencilla."
                </p>
              </div>
            </Col>
            <Col>
              <div className="center">
                <Image
                  src={
                    "https://ca.slack-edge.com/T01249XKG5R-U011XBM5S94-717dbbc9a9c0-512"
                  }
                  className="homeDefault-profile-picture "
                />
                <h5 className="blue">Claudio Scheihing</h5>
                <p>"CoronaJobs cambió mi vida."</p>
              </div>
            </Col>
            <Col>
              <div className="center">
                <Image
                  src={
                    "https://ca.slack-edge.com/T01249XKG5R-U0122MZNLDT-19cc9f17174c-512"
                  }
                  className="homeDefault-profile-picture "
                />
                <h5 className="blue">Javier Aranda</h5>
                <p>
                  "Me quedé sin trabajo, y CoronaJobs me permitió obtener una
                  fuente de ingreso de forma inmediata."
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HomeDefault;
