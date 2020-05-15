import React from 'react';
import { GET_USER_PROFILE } from '../graphql/queries/users';
import { useQuery } from '@apollo/client';
import '../assets/css/userProfile.css';
import { useParams } from "react-router-dom";
import { DataProfile, PictureProfile, ExperienceProfile, Loading, JobOffer } from '../containers';
import { Container, Row, Col } from 'react-bootstrap';
import { PostFormComponent } from '../components';



function UserProfile (props){
    let { userId } = useParams();
    const { data, loading } = useQuery(GET_USER_PROFILE, {
        fetchPolicy: 'network-only',
        variables: {id: parseInt(userId)}

      });
    console.log(data);
    if (loading) return <Loading />;
    const {name, address, role, mail, rut, phone, posts} = data.getUser;
    let formButton, content;
    switch (role.name) {
        case 'employer':
            formButton = <PostFormComponent userId={userId}/> ;
            // TODO: Query exclusiva para posts de empleador
            content = <Container className='container box-margin' fluid>
            <div id="experience-container">
                <h3>Ofertas</h3>
                {formButton}
            </div>
            <Row>
                {posts.map((post) => <JobOffer post={post} />)}
            </Row>
        </Container> ;
            break;
        case 'employee':
            formButton = null; // TODO: poner form de agregar experiencia
            // TODO: sacar info dummy
            content = <Container className='container box-margin' fluid>
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
            </Container>;
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
                                    // <Spinner animation="grow" variant="danger" />
                                    <Loading />
                                    :
                                    <PictureProfile name={name} role={role.name}/>
                                }
                                
                            </div>
                        </Col>
                        <Col>
                            <div className='container'>  
                            { (loading) ?
                                    // <Spinner animation="grow" variant="danger" />
                                    <Loading />
                                    :        
                                <DataProfile address={address} mail={mail} rut={rut} phone={phone}/>
                            } 
                            </div>
                        </Col>
                    </Row>    
                </Container>
                {content}
            </div>
            
      )
};


export default UserProfile;