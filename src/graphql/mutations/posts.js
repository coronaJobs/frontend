import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost(
    $name: String!
    $description: String!
    $applicantLimit: Int!
    $ownerId: Int!
    $communeId: Int!
  ) {
    createPost(
      name: $name
      description: $description
      applicantLimit: $applicantLimit
      ownerId: $ownerId
      communeId: $communeId
    ) {
      id
      name
      description
      applicantLimit
      state {
        id
        name
        description
      }
    }
  }
`;
