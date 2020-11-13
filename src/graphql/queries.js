import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!, $searchKeyword: String, $after: String, $first: Int){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
`;


export const AUTHORIZED_USER = gql`
query getAuthorizedUser($includeReviews: Boolean = false) {
  authorizedUser {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id  
          createdAt
          rating
          text
          repositoryId
          repository {
            name
            fullName
          }
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`;



export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $after: String, $first: Int) { 
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
      reviews(after: $after, first: $first){
        edges {
          node {
            id  
            createdAt
            rating
            text
            repositoryId
            repository {
              name
              fullName
            }
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
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

/* createdAt
                ownerAvatarUrl
                fullName
                description
                language
                stargazersCount
                forksCount
                reviewCount
                ratingAverage
                id */