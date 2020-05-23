import React from "react";

import { Posts, HomeDefault } from "../containers";
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
        <div>
          <HomeDefault />
        </div>
      )}
    </div>
  );
}

export default CurrentPosts;
