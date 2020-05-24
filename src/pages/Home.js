import React from "react";

<<<<<<< HEAD
import { HomeDefault, HomeUser, Loading } from "../containers";
=======
import { HomeDefault, HomeUser } from "../containers";
>>>>>>> 35bd5a22b29f5b64ca84ee6ebcfb3f629f3003d5
import "../assets/css/homeUser.css";
import "../assets/css/homeDefault.css";

function Home(props) {
  return (
    <div>
      {props.userLoggedIn ? (
<<<<<<< HEAD
        props.currentUser ? (
          <div>
            <HomeUser currentUser={props.currentUser} />
          </div>
        ) : (
          <Loading />
        )
=======
        <div>
          <HomeUser />
        </div>
>>>>>>> 35bd5a22b29f5b64ca84ee6ebcfb3f629f3003d5
      ) : (
        <div>
          <HomeDefault />
        </div>
      )}
    </div>
  );
}

export default Home;
