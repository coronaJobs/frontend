import { gql } from "@apollo/client";

export const REMOVE_EMPLOYEE = gql`
  mutation removeEmployee($jobId: Int!, $employeeId: Int!) {
    removeEmployee(jobId: $jobId, employeeId: $employeeId)
  }
`;
