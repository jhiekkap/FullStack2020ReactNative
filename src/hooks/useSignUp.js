import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';
import { SIGN_UP } from './../graphql/mutations'; 

const useSignUp = () => {
 
    const [mutate, result] = useMutation(SIGN_UP);
    const apolloClient = useApolloClient();

    const signUp = async ({ username, password }) => {
        console.log('CREDENTIALS', username, password);
        const { data } = await mutate({ variables: { username, password } });  
        apolloClient.resetStore(); 
        return data;
    };

    return [signUp, result];
};

export default useSignUp;