import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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

export const USER = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            repository {
              fullName
            }
            createdAt
          }
        }
      }
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

export const GET_REVIEWS_ON_REPO = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
