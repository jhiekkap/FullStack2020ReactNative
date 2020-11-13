import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';

const useReviews = (variables) => {
 
    console.log('USE REVIEW VARIABLES', variables);
    const { data, error, loading, /* fetchMore, ...result */ } = useQuery(AUTHORIZED_USER, {
        variables,
        fetchPolicy: 'cache-and-network',
        // Other options
    });
   // console.log('USE REVIEW DATA', data);

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

    const reviews = data && data.authorizedUser.reviews || undefined;
    return { reviews, error, loading,/*  fetchMore: handleFetchMore, ...result  */};
};

export default useReviews;