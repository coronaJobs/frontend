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
      name
      mail
      role {
        id
      }
    }
  }
`;
