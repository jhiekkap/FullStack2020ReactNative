import React from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import Text from './Text';


const repositories = [
    {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1589,
        stargazersCount: 21553,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
    },
    {
        id: 'rails.rails',
        fullName: 'rails/rails',
        description: 'Ruby on Rails',
        language: 'Ruby',
        forksCount: 18349,
        stargazersCount: 45377,
        ratingAverage: 100,
        reviewCount: 2,
        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
    },
    {
        id: 'django.django',
        fullName: 'django/django',
        description: 'The Web framework for perfectionists with deadlines.',
        language: 'Python',
        forksCount: 21015,
        stargazersCount: 48496,
        ratingAverage: 73,
        reviewCount: 5,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
    },
    {
        id: 'reduxjs.redux',
        fullName: 'reduxjs/redux',
        description: 'Predictable state container for JavaScript apps',
        language: 'TypeScript',
        forksCount: 13902,
        stargazersCount: 52869,
        ratingAverage: 0,
        reviewCount: 0,
        ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
    },
];

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
            <Text tag style={styles.itemBodyText}>{item.language}</Text>
        </View>
    </View>
    <View style={styles.itemBottom}>
        <ItemRating title="Stars" value={item.stargazersCount} />
        <ItemRating title="Forks" value={item.forksCount} />
        <ItemRating title="Reviews" value={item.reviewCount} />
        <ItemRating title="Rating" value={item.ratingAverage} />
    </View>
</View>;

const RepositoryList = () => <FlatList
    data={repositories}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => <RepositoryListItem item={item} />}
    keyExtractor={item => item.id}
/>;

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
    itemBody: {
        padding: 5,
        flexGrow: 4,
    },
    itemBodyText: {
        marginBottom: 2,
        width: '90%'
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