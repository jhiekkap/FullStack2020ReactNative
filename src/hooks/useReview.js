import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';
import { CREATE_REVIEW } from './../graphql/mutations';

const useReview = () => {

    const [mutate, result] = useMutation(CREATE_REVIEW);
    const apolloClient = useApolloClient();

    const createReview = async (values) => { 
        const { data } = await mutate({ variables: { ...values, rating: parseInt(values.rating) } });
        apolloClient.resetStore();
        return data;
    };

    return [createReview, result];
};

export default useReview;