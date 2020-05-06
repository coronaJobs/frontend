import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser(
    $rut: String!
    $name: String!
    $mail: String!
    $password: String!
    $phone: String!
    $address: String!
    $profilePicture: String
    $resumeUrl: String
    $role: Int!
  ) {
    createUser(
      rut: $rut
      name: $name
      mail: $mail
      password: $password
      phone: $phone
      address: $address
      profilePicture: $profilePicture
      resumeUrl: $resumeUrl
      roleId: $role
    ) {
        rut
        name
        mail
        role {
          id
          name
        }
      }
  }
`;

export const LOGIN = gql`
  mutation login(
    $mail: String!
    $password: String!
  ) {
    login(
      mail: $mail
      password: $password
    )
  }
`;
