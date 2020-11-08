import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
            node {
                ownerAvatarUrl
                fullName
                description
                language
                stargazersCount
                forksCount
                reviewCount
                ratingAverage
                id
            }
          }
    }
  }
`;


export const AUTHORIZED_USER = gql`
  query { 
      authorizedUser {
        id
        username
      }
    }  
`;


export const GET_REPOSITORY = gql`
query GetRepository($id: ID!) {
  repository(id: $id) {
    id
    fullName
    url
  }
}
`;

/* {
  repository(id: "jaredpalmer.formik") {
    id
    fullName
    url
  }
} */

/* query GetRepository($id: String!) {
  repository(id: $id) {
    id
    fullName
    url
  }
} */