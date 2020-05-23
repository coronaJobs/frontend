import React from "react";
import "../../assets/css/userProfile.css";
import { Image } from "react-bootstrap";
import DefaultPicture from "../../assets/images/userProfile-default.png";

function PictureProfile(props) {
  return (
    <div>
      <div className="center">
        <Image
          src={DefaultPicture}
          className="pictureProfile-picture-profile"
        />
        <h5>{props.name}</h5>
        <p>{props.role === "employer" ? "Empleador" : "Trabajador"}</p>
      </div>
    </div>
  );
}

export default PictureProfile;
