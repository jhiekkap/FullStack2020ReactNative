import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListItem from './RepositoryListItem';
import { useHistory } from "react-router-native";


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListItemContainer = ({ item }) => {

    let history = useHistory();

    const handleShowRepositoryView = () => {
        console.log('SHOW REPOSITORY VIEW', item.id);
        history.push('/Repositories/' + item.id);
    }
    return (
        <TouchableOpacity onPress={handleShowRepositoryView} >
            <RepositoryListItem item={item} />
        </TouchableOpacity>
    );
}

const RepositoryListContainer = ({ repositories }) => {

    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];
    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryListItemContainer item={item} />}
            keyExtractor={item => item.id}
        />
    );
};

const RepositoryList = () => {
    const { repositories } = useRepositories();
    return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});