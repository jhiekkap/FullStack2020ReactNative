import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection) => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        variables: { orderBy, orderDirection },
        fetchPolicy: 'cache-and-network',
        // Other options
    });
    //console.log('DATA', data);  
    const repositories = data && data.repositories || undefined;
    return { repositories, error, loading };
};

export default useRepositories;