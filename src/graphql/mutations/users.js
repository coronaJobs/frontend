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
    $roleId: Int!
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
      roleId: $roleId) {
        mail
      }
  }
`;


// query getUsers {
//   getUsers {
//       id
//       rut
//       name
//       mail
//       phone
//       address
//       resumeUrl
//   }
// }
