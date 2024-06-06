import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      totalCount
      edges {
        node {
          id
          fullName
          ownerAvatarUrl
          ownerName
          createdAt
          description
          forksCount
          language
          name
          reviewCount
          ratingAverage
          stargazersCount
        }
        cursor
      }
    }
  }
`;

export const SIGNIN = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        username
        createdAt
        id
      }
    }
  }
`;

export const USER = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      forksCount
      description
      language
      url
      ownerAvatarUrl
      ownerName
      createdAt
      stargazersCount
      reviewCount
      name
      ratingAverage
    }
  }
`;
