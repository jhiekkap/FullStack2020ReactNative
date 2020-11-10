import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../Text';
import Loading from '../Loading';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListItem from './RepositoryListItem';
import { useHistory } from "react-router-native";
import RNPickerSelect from 'react-native-picker-select';


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
    const [orderBy, setOrderBy] = useState('CREATED_AT')
    const [orderDirection, setOrderDirection] = useState('ASC')
    const [orderValue, setOrderValue] = useState()
    const { repositories, error, loading } = useRepositories(orderBy, orderDirection);

    const sortOptions = [
        { label: 'Latest repositories', value: 'latest' },
        { label: 'Highest rated repositories', value: 'highest' },
        { label: 'Lowest rated repositories', value: 'lowest' },
    ]

    const handleChange = (value) => {
        if (value === 'latest') {
            setOrderBy('CREATED_AT');
            setOrderDirection('DESC');
        } else if (value === 'highest') {
            setOrderBy('RATING_AVERAGE');
            setOrderDirection('DESC');
        } else {
            setOrderBy('RATING_AVERAGE');
            setOrderDirection('ASC');
        }
        setOrderValue(value);
    }

    if (loading) {
        return <Loading />
    }
    if (error) {
        console.log(error);
        return <View><Text>Error...</Text></View>
    }
    return (
        <View>
            <RNPickerSelect
                onValueChange={handleChange}
                items={sortOptions}
                value={orderValue}
                placeholder={{ label: 'Sort by', value: null }}
                style={{ color: 'black' }}
            />
            <RepositoryListContainer repositories={repositories} />
        </View>
    );
};

export default RepositoryList;

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});