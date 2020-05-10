import React from 'react';
import { GET_USER_PROFILE } from '../graphql/queries/users';
import { useQuery } from '@apollo/client';
import '../assets/css/userProfile.css';
import { useParams } from "react-router-dom";
import { DataProfile, PictureProfile, ExperienceProfile, Loading } from '../containers';
import { Container, Row, Col, Spinner } from 'react-bootstrap';



function UserProfile (props){
    let { userId } = useParams();
    const { data, loading, error } = useQuery(GET_USER_PROFILE, {
        variables: {id: parseInt(userId)}
      });
    console.log(data);
    if (loading) return <Loading />;
    const {name, address, role, mail, rut, phone} = data.getUser;
    return (  
            <div className='container'>
                <h1>Mi perfil</h1>
                <Container fluid>
                <Row>
                    <Col>
                        <div className='container'>
                            { (loading)?
                                <Spinner animation="grow" variant="danger" />
                                :
                                <PictureProfile name={name} role={role.name}/>
                            }
                            
                        </div>
                    </Col>
                    <Col>
                        <div className='container'>  
                        { (loading)?
                                <Spinner animation="grow" variant="danger" />
                                :        
                            <DataProfile address={address} mail={mail} rut={rut} phone={phone}/>
                        } 
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