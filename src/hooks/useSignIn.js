import { useMutation } from '@apollo/react-hooks';
import { SIGN_IN } from './../graphql/mutations';


const useSignIn = () => {

    const [mutate, result] = useMutation(SIGN_IN);

    const signIn = async ({ username, password }) => {
        console.log('CREDENTIALS', username, password);
        return await mutate({ variables: { username, password } });
        // call the mutate function here with the right arguments
    };

    return [signIn, result];
};

export default useSignIn;