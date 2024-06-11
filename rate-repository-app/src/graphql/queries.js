import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy:AllRepositoriesOrderBy, $orderDirection:OrderDirection){
    repositories(orderBy:$orderBy, orderDirection:$orderDirection) {
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
