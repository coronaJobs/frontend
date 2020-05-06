import { gql } from '@apollo/client';

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
        currentUser: User
    }
`;

export const resolvers = {};