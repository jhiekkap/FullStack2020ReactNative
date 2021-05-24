import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import Text from './Text';
import Loading from './Loading';
import { ReviewItem } from './RepositoryView';
import useReviews from './../hooks/useReviews';
import SubmitButton from './SubmitButton';
import { useHistory } from 'react-router-native';

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewContainer = ({ review, deleteReview, refetch }) => {
    let history = useHistory();

    const handleDeleteReview = () => {
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        deleteReview(review.id)
                        refetch()
                    }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View>
            <ReviewItem review={review} myReview />
            <View style={styles.buttonContainer}>
                <SubmitButton style={styles.button} text='View repository' onSubmit={() => history.push('/Repositories/' + review.repositoryId)} />
                <SubmitButton style={{ ...styles.button, backgroundColor: 'red' }} text='Delete review' onSubmit={handleDeleteReview} />
            </View>
        </View>
    );
}

const MyReviewsView = () => {

    const { reviews, error, loading, deleteReview, refetch/* fetchMore */ } = useReviews({ includeReviews: true });

    const reviewNodes = reviews
        ? reviews.edges.map((edge) => edge.node)
        : [];
    console.log('My REVIEWS', reviewNodes.length);

    const onEndReach = () => {
        console.log('END HAS BEEN REACHED')
    };
    
    console.log('ERROR', error);

    if (error) {
        return <View><Text>Error...</Text></View>;
    }
    return (
        <View style={styles.root}>
            {!loading && <FlatList
                data={reviewNodes}
                renderItem={({ item }) => <MyReviewContainer review={item} deleteReview={deleteReview} refetch={refetch} />}
                keyExtractor={({ id }) => id}
                ItemSeparatorComponent={ItemSeparator}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />}
            {loading && <Loading />}
        </View>
    );
}

export default MyReviewsView;

const styles = StyleSheet.create({
    root: {
        marginBottom: 80,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
    },
    button: {
        width: '45%',
        marginTop: 0
    },
    separator: {
        height: 10,
    },
});