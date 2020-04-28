import React from 'react';
import '../assets/css/userProfile.css';
import { useParams } from "react-router-dom";
import { DataProfile, PictureProfile, ExperienceProfile } from '../containers';
import { Container, Row, Col } from 'react-bootstrap';


function UserProfile (props){
    let { userId } = useParams();
    return (  
            <div className='container'>
                <h1>Mi perfil</h1>
                <Container fluid>
                <Row>
                    <Col>
                        <div className='container'>
                            <PictureProfile userId={userId}/>
                        </div>
                    </Col>
                    <Col>
                        <div className='container'>          
                            <DataProfile userId={userId}/>
                        </div>
                    </Col>
                </Row>    
                </Container>
                <Container className='container box-margin' fluid>
                    <h3>Mis experiencias</h3>
                    <Row>
                        <Col>
                            <div className='container'>
                                <ExperienceProfile userId={userId}/>
                            </div>
                        </Col>
                        <Col>
                            <div className='container'>          
                                <ExperienceProfile userId={userId}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            
      )
};


export default UserProfile;