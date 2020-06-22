import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Loading } from "../../containers";
import PostShowComponent from "../../components/post/show";
import { GET_POST } from "../../graphql/queries/posts";
import "../../assets/css/post/show.css";

export default function PostShow(props) {
  let { postId } = useParams();
  const { data, loading, refetch } = useQuery(GET_POST, {
    fetchPolicy: "network-only",
    variables: { id: parseInt(postId) },
  });
  if (props.userLoggedIn) {
    if (loading) return <Loading />;
    const post = { ...data.getPost };
    return <PostShowComponent post={post} refetchPost={refetch} />;
  } else {
    return <Redirect to="/" />;
  }
}
