import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      createdAt
      rating
      text
      repositoryId
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
