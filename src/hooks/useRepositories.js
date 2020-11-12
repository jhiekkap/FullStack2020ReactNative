import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {

    console.log('USE REPOSITORIES VARIABLES', variables)
    const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
        variables,
        fetchPolicy: 'cache-and-network',
        // Other options
    });

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REPOSITORIES,
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repositories: {
                        ...fetchMoreResult.repositories,
                        edges: [
                            ...previousResult.repositories.edges,
                            ...fetchMoreResult.repositories.edges,
                        ],
                    },
                };

                return nextResult;
            },
        });
    };
    //console.log('DATA', data);  
    const repositories = data && data.repositories || undefined;
    return { repositories, error, loading, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;