import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
        edges {
            node {
                createdAt
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
    description 
    language 
    forksCount
    stargazersCount 
    ratingAverage 
    reviewCount 
    ownerAvatarUrl
    url
    reviews {
      edges {
        node {
          id  
          createdAt
          rating
          text
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