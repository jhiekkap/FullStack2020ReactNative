import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {

    console.log('ID', id)
    const { data, error, loading } = useQuery(GET_REPOSITORY, {
        variables: { id },
        fetchPolicy: 'cache-and-network',
        // Other options
    });
    console.log('DATA', data);

    const repository = data && data.repository|| undefined;
    return { repository, error, loading };
};

export default useRepository;