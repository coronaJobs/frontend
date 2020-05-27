import React from "react";
import { Redirect } from "react-router-dom";
import { Posts } from "../containers";
import "../assets/css/homeUser.css";
import "../assets/css/homeDefault.css";

function CurrentPosts(props) {
  return (
    <div>
      {props.userLoggedIn ? (
        <div>
          <Posts />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default CurrentPosts;
