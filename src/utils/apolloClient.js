import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = () => {
  //console.log('ENV', Constants.manifest.extra);
  return new ApolloClient({
    // Replace the IP address part with your own IP address!
     //uri: 'http://192.168.38.105:5000/graphql', 
    uri: Constants.manifest.extra.apolloUri,
  });
};

export default createApolloClient;