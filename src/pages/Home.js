import React from "react";

import { HomeDefault, HomeUser } from "../containers";
import "../assets/css/homeUser.css";
import "../assets/css/homeDefault.css";

function Home(props) {
  return (
    <div>
      {props.userLoggedIn ? (
        <div>
          <HomeUser />
        </div>
      ) : (
        <div>
          <HomeDefault />
        </div>
      )}
    </div>
  );
}

export default Home;
