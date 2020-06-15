// React
import React from "react";

// Apollo & GraphQL
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries/users";

export default function CurrentUser() {
  const client = useApolloClient();

  const { data, loading, error } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
  });

  if (!loading && !error) {
    const { getCurrentUser } = data;
    client.cache.writeData({
      data: { currentUser: getCurrentUser },
    });
  }

  return <div />;
}
