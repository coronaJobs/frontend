import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query getAllPosts($id: Int!) {
    getAllPosts(
      id: $id
    ) {
      id
      name
      description
      applicantLimit
      owner
      state
    }
  }
`;