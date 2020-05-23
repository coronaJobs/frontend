import React from 'react';

import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../graphql/queries/posts';
import { Loading } from '../containers';
import DefaultPicture from '../assets/images/userProfile-default.png';
import { Spinner, Container, Row, Col, Image } from 'react-bootstrap';

function HomeUser(props) {
    const { data, loading } = useQuery(GET_ALL_POSTS, {
        fetchPolicy: 'network-only',
      });
    if (loading) return <Loading />;
    const posts = data.getAllPosts;
    return (
        <div>
            {
                (loading)?
                <Spinner animation="grow" variant="danger" />
                :
                <div>
                    <Container>
                        <div className='center margin-container'>
                            <h2>Ofertas de trabajo</h2>
                            <p>Revisa las distintas ofertas de trabajo disponibles.</p>
                        </div>
                        <Row>
                            {
                                posts.map((post, index) =>
                                    <Col key={'profile-' + index.toString()} className='center'>
                                        <Image src={DefaultPicture} className='homeUser-post-picture'/>
                                        <h3>{post.name}</h3>
                                        <p>{post.description}</p>
                                        <span><a className="homeUser-application-button strong-color some-space" href='/signup'>Postular</a></span>
                                    </Col>
                                )
                            }
                        </Row>
                    </Container>                
                </div>
            }
       
        </div>   
    )
  }

export default HomeUser;