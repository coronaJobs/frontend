import { gql } from '@apollo/client';

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
  query getUser($id: Int!) {
    getUser(
      id: $id
    ) {
      id
      name
      mail
      role {
        id
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getUser($id: Int!) {
    getUser(
      id: $id
    ) {
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
    }
  }
`;
