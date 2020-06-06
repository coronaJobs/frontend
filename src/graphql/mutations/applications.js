import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation createApplication($offerId: Int!) {
    createApplication(offerId: $offerId) {
      applicantId
    }
  }
`;
