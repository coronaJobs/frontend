import React from 'react';
import '../../assets/css/userProfile.css';

function DataProfile (props){
    return (  
        <div>
            <div className='dataProfile-move-left'>
                <h3>Datos</h3>
                <ul>
                    <li class="text-left">Dirección: {props.address} </li>
                    <li class="text-left">Correo: {props.mail}</li>
                    <li class="text-left">RUT: {props.rut}</li>
                    <li class="text-left">Teléfono: {props.phone}</li>
                </ul>
            </div>
        </div>
      )
};

export default DataProfile;