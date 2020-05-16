import React from 'react';
import { Button, Col, Image } from 'react-bootstrap';


function JobOffer({ post }){

    return (  
            <Col>
                <h5>{post.name}</h5>
                <p>{post.description}</p>
                {/* TODO: Arreglar color botón */}
                <Button variant="danger" disabled>Ver oferta</Button>
                {/* <Image src={DefaultPictureExp} className='picture-profile'/> */}
            </Col>
            
      )
};

export default JobOffer;