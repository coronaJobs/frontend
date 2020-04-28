import React from 'react';
import '../../assets/css/userProfile.css';
import { Image } from 'react-bootstrap';
import DefaultPicture from '../../assets/images/userProfile-default.png';


function PictureProfile (props){
    return (  
        <div>
            <div className='center'>
                <Image src={DefaultPicture} className='picture-profile'/>
                <h5>Nombre apellido</h5>
                <p>Tipo de usuario | Comuna</p>
            </div>
        </div>
      )
};




export default PictureProfile;