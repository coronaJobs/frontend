import React from "react";
// import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import PostShowComponent from "../../components/post/show";
import "../../assets/css/post/show.css";

export default function PostShow(props) {
  let post;
  if (props.location.state) {
    console.log(props.location.state.post);
    post = props.location.state.post;
  } else {
    // TODO: hacer query getPost(postId) cuando backend este listo
    // let { postId } = useParams(); id para hacer query
    post = {
      name: "Repartidor de mascarillas",
      description:
        "Se necesitan personas que cuenten con vehículos para repartir 100.000 mascarillas dentro de la comuna...",
      applicantLimit: 3,
      owner: { name: "Municipalidad de Alto Hospicio" },
      state: { name: "Disponible" },
      applicants: [{ name: "Luis" }],
    };
  }

  return <PostShowComponent post={post} />;
}

PostShow.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      post: PropTypes.object,
    }).isRequired,
  }).isRequired,
};
