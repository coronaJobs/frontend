import React from 'react';
// import { useParams } from "react-router-dom";
import { Image } from 'react-bootstrap';
import DefaultPictureExp from '../../assets/images/experienceProfile-default.png';

function ExperienceProfile (props){
    return (  
            <div className='center'>
                <h5>Nombre experiencia</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                     ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                     reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                     pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                      qui officia deserunt mollit anim id est laborum</p>
                <Image src={DefaultPictureExp} className='experienceProfile-experience-picture'/>
            </div>
            
      )
};

export default ExperienceProfile;