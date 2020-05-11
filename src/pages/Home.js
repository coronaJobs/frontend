import React from 'react';

import { useQuery } from '@apollo/client';

import { useParams } from "react-router-dom";
import logo from '../assets/logo.svg';
import background from '../assets/images/background.png';
import { Container, Row, Col, Spinner } from 'react-bootstrap';



function Home() {
    return (
      <div>
        <div className="App">
            <Container className='center'>
                <Row className='App-message'>
                    <Col>
                    <p>Conectamos instituciones con personas dispuestas a suplir las necesidades generadas por el COVID-19</p>
                    </Col>
                </Row>
                <Row className='some-space'>
                <Col>
                <span><a className="signup-button strong-color some-space" href='/signup'>Regístrate aquí</a></span>
                    </Col>
                </Row>
            </Container>
        </div>
        <div>
            <Container>
                <Row>
                    <Col>
                        <div>
                            <div>
                                <p>Ícono</p>
                            </div>
                            <h3>Publica tu oferta de trabajo</h3>
                            <p>Para que los postulantes postulen xd</p>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <div>
                                <p>Ícono</p>
                            </div>
                            <h3>Edita tu perfil</h3>
                            <p>Déjalo entero nítido pa que te contraten</p>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <div>
                                <p>Ícono</p>
                            </div>
                            <h3>¡Conectados!</h3>
                            <p>¡Ya están listos para trabajar!</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        <div>
            <Container>
                <Row>
                    <Col>
                        <span></span>
                    </Col>
                    <Col>
                    <h2>Publica tu oferta de trabajo</h2>
                    <p>Crea una publicación con tu oferta de trabajo "puntual" para que los trabajadores puedan ver
                         y postular. Accede al perfil de los postulantes para ver si cumplen los requisitos, 
                        comunícate con ellos por el foro, y ponte de acuerdo para llevar a cabo el trabajo.
                    </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Publica tu oferta de trabajo</h2>
                        <p>Crea una publicación con tu oferta de trabajo "puntual" para que los trabajadores puedan ver
                            y postular. Accede al perfil de los postulantes para ver si cumplen los requisitos, 
                            comunícate con ellos por el foro, y ponte de acuerdo para llevar a cabo el trabajo.
                        </p>
                    </Col>
                    <Col>
                        <span></span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span></span>
                    </Col>
                    <Col>
                    <h2>Publica tu oferta de trabajo</h2>
                    <p>Crea una publicación con tu oferta de trabajo "puntual" para que los trabajadores puedan ver
                         y postular. Accede al perfil de los postulantes para ver si cumplen los requisitos, 
                        comunícate con ellos por el foro, y ponte de acuerdo para llevar a cabo el trabajo.
                    </p>
                    </Col>
                </Row>
                
            </Container>
        </div>
        <div>
            <Container>
                <h2 className='center'>Experiencias CoronaJobs</h2>
                <Row>
                    <Col>
                        <div>
                            <span></span>
                            <h5>Nombre apellido</h5>
                            <p>
                            "Me quedé sin trabajo, y CoronaJobs me permitió obtener 
                            una fuente de ingreso"
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <span></span>
                            <h5>Nombre apellido</h5>
                            <p>
                            "Me quedé sin trabajo, y CoronaJobs me permitió obtener 
                            una fuente de ingreso"
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <span></span>
                            <h5>Nombre apellido</h5>
                            <p>
                            "Me quedé sin trabajo, y CoronaJobs me permitió obtener 
                            una fuente de ingreso"
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
      </div>
      
    )
  }


  export default Home;