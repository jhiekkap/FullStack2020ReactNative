import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Text from '../Text';
import Loading from '../Loading';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListItem from './RepositoryListItem';
import { useHistory } from "react-router-native";
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { Chevron } from 'react-native-shapes';
import theme from '../../theme';
import { useDebounce } from 'use-debounce';


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
    const [orderBy, setOrderBy] = useState('CREATED_AT');
    const [orderDirection, setOrderDirection] = useState('ASC');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchKeywordDebounced] = useDebounce(searchKeyword, 500);
    const [orderValue, setOrderValue] = useState(null);
    const { repositories, error, loading } = useRepositories(orderBy, orderDirection, searchKeywordDebounced);


    const sortOptions = [
        { label: 'Latest repositories', value: 'latest' },
        { label: 'Highest rated repositories', value: 'highest' },
        { label: 'Lowest rated repositories', value: 'lowest' },
    ];

    const handleChange = (value) => {
        setOrderValue(value);
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
    }

    console.log('ORDER VALUE', orderValue)


    if (error) {
        console.log(error);
        return <View><Text>Error...</Text></View>;
    }
    return (
        <View>
            <View style={styles.searchBarContainer}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(query) => setSearchKeyword(query)}
                    value={searchKeyword}
                    inputStyle={styles.searchBarInput}
                />
            </View>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    onValueChange={handleChange}
                    items={sortOptions}
                    value={orderValue}
                    style={pickerSelectStyles}
                    placeholder={{/*  label: 'Sort by', value: null */ }}
                    Icon={() => {
                        return <Chevron size={1.5} color="gray" />;
                    }}
                />
            </View>
            {!loading && <RepositoryListContainer repositories={repositories} />}
            {loading && <Loading />}
        </View>
    );
};

export default RepositoryList;

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    searchBarContainer: {
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: Platform.select({
            android: 5,
            ios: 10,
        }),
    },
    searchBarInput: {
        fontFamily: theme.fonts.main,
        fontSize: 16,
        height: 45,
    },
    pickerContainer: {
        marginBottom: Platform.select({
            android: 0,
            ios: 10,
        }),
        paddingHorizontal: 4
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginHorizontal: 7,
        opacity: 2,
        fontSize: 16,
        fontFamily: theme.fonts.main,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginHorizontal: 13,
        fontSize: 16,
        fontFamily: theme.fonts.main,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon  
    },
    iconContainer: {
        top: 18,
        right: 25,
    },
});