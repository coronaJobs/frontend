import { gql } from '@apollo/client';

export const USERS = gql`
    query getUsers {
        getUsers {
            id
            rut
            name
            mail
            phone
            address
            resumeUrl
        }
    }
`;
