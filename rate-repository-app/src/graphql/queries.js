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
