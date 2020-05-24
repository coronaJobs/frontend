import React from "react";

import { HomeDefault, HomeUser, Loading } from "../containers";
import "../assets/css/homeUser.css";
import "../assets/css/homeDefault.css";

function Home(props) {
  return (
    <div>
      {props.userLoggedIn ? (
        props.currentUser ? (
          <div>
            <HomeUser currentUser={props.currentUser} />
          </div>
        ) : (
          <Loading />
        )
      ) : (
        <div>
          <HomeDefault />
        </div>
      )}
    </div>
  );
}

export default Home;
