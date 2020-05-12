import { gql } from '@apollo/client';

export const CREATE_POST =  gql`
  mutation createPost(
    $name: String!
    $description: String!
    $applicantLimit: Int!
    $ownerId: Int!
  ) {
    createPost(
      name: $name
      description: $description
      applicantLimit: $applicantLimit
      ownerId: $ownerId
    ) {
    id
    name
    description
    applicantLimit
    state {
      name
      description
    }
    }
  }
`;