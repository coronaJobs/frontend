import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getAllPosts {
      id
      name
      description
      applicantLimit
      owner {
        id
        name
      }
      state {
        id
        name
      }
      applicants {
        id
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($id: Int!) {
    getPost(id: $id) {
      id
      name
      description
      applicantLimit
      owner {
        id
        name
      }
      state {
        id
        name
      }
      applicants {
        id
        name
      }
      commune {
        id
        name
      }
    }
  }
`;
