import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query getAllPosts(
    $sendText: String
    $sendFromDate: String
    $sendToDate: String
    $sendCommuneIds: [Int]
    $sendFromApplicantLimit: Int
    $sendToApplicantLimit: Int
  ) {
    getAllPosts(
      text: $sendText
      fromDate: $sendFromDate
      toDate: $sendToDate
      communeId: $sendCommuneIds
      fromApplicantLimit: $sendFromApplicantLimit
      toApplicantLimit: $sendToApplicantLimit
    ) {
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
        role {
          id
          name
        }
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
      employees {
        id
        name
      }
    }
  }
`;
