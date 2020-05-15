import React from 'react';
// import { useParams } from "react-router-dom";
import { Button, Col } from 'react-bootstrap';
// import DefaultPictureExp from '../../assets/images/experienceProfile-default.png';


function JobOffer({ post }){
    // let { userId } = useParams();
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