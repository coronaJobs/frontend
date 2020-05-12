import React from 'react';
import { GET_USER_PROFILE } from '../graphql/queries/users';
import { useQuery } from '@apollo/client';
import '../assets/css/userProfile.css';
import { useParams } from "react-router-dom";
import { DataProfile, PictureProfile, ExperienceProfile, Loading } from '../containers';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { PostFormComponent } from '../components';



function UserProfile (props){
    let { userId } = useParams();
    const { data, loading, error } = useQuery(GET_USER_PROFILE, {
        variables: {id: parseInt(userId)}
      });
    console.log(data);
    if (loading) return <Loading />;
    const {name, address, role, mail, rut, phone} = data.getUser;
    let formButton;
    switch (role.name) {
        case 'employer':
            formButton = <PostFormComponent userId={userId}/> ;
            break;
        case 'employee':
            formButton = null; // TODO: poner form de agregar experiencia
            break;
        default:
            formButton = null;
            break;
    }
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
                    <div id="experience-container">
                        <h3>Mis experiencias</h3>
                        {formButton}
                          {/* <PostFormComponent userId={userId}/>   */}
                    
                        
                    </div>
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