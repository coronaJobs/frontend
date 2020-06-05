import { gql } from "@apollo/client";

export const USERS = gql`
  query getUsers {
    getUsers {
      id
      rut
      name
      mail
      phone
      address
      resumeUrl
    }
  }
`;

export const GET_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      rut
      name
      profilePicture
      role {
        id
        name
        description
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      id
      name
      mail
      address
      rut
      phone
      role {
        id
        name
      }
      posts {
        name
        description
        state {
          name
          description
        }
        commune {
          id
          name
        }
      }
    }
  }
`;
