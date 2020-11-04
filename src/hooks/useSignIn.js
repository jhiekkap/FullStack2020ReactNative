import { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';
import { SIGN_IN } from './../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {

    const authStorage = useContext(AuthStorageContext);
    const [mutate, result] = useMutation(SIGN_IN);
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        //console.log('CREDENTIALS', username, password);
        const { data } = await mutate({ variables: { username, password } }); 
        if (data && data.authorize && data.authorize.accessToken) { 
            await authStorage.setAccessToken(data.authorize.accessToken);
        }
        apolloClient.resetStore(); 
        return data;
    };

    return [signIn, result];
};

export default useSignIn;