import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
      authorize(credentials: { username: $username, password: $password }) {
        accessToken
      }
    }
    `;

export const CREATE_REVIEW = gql`
  mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String){
    createReview(
      review: { 
        repositoryName: $repositoryName, 
        ownerName: $ownerName, 
        rating: $rating, 
        text: $text
      }
    ) {
      repositoryId
    } 
  } 
  `;

  /* export const CREATE_REVIEW = gql`
  mutation {
    createReview(
      review: {
        repositoryName: "onepile"
        ownerName: "holtwick"
        rating: 99
        text: "awesome"
      }
    ) {
      text
    }
  }
  `; */

