import React from 'react';
import { View, StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton';
import RepositoryListItem from './RepositoryList/RepositoryListItem';
import { useParams } from "react-router-native";
import useRepository from './../hooks/useRepository';
import useRepositories from './../hooks/useRepositories';
import * as Linking from 'expo-linking';


/* const mockItem = {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1619,
    stargazersCount: 21856,
    ratingAverage: 88,
    reviewCount: 3,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
}; */

const RepositoryView = () => {

    const { id } = useParams();
    console.log('IIIDEE', id)
    const { repository } = useRepository(id);
    const { repositories } = useRepositories();
    const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
    const getRepositoryById = repositoryNodes && repositoryNodes.find(repository => repository.id === id) || null;

    const handleShowGithub = () => {
        console.log('SHOW IN GITHUB', id);
        Linking.openURL(repository.url);
    }

    return (
        <View>
            <RepositoryListItem item={getRepositoryById} />
            <View style={styles.buttonContainer}>
                <SubmitButton text='Open in Github' onSubmit={handleShowGithub} />
            </View>
        </View>
    );
}

export default RepositoryView;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'white',
    },
});