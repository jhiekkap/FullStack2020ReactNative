// import ApolloClient from 'apollo-boost';
// import Constants from 'expo-constants';
// console.log('URI', Constants.manifest.extra.apolloUri);
// const createApolloClient = (authStorage) => {
  
//   return new ApolloClient({
//     request: async (operation) => {
//       try {
//         const accessToken = await authStorage.getAccessToken();
//         operation.setContext({
//           headers: {
//             authorization: accessToken ? `Bearer ${accessToken}` : '',
//           },
//         });
//       } catch (e) {
//         console.log(e);
//       }
//     },
//     //uri: 'http://192.168.38.105:5000/graphql', 
//     uri: Constants.manifest.extra.apolloUri,
//   });
// };

// export default createApolloClient;

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

// You might need to change this depending on how you have configured the Apollo Server's URI
const { apolloUri } = Constants.manifest.extra;

console.log('APOLLO URI', apolloUri);

const httpLink = createHttpLink({
  uri: apolloUri,
});
  
const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
