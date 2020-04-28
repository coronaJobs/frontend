import React from 'react';
import '../../assets/css/userProfile.css';


function DataProfile (props){
    return (  
        <div>
            <div className='move-left'>
                <h3>Datos</h3>
                <ul>
                    <li class="text-left">Dirección: </li>
                    <li class="text-left">Correo: </li>
                    <li class="text-left">RUT: </li>
                    <li class="text-left">Teléfono: </li>
                </ul>
            </div>
        </div>
      )
};




export default DataProfile;