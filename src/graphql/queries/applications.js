import { gql } from "@apollo/client";

export const GET_USER_APPLICATIONS = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      applications {
        id
      }
    }
  }
`;
