import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
    query isUserLoggedIn {
        isLoggedIn @client
    }
`;

export const CURRENT_USER = gql`
    query currentUser {
        currentUser @client {
            name
            mail
            role {
                id
            }
        }
    }
`;
