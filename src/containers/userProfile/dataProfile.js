import React from 'react';
import '../../assets/css/userProfile.css';

function DataProfile (props){
    return (  
        <div>
            <div className='dataProfile-move-left'>
                <h3>Datos</h3>
                <ul>
                    <li className="text-left">Dirección: {props.address} </li>
                    <li className="text-left">Correo: {props.mail}</li>
                    <li className="text-left">RUT: {props.rut}</li>
                    <li className="text-left">Teléfono: {props.phone}</li>
                </ul>
            </div>
        </div>
      )
};

export default DataProfile;