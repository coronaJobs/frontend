import { gql } from "@apollo/client";

export const GET_COMMUNES = gql`
  query getCommunes {
    getCommunes {
      id
      name
    }
  }
`;
