import React from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';

const ItemSeparator = () => <View style={styles.separator} />;

const ItemRating = ({ title, value }) =>
    <View style={styles.itemRating}>
        <Text fontWeight='bold' style={styles.itemRatingText} >{value < 1000 ? value : (value / 1000).toFixed(1) + 'k'}</Text>
        <Text style={styles.itemRatingText}>{title}</Text>
    </View>;

const RepositoryListItem = ({ item }) => <View style={styles.item}>
    <View style={styles.itemTop}>
        <View style={styles.avatarContainer}>
            <Image
                style={styles.avatar}
                source={{ uri: item.ownerAvatarUrl }}
            />
        </View>
        <View style={styles.itemBody}>
            <Text fontWeight="bold" style={styles.itemBodyText}>{item.fullName}</Text>
            <Text color="textSecondary" style={styles.itemBodyText}>{item.description}</Text>
            <View style={styles.languageContainer}>
                <Text tag style={styles.itemBodyText}>{item.language}</Text>
            </View>
        </View>
    </View>
    <View style={styles.itemBottom}>
        <ItemRating title="Stars" value={item.stargazersCount} />
        <ItemRating title="Forks" value={item.forksCount} />
        <ItemRating title="Reviews" value={item.reviewCount} />
        <ItemRating title="Rating" value={item.ratingAverage} />
    </View>
</View>;

const RepositoryList = () => {

    const { data } = useRepositories();

    // Get the nodes from the edges array
    const repositoryNodes = (data && data.repositories)
        ? data.repositories.edges.map(edge => edge.node)
        : [];


    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryListItem item={item} />}
            keyExtractor={item => item.id}
        />
    );
};

export default RepositoryList;

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    item: {
        backgroundColor: 'white',
    },
    itemTop: {
        flexDirection: 'row',
    },
    avatarContainer: {
        flexGrow: 0,
        padding: 10,
    },
    avatar: {
        width: 40,
        height: 40,
    },
    languageContainer: { 
        flexDirection: 'row',
    },
    itemBody: {
        padding: 5,
        flexGrow: 4,
    },
    itemBodyText: {
        marginBottom: 2,
        width: '90%', 
    },
    itemRating: {
        justifyContent: 'center',
    },
    itemRatingText: {
        textAlign: 'center',
        margin: 1,
    },
    itemBottom: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});