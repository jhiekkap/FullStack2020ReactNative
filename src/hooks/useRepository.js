import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
 
    console.log('VARIABLES', variables);
    const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
        variables,
        fetchPolicy: 'cache-and-network',
        // Other options
    });
    //console.log('DATA', data);

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REPOSITORY,
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repository: {
                        ...fetchMoreResult.repository,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [
                                ...previousResult.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges,
                            ],
                        }
                    },
                };
                
                return nextResult;
            },
        });
    };

    const repository = data && data.repository || undefined;
    return { repository, error, loading, fetchMore: handleFetchMore, ...result };
};

export default useRepository;