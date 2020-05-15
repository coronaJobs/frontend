import React from 'react';

import { HomeDefault, HomeUser } from '../containers';



function Home(props) {

    return (
        <div>
        {
            props.userLoggedIn? 
            
            <div>
                <HomeUser/>
            </div> 
            : 
            <div>
                <HomeDefault />
            </div>
        }
    </div>   
    )
  }

export default Home;