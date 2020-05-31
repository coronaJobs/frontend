import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Loading } from "../../containers";
import PostShowComponent from "../../components/post/show";
import { GET_POST } from "../../graphql/queries/posts";
import "../../assets/css/post/show.css";

export default function PostShow() {
  let { postId } = useParams();
  const { data, loading } = useQuery(GET_POST, {
    fetchPolicy: "network-only",
    variables: { id: parseInt(postId) },
  });
  if (loading) return <Loading />;
  const post = { ...data.getPost };
  return <PostShowComponent post={post} />;
}
