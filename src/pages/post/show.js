import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import PostShowComponent from "../../components/post/show";
import "../../assets/css/post/show.css";

export default function PostShow(props) {
  // const post = prop.post ? props.post : null; //TODO hacer query si post no viene en props

  let post;
  if (props.location.state) {
    console.log(props.location.state.post);
    post = props.location.state.post;
  } else {
    // TODO: hacer query getPost(postId) cuando backend este listo
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
  // let { postId } = useParams();

  return <PostShowComponent post={post} />;
}

PostShow.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    applicantLimit: PropTypes.number.isRequired,
    owner: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    applicants: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
