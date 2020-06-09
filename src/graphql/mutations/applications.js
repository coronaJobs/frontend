import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation createApplication($offerId: Int!) {
    createApplication(offerId: $offerId) {
      applicantId
    }
  }
`;

export const ACCEPT_APPLICANT = gql`
  mutation createEmployment($offerId: Int!, $applicantId: Int!) {
    createEmployment(offerId: $offerId, applicantId: $applicantId) {
      employeeId
      jobId
    }
  }
`;
